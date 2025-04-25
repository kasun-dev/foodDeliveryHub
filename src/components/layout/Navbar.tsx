
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

interface NavbarProps {
  restaurantId?: string;
}

const Navbar: React.FC<NavbarProps> = ({ restaurantId }) => {
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    localStorage.removeItem('user');
    toast.success('Signed out successfully');
    navigate('/');
  };

  // Get current user
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  return (
    <header className="bg-theme-primary text-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          RestroHub
        </Link>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-theme-primary text-white">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/dashboard" className="text-lg hover:text-theme-accent-1">
                  Dashboard
                </Link>
                
                {restaurantId && (
                  <>
                    <Link 
                      to={`/restaurants/${restaurantId}`} 
                      className="text-lg hover:text-theme-accent-1"
                    >
                      Restaurant Profile
                    </Link>
                    <Link 
                      to={`/restaurants/${restaurantId}/menu`} 
                      className="text-lg hover:text-theme-accent-1"
                    >
                      Menu Items
                    </Link>
                    <Link 
                      to={`/restaurants/${restaurantId}/orders`} 
                      className="text-lg hover:text-theme-accent-1"
                    >
                      Orders
                    </Link>
                  </>
                )}
                
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-lg text-theme-accent-2 mt-4"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="hover:text-theme-accent-1">
            Dashboard
          </Link>
          
          {restaurantId && (
            <>
              <Link 
                to={`/restaurants/${restaurantId}`} 
                className="hover:text-theme-accent-1"
              >
                Restaurant Profile
              </Link>
              <Link 
                to={`/restaurants/${restaurantId}/menu`} 
                className="hover:text-theme-accent-1"
              >
                Menu Items
              </Link>
              <Link 
                to={`/restaurants/${restaurantId}/orders`} 
                className="hover:text-theme-accent-1"
              >
                Orders
              </Link>
            </>
          )}
          
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-gray-300 text-sm">{user.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-theme-accent-2 hover:text-red-300 flex items-center gap-1"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
