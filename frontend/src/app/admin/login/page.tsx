"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Admin credentials validation
      const validAdmins = [
        { email: 'admin@nextblog.com', password: 'admin123', name: 'Admin User' },
        { email: 'erhan@nextblog.com', password: 'erhan123', name: 'Erhan Yığiter' },
        { email: 'superadmin@nextblog.com', password: 'super123', name: 'Super Admin' }
      ];
      
      // Check if credentials match any valid admin
      const admin = validAdmins.find(
        admin => admin.email === formData.email && admin.password === formData.password
      );
      
      if (!admin) {
        setErrors({ general: 'Geçersiz e-posta veya şifre. Lütfen bilgilerinizi kontrol edin.' });
        setLoading(false);
        return;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Admin login successful:', { email: admin.email, name: admin.name });
      
      // Create JWT token (header.payload.signature format)
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({
        sub: admin.email,
        email: admin.email,
        name: admin.name,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      }));
      const signature = 'admin-signature-' + Date.now();
      
      const token = `${header}.${payload}.${signature}`;
      localStorage.setItem('adminToken', token);
      
      // Redirect to admin dashboard
      router.push('/admin');
    } catch (error) {
      console.error('Admin login error:', error);
      setErrors({ general: 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary"></div>
            <span className="text-2xl font-bold">NextBlog Admin</span>
          </div>
          <p className="text-muted-foreground">
            Admin paneline giriş yapın
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Admin Girişi</CardTitle>
            <CardDescription className="text-center">
              Yönetici hesabınızla giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {errors.general}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@nextblog.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'border-destructive' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <Label htmlFor="remember-me" className="text-sm">
                    Beni hatırla
                  </Label>
                </div>
                <Button variant="link" className="p-0 h-auto text-sm">
                  Şifremi unuttum
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Normal kullanıcı mısınız?{' '}
                <Button variant="link" className="p-0 h-auto" asChild>
                  <a href="/auth/login">Kullanıcı girişi</a>
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo credentials */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Geçerli Admin Hesapları</h3>
            <div className="text-sm space-y-2">
              <div className="border-l-2 border-primary pl-3">
                <p><strong>Admin:</strong> admin@nextblog.com</p>
                <p><strong>Şifre:</strong> admin123</p>
              </div>
              <div className="border-l-2 border-green-500 pl-3">
                <p><strong>Erhan:</strong> erhan@nextblog.com</p>
                <p><strong>Şifre:</strong> erhan123</p>
              </div>
              <div className="border-l-2 border-purple-500 pl-3">
                <p><strong>Super Admin:</strong> superadmin@nextblog.com</p>
                <p><strong>Şifre:</strong> super123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
