
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { MenuItem } from './MenuItemList';

interface MenuItemFormProps {
  restaurantId: string;
  menuItem?: MenuItem;
  onSave: (menuItem: MenuItem) => void;
  onCancel: () => void;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  restaurantId,
  menuItem,
  onSave,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'> & { id?: string }>({
    id: menuItem?.id,
    restaurantId,
    name: menuItem?.name || '',
    description: menuItem?.description || '',
    price: menuItem?.price || 0,
    imageUrl: menuItem?.imageUrl || '',
    isAvailable: menuItem?.isAvailable !== false, // Default to true if not specified
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value);
    setFormData(prev => ({ ...prev, price: isNaN(price) ? 0 : price }));
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isAvailable: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      
      // Create a preview URL for immediate display
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setFormData(prev => ({ ...prev, imageUrl: previewUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This would be replaced with actual API call to save menu item
      // Including image upload to Cloudinary
      console.log('Menu item data:', formData);
      
      // Simulate successful save
      setTimeout(() => {
        onSave(formData as MenuItem);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Save menu item error:', error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price (Rs)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handlePriceChange}
            required
            className="input-primary"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="input-primary min-h-[80px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Food Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="input-primary"
        />
        
        {formData.imageUrl && (
          <div className="mt-2">
            <img 
              src={formData.imageUrl}
              alt="Food preview" 
              className="h-32 w-auto object-cover rounded-md"
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isAvailable"
          checked={formData.isAvailable}
          onCheckedChange={handleAvailabilityChange}
        />
        <Label htmlFor="isAvailable">
          {formData.isAvailable ? 'Available for ordering' : 'Unavailable'}
        </Label>
      </div>
      
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-theme-accent-1 hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : menuItem ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
};

export default MenuItemForm;
