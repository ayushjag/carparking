'use client';

import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Shield, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About ParkEase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make parking simple, accessible, and stress-free for everyone.
          </p>
        </div>

        <div className="mb-20">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg leading-relaxed mb-4">
              ParkEase was founded with a simple idea: parking shouldn't be complicated. After experiencing the frustration of searching for parking spots in busy cities, we knew there had to be a better way.
            </p>
            <p className="text-lg leading-relaxed">
              Today, we connect thousands of drivers with parking spot owners, creating a seamless marketplace that benefits everyone. Whether you need a spot for an hour or want to monetize your unused space, ParkEase is here to help.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <Card className="text-center">
            <CardContent className="p-8">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">Parking Spots</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Active Users</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Verified Spots</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600">Bookings Made</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To revolutionize urban parking by creating an efficient, sustainable marketplace that connects drivers with available parking spaces.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              A world where finding parking is effortless, every parking space is utilized efficiently, and cities become more accessible for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600 leading-relaxed">
              Trust, simplicity, innovation, and community. We believe in transparent pricing, secure transactions, and exceptional user experience.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking for parking or want to list your space, ParkEase makes it easy to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
