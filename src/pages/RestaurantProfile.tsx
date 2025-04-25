
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Restaurant } from '@/components/restaurants/RestaurantCard';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RestaurantForm from '@/components/restaurants/RestaurantForm';

const RestaurantProfile = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  useEffect(() => {
    // Load restaurant from localStorage for demo purposes
    const storedRestaurants = localStorage.getItem('restaurants');
    if (storedRestaurants && restaurantId) {
      const parsedRestaurants = JSON.parse(storedRestaurants);
      const foundRestaurant = parsedRestaurants.find(
        (r: Restaurant) => r.id === restaurantId
      );
      
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
      } else {
        toast.error('Restaurant not found');
        navigate('/dashboard');
      }
    }
  }, [restaurantId, navigate]);
  
  const handleDeleteRestaurant = () => {
    if (window.confirm('Are you sure you want to delete this restaurant? This action cannot be undone.')) {
      // Remove restaurant from localStorage for demo purposes
      const storedRestaurants = localStorage.getItem('restaurants');
      if (storedRestaurants && restaurantId) {
        const parsedRestaurants = JSON.parse(storedRestaurants);
        const updatedRestaurants = parsedRestaurants.filter(
          (r: Restaurant) => r.id !== restaurantId
        );
        
        localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
        toast.success('Restaurant deleted successfully');
        navigate('/dashboard');
      }
    }
  };
  
  if (!restaurant) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Restaurant Profile</h1>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-theme-accent-2 text-theme-accent-2 hover:bg-theme-accent-2 hover:text-white"
            onClick={handleDeleteRestaurant}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button
            className="flex items-center gap-2 bg-theme-accent-3 text-theme-primary hover:opacity-90"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-64">
            {restaurant.imageReference ? (
              <img 
                src={restaurant.imageReference} 
                alt={restaurant.name}
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                No image available
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{restaurant.name}</h2>
                  <p className="text-gray-500">{restaurant.cuisineType}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Contact Information</h3>
                    <ul className="mt-2 space-y-1">
                      <li><span className="font-medium">Address:</span> {restaurant.address}</li>
                      <li><span className="font-medium">Phone:</span> {restaurant.phone}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700">Hours</h3>
                    <p className="mt-2">{restaurant.openHours}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Description</h3>
                  <p className="mt-2">{restaurant.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Location</h3>
                  <div className="mt-2">
                    <p>Longitude: {restaurant.location.longitude}</p>
                    <p>Latitude: {restaurant.location.latitude}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Restaurant</DialogTitle>
          </DialogHeader>
          <RestaurantForm 
            editRestaurant={restaurant} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantProfile;
