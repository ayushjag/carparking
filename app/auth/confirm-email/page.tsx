"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ParkingCircle, Mail, CheckCircle, Clock } from "lucide-react";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const role = searchParams.get("role") || "driver";
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <ParkingCircle className="h-10 w-10 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">ParkEase</span>
            </Link>
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Verify your email
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a confirmation link to your email
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email Display */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Confirmation sent to:</p>
            <p className="text-lg font-semibold text-gray-900 break-all">
              {email}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Check your email</p>
                <p className="text-sm text-gray-600">
                  Look for an email from ParkEase
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Click the confirmation link
                </p>
                <p className="text-sm text-gray-600">
                  Verify your email address to activate your account
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Start using ParkEase
                </p>
                <p className="text-sm text-gray-600">
                  Once verified, you can log in to your account
                </p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">
                  Check your spam folder
                </p>
                <p className="text-sm text-amber-700">
                  If you don't see the email, check your spam or promotions
                  folder
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Link href="/auth/login" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="ghost" className="w-full">
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
