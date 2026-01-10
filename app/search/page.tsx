"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { supabase, ParkingSpot } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Search,
  MapPin,
  Star,
  DollarSign,
  Shield,
  Filter,
  Loader2,
} from "lucide-react";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const [parkingSpots, setParkingSpots] = useState<
    (ParkingSpot & { owner: { full_name: string } })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState(
    searchParams?.get("location") || ""
  );
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [spotType, setSpotType] = useState("all");
  const [sortBy, setSortBy] = useState("distance");

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  const fetchParkingSpots = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("parking_spots")
        .select(
          `
          *,
          owner:profiles!owner_id (full_name)
        `
        )
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setParkingSpots(data || []);
      if (data && data.length > 0) {
        toast.success(`Found ${data.length} parking spots! 🚗`, {
          description: "Browse the available spots below",
        });
      } else {
        toast.info("No parking spots available", {
          description: "Try adjusting your location or filters",
        });
      }
    } catch (error: any) {
      console.error("Error fetching parking spots:", error);
      toast.error("Search Failed", {
        description: error.message || "Failed to fetch parking spots",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchParkingSpots();
  };

  const filteredSpots = parkingSpots.filter((spot) => {
    const matchesPrice =
      spot.price_per_hour >= priceRange[0] &&
      spot.price_per_hour <= priceRange[1];
    const matchesType = spotType === "all" || spot.spot_type === spotType;
    const matchesLocation =
      !searchLocation ||
      spot.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
      spot.state.toLowerCase().includes(searchLocation.toLowerCase());

    return matchesPrice && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative text-white py-20 md:py-28 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop')",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-blue-900/60"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Perfect Parking Spots in Seconds
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Book verified parking spaces near you. Fast, secure, and
              hassle-free.
            </p>
          </div>

          {/* Search Bar in Hero */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-4 py-3">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder="Enter city, address, or landmark..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="border-0 focus-visible:ring-0 bg-gray-50 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-600 text-white font-semibold px-8 md:px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Parking
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 inline-block mb-4 transform transition hover:scale-110 duration-300">
                <Loader2
                  className="h-12 w-12 text-white mx-auto"
                  style={{ animation: "none" }}
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Instant Booking</h3>
              <p className="text-blue-100">
                Reserve your spot in just a few clicks
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 inline-block mb-4 transform transition hover:scale-110 duration-300">
                <Shield className="h-12 w-12 text-white mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Verified Spots</h3>
              <p className="text-blue-100">
                All parking spaces verified and secure
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 inline-block mb-4 transform transition hover:scale-110 duration-300">
                <Star className="h-12 w-12 text-white mx-auto fill-current" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Trusted Reviews</h3>
              <p className="text-blue-100">See ratings from other parkers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24 rounded-2xl shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Filter className="h-5 w-5 mr-2 text-blue-600 font-bold" />
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}/hr
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
                    <label className="text-sm font-bold text-gray-700 mb-3 block">
                      Parking Type
                    </label>
                    <Select value={spotType} onValueChange={setSpotType}>
                      <SelectTrigger className="rounded-lg">
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
                    <label className="text-sm font-bold text-gray-700 mb-3 block">
                      Sort By
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distance">Distance</SelectItem>
                        <SelectItem value="price_low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price_high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full rounded-lg font-semibold"
                    onClick={() => {
                      setPriceRange([0, 50]);
                      setSpotType("all");
                      setSortBy("distance");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Available Parking Spots
                </h1>
                <p className="text-gray-600 text-lg">
                  {filteredSpots.length}{" "}
                  {filteredSpots.length === 1 ? "spot" : "spots"} found near you
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : filteredSpots.length === 0 ? (
              <Card className="rounded-2xl border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No parking spots found
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Try adjusting your filters or search in a different location
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredSpots.map((spot) => (
                  <Link key={spot.id} href={`/parking/${spot.id}`}>
                    <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl border-0 overflow-hidden group">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Image Section */}
                          <div className="w-full md:w-64 h-56 bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
                            {spot.images && spot.images.length > 0 ? (
                              <img
                                src={spot.images[0]}
                                alt={spot.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                                <MapPin className="h-16 w-16 text-white opacity-50" />
                              </div>
                            )}
                            {/* Price Badge */}
                            <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-xl px-4 py-2 font-bold text-lg shadow-lg">
                              ${spot.price_per_hour}/hr
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {spot.title}
                                  </h3>
                                  <p className="text-gray-600 flex items-center text-base">
                                    <MapPin className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                                    <span>
                                      {spot.address}, {spot.city}, {spot.state}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <p className="text-gray-600 mb-5 line-clamp-2 text-base">
                                {spot.description}
                              </p>

                              {/* Tags/Badges */}
                              <div className="flex flex-wrap gap-2 mb-6">
                                <Badge
                                  variant="secondary"
                                  className="capitalize bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full"
                                >
                                  {spot.spot_type}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="font-semibold px-3 py-1 rounded-full"
                                >
                                  {spot.total_spots}{" "}
                                  {spot.total_spots === 1 ? "spot" : "spots"}
                                </Badge>
                                {spot.amenities &&
                                  spot.amenities.length > 0 && (
                                    <>
                                      {spot.amenities
                                        .slice(0, 2)
                                        .map((amenity: string, i: number) => (
                                          <Badge
                                            key={i}
                                            variant="outline"
                                            className="px-3 py-1 rounded-full font-medium"
                                          >
                                            {amenity}
                                          </Badge>
                                        ))}
                                    </>
                                  )}
                              </div>
                            </div>

                            {/* Footer with Rating and Button */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                              <div className="flex items-center space-x-6 text-sm">
                                <span className="flex items-center font-semibold text-gray-700">
                                  <Star className="h-5 w-5 text-yellow-400 mr-2 fill-current" />
                                  {spot.rating_avg > 0
                                    ? spot.rating_avg.toFixed(1)
                                    : "New"}
                                  {spot.total_reviews > 0 && (
                                    <span className="text-gray-500 ml-1">
                                      ({spot.total_reviews})
                                    </span>
                                  )}
                                </span>
                                <span className="flex items-center font-semibold text-green-600">
                                  <Shield className="h-5 w-5 mr-2" />
                                  Verified
                                </span>
                              </div>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-lg transition-all transform hover:scale-105">
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
