
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export interface Restaurant {
  id: string;
  userId: string;
  name: string;
  address: string;
  location: {
    longitude: number;
    latitude: number;
  };
  phone: string;
  cuisineType: string;
  description: string;
  openHours: string;
  imageReference: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();
  
  const handleManage = () => {
    navigate(`/restaurants/${restaurant.id}`);
  };
  
  return (
    <Card className="card-hover overflow-hidden bg-white hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden bg-gray-200">
        {restaurant.imageReference ? (
          <img 
            src={restaurant.imageReference} 
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
            No image available
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{restaurant.name}</CardTitle>
        <p className="text-sm text-gray-500">{restaurant.cuisineType}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1 text-sm">
          <p className="truncate">{restaurant.address}</p>
          <p>{restaurant.phone}</p>
          <p className="text-gray-600">{restaurant.openHours}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleManage} 
          className="w-full bg-theme-accent-1 hover:opacity-90"
        >
          Manage Restaurant
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
