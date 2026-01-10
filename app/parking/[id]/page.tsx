'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase, ParkingSpot } from '@/lib/supabase/client';
import { useAuth } from '@/lib/context/auth-context';
import { MapPin, Star, Clock, Shield, Calendar, Loader2, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function ParkingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [spot, setSpot] = useState<(ParkingSpot & { owner: { full_name: string; email: string } }) | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      fetchSpotDetails();
      fetchReviews();
    }
  }, [params?.id]);

  const fetchSpotDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('parking_spots')
        .select(`
          *,
          owner:profiles!owner_id (full_name, email)
        `)
        .eq('id', params?.id as string)
        .maybeSingle();

      if (error) throw error;
      setSpot(data);
    } catch (error) {
      console.error('Error fetching spot:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          user:profiles!user_id (full_name)
        `)
        .eq('parking_spot_id', params?.id as string)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      router.push('/auth/login');
    } else {
      router.push(`/booking/${spot?.id}`);
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
          <h1 className="text-2xl font-bold text-gray-900">Parking spot not found</h1>
          <Link href="/search">
            <Button className="mt-4">Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <Link href="/search" className="text-blue-600 hover:underline">
            ← Back to Search
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg flex items-center justify-center">
                  {spot.images && spot.images.length > 0 ? (
                    <img
                      src={spot.images[0]}
                      alt={spot.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <MapPin className="h-24 w-24 text-blue-600" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{spot.title}</h1>
                      <p className="text-gray-600 flex items-center text-lg">
                        <MapPin className="h-5 w-5 mr-2" />
                        {spot.address}, {spot.city}, {spot.state} {spot.zip_code}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
                      <span className="font-semibold">{spot.rating_avg > 0 ? spot.rating_avg.toFixed(1) : 'New'}</span>
                      {spot.total_reviews > 0 && (
                        <span className="text-gray-600 ml-1">({spot.total_reviews} reviews)</span>
                      )}
                    </div>
                    <Badge variant="secondary" className="capitalize">{spot.spot_type}</Badge>
                    <Badge variant="outline">
                      {spot.total_spots} {spot.total_spots === 1 ? 'spot' : 'spots'} available
                    </Badge>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h2 className="text-xl font-semibold mb-3">About this parking spot</h2>
                    <p className="text-gray-700 leading-relaxed">{spot.description}</p>
                  </div>

                  {spot.amenities && spot.amenities.length > 0 && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                        <div className="grid grid-cols-2 gap-3">
                          {spot.amenities.map((amenity: string, i: number) => (
                            <div key={i} className="flex items-center">
                              <Shield className="h-5 w-5 text-green-600 mr-2" />
                              <span className="capitalize">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <Separator className="my-6" />

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Operating Hours</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>Available 24/7</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Hosted by {spot.owner.full_name}</h2>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {spot.owner.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{spot.owner.full_name}</p>
                        <p className="text-sm text-gray-600">Parking Owner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {reviews.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                  <div className="space-y-4">
                    {reviews.map((review: any) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold mr-3">
                              {review.user.full_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium">{review.user.full_name}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                            <span className="font-semibold">{review.rating}</span>
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-gray-700 ml-13">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-gray-900">${spot.price_per_hour}</span>
                    <span className="text-gray-600 ml-2">per hour</span>
                  </div>
                  {spot.price_per_day && (
                    <p className="text-gray-600">or ${spot.price_per_day} per day</p>
                  )}
                </div>

                <Button
                  onClick={handleBookNow}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 mb-4"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Now
                </Button>

                <Separator className="my-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Shield className="h-5 w-5 text-green-600 mr-3" />
                    <span>Verified parking spot</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Instant booking confirmation</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-purple-600 mr-3" />
                    <span>Free cancellation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
