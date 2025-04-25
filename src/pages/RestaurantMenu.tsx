
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuItemList, { MenuItem } from '@/components/menu/MenuItemList';

const RestaurantMenu = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  useEffect(() => {
    // Load menu items from localStorage for demo purposes
    const storedMenuItems = localStorage.getItem(`menuItems-${restaurantId}`);
    if (storedMenuItems) {
      setMenuItems(JSON.parse(storedMenuItems));
    } else {
      // Create sample menu items for demo
      const sampleMenuItems: MenuItem[] = [
        {
          id: 'item-1',
          restaurantId: restaurantId || '',
          name: 'Chicken Biryani',
          description: 'Deliciously spiced basmati rice with tender chicken pieces.',
          price: 850.00,
          imageUrl: 'https://example.com/images/chicken-biryani.jpg',
          isAvailable: true
        },
        {
          id: 'item-2',
          restaurantId: restaurantId || '',
          name: 'Vegetable Kottu',
          description: 'Shredded roti mixed with vegetables and spices.',
          price: 650.00,
          imageUrl: '',
          isAvailable: true
        }
      ];
      
      setMenuItems(sampleMenuItems);
      localStorage.setItem(`menuItems-${restaurantId}`, JSON.stringify(sampleMenuItems));
    }
  }, [restaurantId]);
  
  const handleMenuItemsChange = (updatedMenuItems: MenuItem[]) => {
    setMenuItems(updatedMenuItems);
    localStorage.setItem(`menuItems-${restaurantId}`, JSON.stringify(updatedMenuItems));
  };
  
  return (
    <div className="container mx-auto p-4">
      <MenuItemList 
        restaurantId={restaurantId || ''} 
        menuItems={menuItems}
        onMenuItemsChange={handleMenuItemsChange}
      />
    </div>
  );
};

export default RestaurantMenu;
