
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import MenuItemForm from './MenuItemForm';

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
}

interface MenuItemListProps {
  restaurantId: string;
  menuItems: MenuItem[];
  onMenuItemsChange: (menuItems: MenuItem[]) => void;
}

const MenuItemList: React.FC<MenuItemListProps> = ({ restaurantId, menuItems, onMenuItemsChange }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const handleAvailabilityChange = (itemId: string, isAvailable: boolean) => {
    const updatedItems = menuItems.map(item => 
      item.id === itemId ? { ...item, isAvailable } : item
    );
    
    onMenuItemsChange(updatedItems);
    toast.success(`Item ${isAvailable ? 'available' : 'unavailable'} for ordering`);
  };
  
  const handleEditClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      const updatedItems = menuItems.filter(item => item.id !== itemId);
      onMenuItemsChange(updatedItems);
      toast.success('Menu item deleted successfully');
    }
  };
  
  const handleSaveItem = (item: MenuItem) => {
    if (item.id) {
      // Update existing item
      const updatedItems = menuItems.map(menuItem => 
        menuItem.id === item.id ? item : menuItem
      );
      onMenuItemsChange(updatedItems);
      setIsEditDialogOpen(false);
      toast.success('Menu item updated successfully');
    } else {
      // Add new item
      const newItem = {
        ...item,
        id: `item-${Date.now()}`,
        restaurantId
      };
      onMenuItemsChange([...menuItems, newItem]);
      setIsAddDialogOpen(false);
      toast.success('Menu item added successfully');
    }
    
    setSelectedItem(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-theme-accent-1 hover:opacity-90 flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
            </DialogHeader>
            <MenuItemForm 
              restaurantId={restaurantId}
              onSave={handleSaveItem}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {menuItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">No Menu Items</h2>
          <p className="text-gray-600 mb-4">
            You haven't added any menu items yet. Create your first menu item to get started.
          </p>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-theme-accent-1 hover:opacity-90 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Menu Item
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col"
            >
              <div className="h-48 overflow-hidden bg-gray-200 relative">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                    No image available
                  </div>
                )}
                <div className="absolute bottom-0 right-0 bg-white bg-opacity-80 px-2 py-1 m-2 rounded">
                  <span className="font-semibold text-theme-primary">
                    Rs {item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1 flex-1">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`availability-${item.id}`}
                      checked={item.isAvailable}
                      onCheckedChange={(checked) => handleAvailabilityChange(item.id, checked)}
                    />
                    <Label htmlFor={`availability-${item.id}`} className="text-sm">
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </Label>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(item)}
                      className="text-gray-600 hover:text-theme-accent-3"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-gray-600 hover:text-theme-accent-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <MenuItemForm 
              restaurantId={restaurantId}
              menuItem={selectedItem}
              onSave={handleSaveItem}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuItemList;
