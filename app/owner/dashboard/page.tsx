'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { supabase, ParkingSpot } from '@/lib/supabase/client';
import { useAuth } from '@/lib/context/auth-context';
import { Car, DollarSign, MapPin, Calendar, Loader2, Plus, Edit, Eye } from 'lucide-react';
import Link from 'next/link';

export default function OwnerDashboard() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSpots: 0,
    activeSpots: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'owner')) {
      router.push('/');
    } else if (user && profile?.role === 'owner') {
      fetchData();
    }
  }, [user, profile, authLoading]);

  const fetchData = async () => {
    try {
      const [spotsRes, bookingsRes] = await Promise.all([
        supabase
          .from('parking_spots')
          .select('*')
          .eq('owner_id', user?.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('bookings')
          .select(`
            *,
            parking_spot:parking_spots!inner (owner_id)
          `)
          .eq('parking_spot.owner_id', user?.id)
          .order('created_at', { ascending: false }),
      ]);

      if (spotsRes.error) throw spotsRes.error;
      if (bookingsRes.error) throw bookingsRes.error;

      setSpots(spotsRes.data || []);
      setBookings(bookingsRes.data || []);

      const totalSpots = spotsRes.data?.length || 0;
      const activeSpots = spotsRes.data?.filter(s => s.is_active).length || 0;
      const totalBookings = bookingsRes.data?.length || 0;
      const totalRevenue = bookingsRes.data?.reduce((sum, b) => sum + Number(b.total_price), 0) || 0;

      setStats({ totalSpots, activeSpots, totalBookings, totalRevenue });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSpotStatus = async (spotId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('parking_spots')
        .update({ is_active: !currentStatus })
        .eq('id', spotId);

      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Error updating spot status:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
            <p className="text-gray-600">Manage your parking spots and bookings</p>
          </div>
          <Link href="/parking/create">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-5 w-5 mr-2" />
              Add New Spot
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Spots</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalSpots}</p>
                </div>
                <MapPin className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Spots</p>
                  <p className="text-3xl font-bold text-green-600">{stats.activeSpots}</p>
                </div>
                <Car className="h-12 w-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
                <Calendar className="h-12 w-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">${stats.totalRevenue}</p>
                </div>
                <DollarSign className="h-12 w-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>My Parking Spots</CardTitle>
            </CardHeader>
            <CardContent>
              {spots.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No parking spots listed yet</p>
                  <Link href="/parking/create">
                    <Button>List Your First Spot</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {spots.map((spot) => (
                    <Card key={spot.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{spot.title}</h3>
                            <p className="text-sm text-gray-600">{spot.city}, {spot.state}</p>
                            <p className="text-blue-600 font-semibold mt-2">${spot.price_per_hour}/hr</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={spot.is_active}
                              onCheckedChange={() => toggleSpotStatus(spot.id, spot.is_active)}
                            />
                            <Link href={`/parking/${spot.id}`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <Badge variant={spot.is_active ? "default" : "secondary"}>
                            {spot.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <span className="text-gray-600">{spot.total_spots} spots</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-sm">{booking.vehicle_number || 'N/A'}</p>
                            <p className="text-xs text-gray-600">
                              {new Date(booking.start_time).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">${booking.total_price}</p>
                            <Badge className={
                              booking.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                              booking.status === 'active' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }>
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
