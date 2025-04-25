
import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect } from 'react';

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    
    // If no user is logged in and we're not on the landing page, redirect to login
    if (!user && location.pathname !== '/') {
      navigate('/');
    }
  }, [location.pathname, navigate]);
  
  // Don't show navbar on landing page
  if (location.pathname === '/') {
    return <Outlet />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar restaurantId={restaurantId} />
      <main className="flex-1 container mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
