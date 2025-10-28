"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/auth/AuthForm';

interface FormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  confirmPassword?: string;
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // TODO: Implement actual login API call
      console.log('Login data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard or home page
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm 
      mode="login" 
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}