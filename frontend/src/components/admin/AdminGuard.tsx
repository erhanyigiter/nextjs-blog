"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gerçek uygulamada JWT token kontrolü yapılacak
    const checkAuth = () => {
      const adminToken = localStorage.getItem('adminToken');
      
      if (!adminToken) {
        setIsLoading(false);
        router.push('/admin/login');
        return;
      }
      
      // Token geçerliliğini kontrol et (mock)
      try {
        const tokenParts = adminToken.split('.');
        if (tokenParts.length !== 3) {
          throw new Error('Invalid token format');
        }
        
        const tokenData = JSON.parse(atob(tokenParts[1]));
        const now = Date.now() / 1000;
        
        // Check token expiration
        if (tokenData.exp < now) {
          localStorage.removeItem('adminToken');
          setIsLoading(false);
          router.push('/admin/login');
          return;
        }
        
        // Check if user has admin role
        if (tokenData.role !== 'admin') {
          localStorage.removeItem('adminToken');
          setIsLoading(false);
          router.push('/admin/login');
          return;
        }
        
        // Check if email is in valid admin list
        const validAdminEmails = [
          'admin@nextblog.com',
          'erhan@nextblog.com', 
          'superadmin@nextblog.com'
        ];
        
        if (!validAdminEmails.includes(tokenData.email)) {
          localStorage.removeItem('adminToken');
          setIsLoading(false);
          router.push('/admin/login');
          return;
        }
        
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Token validation error:', error);
        localStorage.removeItem('adminToken');
        setIsLoading(false);
        router.push('/admin/login');
        return;
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
