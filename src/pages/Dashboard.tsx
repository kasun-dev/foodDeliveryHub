
import React, { useEffect, useState } from 'react';
import RestaurantList from '@/components/restaurants/RestaurantList';
import { Restaurant } from '@/components/restaurants/RestaurantCard';

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
  // Load restaurants from localStorage for demo purposes
  useEffect(() => {
    const storedRestaurants = localStorage.getItem('restaurants');
    if (storedRestaurants) {
      const parsedRestaurants = JSON.parse(storedRestaurants);
      
      // Filter restaurants by current user's ID
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userRestaurants = parsedRestaurants.filter(
        (restaurant: Restaurant) => restaurant.userId === user.id
      );
      
      setRestaurants(userRestaurants);
    }
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <RestaurantList restaurants={restaurants} />
    </div>
  );
};

export default Dashboard;
