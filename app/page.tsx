"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MapPin,
  Clock,
  Shield,
  Star,
  TrendingUp,
  Car,
  Building,
  CheckCircle,
  Zap,
  Lock,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      router.push(`/search?location=${encodeURIComponent(searchLocation)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative text-white overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506521295926-19bfd6b06b2e?w=1600&h=900&fit=crop')",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-blue-900/60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-500/30 backdrop-blur-md rounded-full border border-blue-400/30">
              <p className="text-sm font-semibold text-blue-100">
                🚀 Revolutionizing Urban Parking
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
              Find Perfect Parking
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
                in Seconds
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Book verified parking spaces near you. Fast, secure, and
              hassle-free. Join thousands of happy drivers today.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col sm:flex-row gap-3 backdrop-blur-xl bg-opacity-95 hover:shadow-3xl transition-all duration-300">
                <div className="flex-1 flex items-center px-5 py-3">
                  <MapPin className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder="Enter city, address, or landmark..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="border-0 focus-visible:ring-0 text-lg text-gray-900 placeholder:text-gray-500 bg-transparent"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Now
                </Button>
              </div>
            </form>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-16">
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">
                  10K+
                </div>
                <p className="text-blue-100 text-sm">Active Users</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">
                  5K+
                </div>
                <p className="text-blue-100 text-sm">Parking Spots</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">
                  4.8★
                </div>
                <p className="text-blue-100 text-sm">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ParkEase Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Choose ParkEase?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Experience the future of parking with cutting-edge technology and
              customer-first design
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Lightning Fast
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Find and book parking in seconds. Our intelligent search
                    delivers the best options instantly.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Card 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-green-100 to-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Real-Time Updates
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Live availability tracking ensures you always know what's
                    available. No more surprises.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Card 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Lock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    100% Secure
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Bank-level encryption and verified spots ensure your peace
                    of mind. Always protected.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* For Drivers Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-bold mb-8 uppercase tracking-wide">
                ✓ For Drivers
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Find Your Perfect Parking Spot
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Browse thousands of verified parking spots, compare prices, and
                book in seconds. Save time and money with ParkEase's intelligent
                search system.
              </p>
              <ul className="space-y-6 mb-10">
                <li className="flex items-start group">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg">
                      <Star className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Filter by ratings & reviews
                    </p>
                    <p className="text-gray-600 mt-1">
                      Choose highly-rated parking spots trusted by thousands of
                      drivers
                    </p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-green-600 to-green-500 text-white shadow-lg">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Best price guarantee
                    </p>
                    <p className="text-gray-600 mt-1">
                      Compare prices and get the best deals on parking in your
                      area
                    </p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 text-white shadow-lg">
                      <Car className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Easy booking management
                    </p>
                    <p className="text-gray-600 mt-1">
                      Track all your bookings in one simple, intuitive dashboard
                    </p>
                  </div>
                </li>
              </ul>
              <Link href="/search">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Searching Now
                  <Search className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-2xl border border-blue-100/50 space-y-5">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-lg mr-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-bold text-gray-900">
                        Downtown Garage
                      </span>
                    </div>
                    <span className="bg-gradient-to-r from-green-100 to-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                      Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between pl-12">
                    <span className="text-gray-600 font-medium">
                      0.3 miles away
                    </span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                      $8/hr
                    </span>
                  </div>
                </div>
                {/* Card 2 */}
                <div
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-gray-100"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-lg mr-3">
                        <Building className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="font-bold text-gray-900">
                        City Center Parking
                      </span>
                    </div>
                    <span className="bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">
                      2 spots
                    </span>
                  </div>
                  <div className="flex items-center justify-between pl-12">
                    <span className="text-gray-600 font-medium">
                      0.5 miles away
                    </span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                      $12/hr
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Parking Owners Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative group">
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  {/* Stat 1 */}
                  <div className="flex items-center space-x-5 transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-5 rounded-2xl shadow-lg">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-green-100 text-sm font-semibold">
                        Monthly Revenue
                      </p>
                      <p className="text-4xl font-bold text-white">$2,400+</p>
                    </div>
                  </div>
                  {/* Stat 2 */}
                  <div className="flex items-center space-x-5 transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-5 rounded-2xl shadow-lg">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-green-100 text-sm font-semibold">
                        Total Bookings
                      </p>
                      <p className="text-4xl font-bold text-white">156</p>
                    </div>
                  </div>
                  {/* Stat 3 */}
                  <div className="flex items-center space-x-5 transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-green-300 to-emerald-400 p-5 rounded-2xl shadow-lg">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-green-100 text-sm font-semibold">
                        Owner Rating
                      </p>
                      <p className="text-4xl font-bold text-white">4.9</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-block bg-white/20 backdrop-blur-md text-green-50 px-5 py-2 rounded-full text-sm font-bold mb-8 uppercase tracking-wide border border-white/30">
                ✓ For Parking Owners
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Turn Your Empty Space Into Passive Income
              </h2>
              <p className="text-xl text-green-50 mb-10 leading-relaxed">
                List your parking spot and start earning money today. It's
                simple, secure, and completely free to get started. Join
                thousands of successful parking owners.
              </p>
              <ul className="space-y-6 mb-10">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-300 shadow-lg" />
                  </div>
                  <div>
                    <strong className="text-xl text-white">
                      Set your own prices
                    </strong>
                    <p className="text-green-100 mt-1">
                      Complete control over pricing and availability. Maximize
                      your earnings.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-300 shadow-lg" />
                  </div>
                  <div>
                    <strong className="text-xl text-white">
                      Get paid automatically
                    </strong>
                    <p className="text-green-100 mt-1">
                      Secure payments directly to your account. No hassle, no
                      delays.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-300 shadow-lg" />
                  </div>
                  <div>
                    <strong className="text-xl text-white">
                      Manage everything online
                    </strong>
                    <p className="text-green-100 mt-1">
                      Easy-to-use dashboard with 24/7 analytics and support.
                    </p>
                  </div>
                </li>
              </ul>
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Earning Today
                  <TrendingUp className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Finding and booking parking has never been easier. Three simple
              steps to get you parked.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-lg">
                  1
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Search Location
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Enter your destination city, address, or nearby landmark.
                    Our smart search will find available parking spots nearby
                    instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 border border-purple-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="absolute -top-6 left-8 bg-gradient-to-r from-purple-600 to-pink-400 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-lg">
                  2
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Compare & Choose
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Browse verified parking spots, compare prices, check ratings
                    from other drivers, and pick the perfect spot for your
                    needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border border-green-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="absolute -top-6 left-8 bg-gradient-to-r from-green-600 to-emerald-400 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-lg">
                  3
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Book & Enjoy
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Complete your secure booking in seconds. Receive instant
                    confirmation with all parking details and enjoy hassle-free
                    parking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="/search">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-10 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Find Parking Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              What Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied drivers and parking owners who trust
              ParkEase
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "ParkEase saved me so much time! I used to spend 20 minutes
                looking for parking. Now I book it in seconds. Highly
                recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  JS
                </div>
                <div>
                  <p className="font-bold text-gray-900">John Smith</p>
                  <p className="text-sm text-gray-500">Daily Commuter</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "As a parking owner, ParkEase has been a game-changer. I'm
                making passive income from my unused space. Setup was super
                easy!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  MB
                </div>
                <div>
                  <p className="font-bold text-gray-900">Maria Brown</p>
                  <p className="text-sm text-gray-500">Parking Owner</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "The best parking app I've used. Great UI, secure transactions,
                and customer support is amazing. Worth every penny!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  RJ
                </div>
                <div>
                  <p className="font-bold text-gray-900">Robert Johnson</p>
                  <p className="text-sm text-gray-500">Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden relative"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          backgroundSize: "30px 30px",
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-300">
              Join our rapidly growing community of drivers and parking owners
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Stat Cards */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-600/20 to-blue-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 text-center">
                <p className="text-5xl md:text-6xl font-bold text-blue-300 mb-3">
                  10K+
                </p>
                <p className="text-gray-300 font-semibold">Active Users</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-green-600/20 to-green-500/10 backdrop-blur-xl rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 text-center">
                <p className="text-5xl md:text-6xl font-bold text-green-300 mb-3">
                  5K+
                </p>
                <p className="text-gray-300 font-semibold">Parking Spots</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-500/10 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-center">
                <p className="text-5xl md:text-6xl font-bold text-purple-300 mb-3">
                  50K+
                </p>
                <p className="text-gray-300 font-semibold">Bookings Made</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 text-center">
                <p className="text-5xl md:text-6xl font-bold text-yellow-300 mb-3">
                  4.8
                </p>
                <p className="text-gray-300 font-semibold">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-gradient-to-br from-slate-950 via-gray-900 to-black text-gray-300 py-16 border-t border-gray-800/50"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          backgroundSize: "30px 30px",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg shadow-lg">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-300 bg-clip-text text-transparent">
                  ParkEase
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Making parking simple, fast, and reliable for everyone. Your
                trusted partner in urban mobility.
              </p>
            </div>

            {/* For Drivers */}
            <div>
              <h3 className="font-bold text-white mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full mr-3"></span>
                For Drivers
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/search"
                    className="hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>{" "}
                    Find Parking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className="hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>{" "}
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>{" "}
                    My Bookings
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Owners */}
            <div>
              <h3 className="font-bold text-white mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-green-600 to-green-400 rounded-full mr-3"></span>
                For Owners
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/parking/create"
                    className="hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>{" "}
                    List Your Spot
                  </Link>
                </li>
                <li>
                  <Link
                    href="/owner/dashboard"
                    className="hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>{" "}
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-white mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-600 to-purple-400 rounded-full mr-3"></span>
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-purple-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>{" "}
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-purple-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>{" "}
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                &copy; 2024 ParkEase. All rights reserved. Made with ❤️ for
                better cities.
              </p>
              <div className="flex space-x-6 mt-6 md:mt-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
