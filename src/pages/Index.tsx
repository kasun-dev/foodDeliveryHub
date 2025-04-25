
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // Check if user is already logged in, redirect to dashboard if true
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-theme-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-theme-primary">RestroHub</h1>
          <p className="text-lg text-gray-600">Restaurant Management System</p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  );
};

export default Index;
