'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { supabase, ParkingSpot } from '@/lib/supabase/client';
import { Search, MapPin, Star, DollarSign, Shield, Filter, Loader2 } from 'lucide-react';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const [parkingSpots, setParkingSpots] = useState<(ParkingSpot & { owner: { full_name: string } })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState(searchParams?.get('location') || '');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [spotType, setSpotType] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  const fetchParkingSpots = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('parking_spots')
        .select(`
          *,
          owner:profiles!owner_id (full_name)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setParkingSpots(data || []);
    } catch (error) {
      console.error('Error fetching parking spots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchParkingSpots();
  };

  const filteredSpots = parkingSpots.filter(spot => {
    const matchesPrice = spot.price_per_hour >= priceRange[0] && spot.price_per_hour <= priceRange[1];
    const matchesType = spotType === 'all' || spot.spot_type === spotType;
    const matchesLocation = !searchLocation ||
      spot.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
      spot.state.toLowerCase().includes(searchLocation.toLowerCase());

    return matchesPrice && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center border rounded-lg px-4 py-2">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <Input
                type="text"
                placeholder="Search by city, address..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="border-0 focus-visible:ring-0"
              />
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Filter className="h-5 w-5 mr-2 text-gray-600" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Price Range (${priceRange[0]} - ${priceRange[1]}/hr)
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50}
                      step={1}
                      className="mb-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Parking Type</label>
                    <Select value={spotType} onValueChange={setSpotType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="covered">Covered</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="garage">Garage</SelectItem>
                        <SelectItem value="street">Street</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distance">Distance</SelectItem>
                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPriceRange([0, 50]);
                      setSpotType('all');
                      setSortBy('distance');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {filteredSpots.length} Parking Spots Available
              </h1>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : filteredSpots.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No parking spots found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search in a different location</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredSpots.map((spot) => (
                  <Link key={spot.id} href={`/parking/${spot.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                            {spot.images && spot.images.length > 0 ? (
                              <img
                                src={spot.images[0]}
                                alt={spot.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <MapPin className="h-12 w-12 text-blue-600" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{spot.title}</h3>
                                <p className="text-gray-600 flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {spot.address}, {spot.city}, {spot.state}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-bold text-blue-600">${spot.price_per_hour}</div>
                                <div className="text-sm text-gray-500">per hour</div>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-4 line-clamp-2">{spot.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="secondary" className="capitalize">
                                {spot.spot_type}
                              </Badge>
                              <Badge variant="outline">
                                {spot.total_spots} {spot.total_spots === 1 ? 'spot' : 'spots'}
                              </Badge>
                              {spot.amenities && spot.amenities.length > 0 && (
                                <>
                                  {spot.amenities.slice(0, 3).map((amenity: string, i: number) => (
                                    <Badge key={i} variant="outline">{amenity}</Badge>
                                  ))}
                                </>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                                  {spot.rating_avg > 0 ? spot.rating_avg.toFixed(1) : 'New'}
                                  {spot.total_reviews > 0 && ` (${spot.total_reviews})`}
                                </span>
                                <span className="flex items-center">
                                  <Shield className="h-4 w-4 text-green-500 mr-1" />
                                  Verified
                                </span>
                              </div>
                              <Button className="bg-blue-600 hover:bg-blue-700">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
