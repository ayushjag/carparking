'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { supabase, ParkingSpot } from '@/lib/supabase/client';
import { useAuth } from '@/lib/context/auth-context';
import { MapPin, Calendar, Clock, DollarSign, Loader2 } from 'lucide-react';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [spot, setSpot] = useState<ParkingSpot | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (params?.spotId) {
      fetchSpot();
    }
  }, [params?.spotId, user]);

  useEffect(() => {
    if (startTime && endTime && spot) {
      calculatePrice();
    }
  }, [startTime, endTime, spot]);

  const fetchSpot = async () => {
    try {
      const { data, error } = await supabase
        .from('parking_spots')
        .select('*')
        .eq('id', params?.spotId as string)
        .maybeSingle();

      if (error) throw error;
      setSpot(data);
    } catch (error) {
      console.error('Error fetching spot:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    if (!spot || !startTime || !endTime) return;

    const start = new Date(startTime);
    const end = new Date(endTime);
    const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));

    if (hours > 0) {
      setTotalPrice(hours * spot.price_per_hour);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !spot) return;

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          parking_spot_id: spot.id,
          user_id: user.id,
          start_time: startTime,
          end_time: endTime,
          total_price: totalPrice,
          vehicle_number: vehicleNumber,
          notes: notes,
          status: 'confirmed',
          payment_status: 'paid',
        })
        .select()
        .single();

      if (error) throw error;

      router.push(`/booking/confirmation/${data.id}`);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
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

  if (!spot) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Parking spot not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Parking Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{spot.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {spot.address}, {spot.city}, {spot.state}
                      </p>
                      <p className="text-blue-600 font-semibold mt-2">
                        ${spot.price_per_hour}/hour
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">Start Date & Time</Label>
                      <Input
                        id="startTime"
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Date & Time</Label>
                      <Input
                        id="endTime"
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        min={startTime || new Date().toISOString().slice(0, 16)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                    <Input
                      id="vehicleNumber"
                      type="text"
                      placeholder="ABC-1234"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Input
                      id="notes"
                      type="text"
                      placeholder="Any special requests or information"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {startTime && endTime && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-semibold">
                          {Math.ceil((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60))} hours
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rate</span>
                        <span className="font-semibold">${spot.price_per_hour}/hr</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-semibold text-lg">Total</span>
                        <span className="font-bold text-2xl text-blue-600">${totalPrice}</span>
                      </div>
                    </>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    disabled={!startTime || !endTime || !vehicleNumber || submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <DollarSign className="mr-2 h-5 w-5" />
                        Confirm & Pay ${totalPrice}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By confirming, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
