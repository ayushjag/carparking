"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, Profile } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: "driver" | "owner"
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
      }

      setLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (data) {
      setProfile(data);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: "driver" | "owner"
  ) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        toast.error("Sign Up Failed", {
          description: authError.message || "An error occurred during sign up",
        });
        return { error: authError };
      }

      // Profile is created automatically by trigger, now update it with full_name and role
      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            full_name: fullName,
            role,
          })
          .eq("id", authData.user.id);

        if (profileError) {
          toast.error("Profile Update Failed", {
            description: profileError.message || "Failed to update profile",
          });
          return { error: profileError };
        }
      }

      toast.success("Sign Up Successful! 🎉", {
        description: "Please check your email to verify your account",
      });
      return { error: null };
    } catch (error: any) {
      toast.error("Error", {
        description: error?.message || "An unexpected error occurred",
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Login Failed", {
          description: error.message || "Invalid email or password",
        });
        return { error };
      }

      toast.success("Welcome Back! 👋", {
        description: "You have been successfully logged in",
      });
      return { error };
    } catch (error: any) {
      toast.error("Error", {
        description: error?.message || "An unexpected error occurred",
      });
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    toast.success("Logged Out", {
      description: "You have been successfully logged out",
    });
    router.push("/");
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      toast.error("Error", {
        description: "No user logged in",
      });
      return { error: new Error("No user logged in") };
    }

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (error) {
      toast.error("Update Failed", {
        description: error.message || "Failed to update profile",
      });
    } else {
      await fetchProfile(user.id);
      toast.success("Profile Updated ✨", {
        description: "Your profile has been updated successfully",
      });
    }

    return { error };
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signUp, signIn, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
