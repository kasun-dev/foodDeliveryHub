
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderList, { Order } from '@/components/orders/OrderList';

const RestaurantOrders = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Load orders from localStorage for demo purposes
    const storedOrders = localStorage.getItem(`orders-${restaurantId}`);
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      // Create sample orders for demo
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      
      const sampleOrders: Order[] = [
        {
          id: 'order-1',
          restaurantId: restaurantId || '',
          customerId: 'cust-1',
          customerName: 'John Smith',
          customerPhone: '0771234567',
          items: [
            {
              menuItemId: 'item-1',
              name: 'Chicken Biryani',
              price: 850.00,
              quantity: 2
            },
            {
              menuItemId: 'item-2',
              name: 'Vegetable Kottu',
              price: 650.00,
              quantity: 1
            }
          ],
          total: 2350.00,
          status: 'pending',
          createdAt: now.toISOString()
        },
        {
          id: 'order-2',
          restaurantId: restaurantId || '',
          customerId: 'cust-2',
          customerName: 'Jane Doe',
          customerPhone: '0761234567',
          items: [
            {
              menuItemId: 'item-1',
              name: 'Chicken Biryani',
              price: 850.00,
              quantity: 1
            }
          ],
          total: 850.00,
          status: 'accepted',
          createdAt: oneHourAgo.toISOString()
        },
        {
          id: 'order-3',
          restaurantId: restaurantId || '',
          customerId: 'cust-3',
          customerName: 'Bob Johnson',
          customerPhone: '0751234567',
          items: [
            {
              menuItemId: 'item-2',
              name: 'Vegetable Kottu',
              price: 650.00,
              quantity: 3
            }
          ],
          total: 1950.00,
          status: 'completed',
          createdAt: twoHoursAgo.toISOString()
        }
      ];
      
      setOrders(sampleOrders);
      localStorage.setItem(`orders-${restaurantId}`, JSON.stringify(sampleOrders));
    }
  }, [restaurantId]);
  
  const handleOrderStatusChange = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem(`orders-${restaurantId}`, JSON.stringify(updatedOrders));
  };
  
  return (
    <div className="container mx-auto p-4">
      <OrderList 
        restaurantId={restaurantId || ''} 
        orders={orders}
        onOrderStatusChange={handleOrderStatusChange}
      />
    </div>
  );
};

export default RestaurantOrders;
