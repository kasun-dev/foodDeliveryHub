
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">RestroHub</CardTitle>
        <CardDescription className="text-center">
          Manage your restaurant business effectively
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500">
        {activeTab === 'login' ? (
          <span>
            Don't have an account?{' '}
            <button
              onClick={() => setActiveTab('register')}
              className="text-theme-accent-1 hover:underline font-semibold"
              type="button"
            >
              Sign up
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <button
              onClick={() => setActiveTab('login')}
              className="text-theme-accent-1 hover:underline font-semibold"
              type="button"
            >
              Sign in
            </button>
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
