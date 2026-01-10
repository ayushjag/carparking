'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/lib/context/auth-context';
import { MapPin, Loader2, DollarSign } from 'lucide-react';

const AMENITIES = [
  'Security Guard',
  'CCTV',
  'EV Charging',
  'Covered',
  '24/7 Access',
  'Lighting',
  'Attendant',
  'Valet',
];

export default function CreateParkingPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    latitude: 0,
    longitude: 0,
    price_per_hour: '',
    price_per_day: '',
    total_spots: 1,
    spot_type: 'covered',
    amenities: [] as string[],
  });

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'owner')) {
      router.push('/');
    }
  }, [user, profile, authLoading]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const geocodeAddress = async () => {
    const address = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip_code}`;
    const lat = 40.7128 + (Math.random() - 0.5) * 0.1;
    const lng = -74.0060 + (Math.random() - 0.5) * 0.1;
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);

    try {
      await geocodeAddress();

      const { data, error } = await supabase
        .from('parking_spots')
        .insert({
          owner_id: user.id,
          title: formData.title,
          description: formData.description,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
          latitude: formData.latitude,
          longitude: formData.longitude,
          price_per_hour: parseFloat(formData.price_per_hour),
          price_per_day: formData.price_per_day ? parseFloat(formData.price_per_day) : null,
          total_spots: formData.total_spots,
          spot_type: formData.spot_type,
          amenities: formData.amenities,
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;

      router.push('/owner/dashboard');
    } catch (error) {
      console.error('Error creating parking spot:', error);
      alert('Failed to create parking spot. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Parking Spot</h1>
          <p className="text-gray-600">Share your parking space and start earning</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Parking Spot Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Downtown Covered Parking"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your parking spot, access instructions, and any important details..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="spot_type">Parking Type *</Label>
                  <Select value={formData.spot_type} onValueChange={(value) => handleChange('spot_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="covered">Covered</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="garage">Garage</SelectItem>
                      <SelectItem value="street">Street</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="total_spots">Number of Spots *</Label>
                  <Input
                    id="total_spots"
                    type="number"
                    min="1"
                    value={formData.total_spots}
                    onChange={(e) => handleChange('total_spots', parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="zip_code">ZIP Code</Label>
                  <Input
                    id="zip_code"
                    placeholder="10001"
                    value={formData.zip_code}
                    onChange={(e) => handleChange('zip_code', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price_per_hour">Hourly Rate * ($)</Label>
                  <Input
                    id="price_per_hour"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="8.00"
                    value={formData.price_per_hour}
                    onChange={(e) => handleChange('price_per_hour', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price_per_day">Daily Rate ($) - Optional</Label>
                  <Input
                    id="price_per_day"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="50.00"
                    value={formData.price_per_day}
                    onChange={(e) => handleChange('price_per_day', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {AMENITIES.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={amenity} className="cursor-pointer">{amenity}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.push('/owner/dashboard')}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <MapPin className="mr-2 h-5 w-5" />
                  List Parking Spot
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
