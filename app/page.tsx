'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Clock, Shield, Star, TrendingUp, Car, Building, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [searchLocation, setSearchLocation] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      router.push(`/search?location=${encodeURIComponent(searchLocation)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Perfect Parking Spots in Seconds
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100">
              Book verified parking spaces near you. Fast, secure, and hassle-free.
            </p>

            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center px-4 py-2">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <Input
                    type="text"
                    placeholder="Enter city, address, or landmark..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="border-0 focus-visible:ring-0 text-lg text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 rounded-xl">
                  <Search className="h-5 w-5 mr-2" />
                  Search Parking
                </Button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-blue-100">
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Instant Booking
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verified Spots
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Secure Payment
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ParkEase?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The smartest way to find and book parking in your city
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Location-Based Search
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Find available parking spots near your destination with our smart location search and interactive map.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Real-Time Availability
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  See live parking availability and book instantly. No more driving around looking for spots.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Secure & Trusted
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  All parking spots are verified. Secure payments and instant booking confirmations guaranteed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                FOR DRIVERS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Find Your Perfect Parking Spot
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Browse thousands of verified parking spots, compare prices, and book in seconds. Save time and money with ParkEase.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Star className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900">Filter by ratings & reviews</strong>
                    <p className="text-gray-600">Choose highly-rated parking spots trusted by thousands</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900">Best price guarantee</strong>
                    <p className="text-gray-600">Compare prices and get the best deals on parking</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Car className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900">Easy booking management</strong>
                    <p className="text-gray-600">Track all your bookings in one simple dashboard</p>
                  </div>
                </li>
              </ul>
              <Link href="/search">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start Searching
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-gray-900">Downtown Garage</span>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Available</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">0.3 miles away</span>
                    <span className="text-2xl font-bold text-gray-900">$8/hr</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="font-semibold text-gray-900">City Center Parking</span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">2 spots left</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">0.5 miles away</span>
                    <span className="text-2xl font-bold text-gray-900">$12/hr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-4 rounded-xl">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Monthly Revenue</p>
                      <p className="text-3xl font-bold">$2,400+</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-4 rounded-xl">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Total Bookings</p>
                      <p className="text-3xl font-bold">156</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block bg-green-900/30 text-green-100 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                FOR PARKING OWNERS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Turn Your Empty Space Into Passive Income
              </h2>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                List your parking spot and start earning money today. It's simple, secure, and completely free to get started.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-300 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Set your own prices</strong>
                    <p className="text-green-100">Full control over pricing and availability</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-300 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Get paid automatically</strong>
                    <p className="text-green-100">Secure payments directly to your account</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-300 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Manage everything online</strong>
                    <p className="text-green-100">Easy-to-use dashboard for all your listings</p>
                  </div>
                </li>
              </ul>
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                  Start Earning Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-400">
              Join our growing community of drivers and parking owners
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">10K+</p>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">5K+</p>
              <p className="text-gray-400">Parking Spots</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">50K+</p>
              <p className="text-gray-400">Bookings Made</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">4.8</p>
              <p className="text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold">ParkEase</span>
              </div>
              <p className="text-gray-400">
                Making parking simple, fast, and reliable for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Drivers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/search" className="hover:text-white transition-colors">Find Parking</Link></li>
                <li><Link href="/auth/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">My Bookings</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Owners</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/parking/create" className="hover:text-white transition-colors">List Your Spot</Link></li>
                <li><Link href="/owner/dashboard" className="hover:text-white transition-colors">Owner Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ParkEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
