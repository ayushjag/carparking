"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ParkingCircle,
  User,
  Menu,
  LogOut,
  LayoutDashboard,
  Heart,
  Car,
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ParkingCircle className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ParkEase</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/search"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Find Parking
            </Link>
            {user && profile?.role === "owner" && (
              <Link
                href="/owner/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Owner Dashboard
              </Link>
            )}
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user && profile ? (
              <>
                {profile.role === "owner" && (
                  <Link href="/parking/create">
                    <Button variant="outline">
                      <Car className="h-4 w-4 mr-2" />
                      List Your Parking
                    </Button>
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-5 w-5" />
                      <span>{profile.full_name || "Account"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link
                      href={
                        profile.role === "owner"
                          ? "/owner/dashboard"
                          : "/dashboard"
                      }
                    >
                      <DropdownMenuItem>
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    {profile.role === "driver" && (
                      <Link href="/favorites">
                        <DropdownMenuItem>
                          <Heart className="h-4 w-4 mr-2" />
                          Favorites
                        </DropdownMenuItem>
                      </Link>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={signOut}
                      className="text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                href="/search"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Find Parking
              </Link>
              {user && profile?.role === "owner" && (
                <Link
                  href="/owner/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                >
                  Owner Dashboard
                </Link>
              )}
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                About
              </Link>
              {!user && (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
