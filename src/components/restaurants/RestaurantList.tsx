
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import RestaurantCard, { Restaurant } from './RestaurantCard';
import { useNavigate } from 'react-router-dom';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  const navigate = useNavigate();
  
  const handleAddRestaurant = () => {
    navigate('/restaurants/add');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Restaurants</h1>
        <Button 
          onClick={handleAddRestaurant} 
          className="bg-theme-accent-1 hover:opacity-90 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Restaurant
        </Button>
      </div>
      
      {restaurants.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">No Restaurants Registered</h2>
          <p className="text-gray-600 mb-4">
            You haven't registered any restaurants yet. Add your first restaurant to get started.
          </p>
          <Button 
            onClick={handleAddRestaurant} 
            className="bg-theme-accent-1 hover:opacity-90 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Restaurant
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
