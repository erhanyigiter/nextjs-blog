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
        router.push('/admin/login');
        return;
      }
      
      // Token geçerliliğini kontrol et (mock)
      try {
        const tokenData = JSON.parse(atob(adminToken.split('.')[1]));
        const now = Date.now() / 1000;
        
        if (tokenData.exp < now) {
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }
      
      setIsLoading(false);
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
