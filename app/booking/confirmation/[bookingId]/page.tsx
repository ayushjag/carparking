'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { supabase, Booking } from '@/lib/supabase/client';
import { CheckCircle, MapPin, Calendar, Clock, DollarSign, Car, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function BookingConfirmationPage() {
  const params = useParams();
  const [booking, setBooking] = useState<(Booking & { parking_spot: any }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.bookingId) {
      fetchBooking();
    }
  }, [params?.bookingId]);

  const fetchBooking = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          parking_spot:parking_spots (*)
        `)
        .eq('id', params?.bookingId as string)
        .maybeSingle();

      if (error) throw error;
      setBooking(data);
    } catch (error) {
      console.error('Error fetching booking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Booking not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your parking spot has been reserved successfully</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-6">Booking Details</h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                <p className="font-mono text-sm">{booking.id}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-gray-600 mb-2">Parking Location</p>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">{booking.parking_spot.title}</p>
                    <p className="text-gray-600">{booking.parking_spot.address}</p>
                    <p className="text-gray-600">{booking.parking_spot.city}, {booking.parking_spot.state}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Start Time</p>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="font-semibold">
                        {new Date(booking.start_time).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">End Time</p>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="font-semibold">
                        {new Date(booking.end_time).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Car className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Vehicle Number</p>
                    <p className="font-semibold">{booking.vehicle_number}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount Paid</p>
                    <p className="text-3xl font-bold text-blue-600">${booking.total_price}</p>
                  </div>
                  <DollarSign className="h-12 w-12 text-blue-600 opacity-20" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>A confirmation email has been sent to your registered email address</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>You can view this booking anytime in your dashboard</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Show your booking ID at the parking location</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Link href="/dashboard" className="flex-1">
            <Button variant="outline" className="w-full">
              View My Bookings
            </Button>
          </Link>
          <Link href="/search" className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Book Another Spot
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
