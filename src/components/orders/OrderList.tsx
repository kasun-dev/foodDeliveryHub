
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
}

interface OrderListProps {
  restaurantId: string;
  orders: Order[];
  onOrderStatusChange: (orderId: string, status: Order['status']) => void;
}

const OrderList: React.FC<OrderListProps> = ({ restaurantId, orders, onOrderStatusChange }) => {
  const handleAcceptOrder = (orderId: string) => {
    onOrderStatusChange(orderId, 'accepted');
    toast.success('Order accepted');
  };
  
  const handleDeclineOrder = (orderId: string) => {
    onOrderStatusChange(orderId, 'declined');
    toast.success('Order declined');
  };
  
  const handleCompleteOrder = (orderId: string) => {
    onOrderStatusChange(orderId, 'completed');
    toast.success('Order marked as completed');
  };
  
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const acceptedOrders = orders.filter(order => order.status === 'accepted');
  const otherOrders = orders.filter(order => ['declined', 'completed'].includes(order.status));
  
  const renderOrderCard = (order: Order) => (
    <Card key={order.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Order #{order.id.slice(-6)}</CardTitle>
            <CardDescription>
              {new Date(order.createdAt).toLocaleString()}
            </CardDescription>
          </div>
          <Badge 
            className={
              order.status === 'pending' ? 'bg-theme-accent-3 text-theme-primary' :
              order.status === 'accepted' ? 'bg-theme-accent-1 text-white' :
              order.status === 'declined' ? 'bg-theme-accent-2 text-white' :
              'bg-gray-500 text-white'
            }
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <p><span className="font-semibold">Customer:</span> {order.customerName}</p>
            <p><span className="font-semibold">Phone:</span> {order.customerPhone}</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.quantity} x {item.name}
                </span>
                <span className="font-medium">
                  Rs {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>Rs {order.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {order.status === 'pending' && (
          <>
            <Button 
              variant="outline" 
              className="border-theme-accent-2 text-theme-accent-2 hover:bg-theme-accent-2 hover:text-white"
              onClick={() => handleDeclineOrder(order.id)}
            >
              <X className="h-4 w-4 mr-1" />
              Decline
            </Button>
            <Button 
              className="bg-theme-accent-1 hover:opacity-90"
              onClick={() => handleAcceptOrder(order.id)}
            >
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
          </>
        )}
        
        {order.status === 'accepted' && (
          <Button 
            className="bg-gray-600 hover:bg-gray-700"
            onClick={() => handleCompleteOrder(order.id)}
          >
            Mark as Completed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600">
            You haven't received any orders yet. They will appear here when customers place orders.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Orders ({pendingOrders.length})</h2>
            {pendingOrders.length === 0 ? (
              <p className="text-gray-500">No pending orders</p>
            ) : (
              pendingOrders.map(renderOrderCard)
            )}
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Active Orders ({acceptedOrders.length})</h2>
            {acceptedOrders.length === 0 ? (
              <p className="text-gray-500">No active orders</p>
            ) : (
              acceptedOrders.map(renderOrderCard)
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Previous Orders ({otherOrders.length})</h2>
            {otherOrders.length === 0 ? (
              <p className="text-gray-500">No previous orders</p>
            ) : (
              otherOrders.map(renderOrderCard)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
