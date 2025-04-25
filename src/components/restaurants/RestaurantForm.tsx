
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Restaurant } from './RestaurantCard';

interface RestaurantFormProps {
  editRestaurant?: Restaurant;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ editRestaurant }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Restaurant, 'id'>>({
    userId: JSON.parse(localStorage.getItem('user') || '{}').id || '',
    name: editRestaurant?.name || '',
    address: editRestaurant?.address || '',
    location: editRestaurant?.location || {
      longitude: 0,
      latitude: 0
    },
    phone: editRestaurant?.phone || '',
    cuisineType: editRestaurant?.cuisineType || '',
    description: editRestaurant?.description || '',
    openHours: editRestaurant?.openHours || '',
    imageReference: editRestaurant?.imageReference || '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      
      // Create a preview URL for immediate display
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setFormData(prev => ({ ...prev, imageReference: previewUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This would be replaced with actual API call to save restaurant
      // Including image upload to Cloudinary
      console.log('Restaurant data:', formData);
      
      // Simulate successful save
      setTimeout(() => {
        const newRestaurant: Restaurant = {
          id: editRestaurant?.id || `rest-${Date.now()}`,
          ...formData
        };
        
        // Store restaurants in localStorage for demo purposes
        const existingRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
        
        if (editRestaurant) {
          // Update existing restaurant
          const updatedRestaurants = existingRestaurants.map((r: Restaurant) =>
            r.id === editRestaurant.id ? newRestaurant : r
          );
          localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
          toast.success('Restaurant updated successfully!');
        } else {
          // Add new restaurant
          localStorage.setItem('restaurants', JSON.stringify([...existingRestaurants, newRestaurant]));
          toast.success('Restaurant added successfully!');
        }
        
        navigate('/dashboard');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Save restaurant error:', error);
      toast.error('Failed to save restaurant. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">
        {editRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Restaurant Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-primary"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="any"
                value={formData.location.longitude}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      longitude: parseFloat(e.target.value)
                    }
                  }));
                }}
                required
                className="input-primary"
              />
            </div>
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="any"
                value={formData.location.latitude}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      latitude: parseFloat(e.target.value)
                    }
                  }));
                }}
                required
                className="input-primary"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="cuisineType">Cuisine Type</Label>
            <Input
              id="cuisineType"
              name="cuisineType"
              value={formData.cuisineType}
              onChange={handleChange}
              required
              className="input-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="input-primary min-h-[100px]"
            />
          </div>
          
          <div>
            <Label htmlFor="openHours">Opening Hours</Label>
            <Input
              id="openHours"
              name="openHours"
              value={formData.openHours}
              onChange={handleChange}
              placeholder="e.g. 10:00 AM - 10:00 PM"
              required
              className="input-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="image">Restaurant Image</Label>
            <div className="mt-1 flex items-center">
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input-primary"
              />
            </div>
            
            {formData.imageReference && (
              <div className="mt-2">
                <img 
                  src={formData.imageReference}
                  alt="Restaurant preview" 
                  className="h-32 w-auto object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-theme-accent-1 hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : editRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantForm;
