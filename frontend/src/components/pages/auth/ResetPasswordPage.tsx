"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [formData, setFormData] = useState({
    email: '',
    token: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const validateEmailForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.token.trim()) {
      newErrors.token = 'Sıfırlama kodu gereklidir';
    }

    if (!formData.password) {
      newErrors.password = 'Yeni şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmailForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: API call to send reset email
      console.log('Reset email request:', { email: formData.email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStep('reset');
      alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!');
    } catch (error) {
      console.error('Reset email error:', error);
      alert('E-posta gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateResetForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: API call to reset password
      console.log('Password reset data:', {
        token: formData.token,
        password: formData.password
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Şifreniz başarıyla sıfırlandı! Giriş yapabilirsiniz.');
      // Redirect to login page
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Şifre sıfırlanırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!formData.email) {
      alert('Lütfen önce e-posta adresinizi girin.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: API call to resend reset email
      console.log('Resend reset email:', { email: formData.email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Şifre sıfırlama bağlantısı tekrar gönderildi!');
    } catch (error) {
      console.error('Resend email error:', error);
      alert('E-posta tekrar gönderilirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary"></div>
            <span className="text-2xl font-bold text-foreground">NextBlog</span>
          </Link>
        </div>

        {/* Reset Password Form */}
        <Card className="blog-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {step === 'email' ? 'Şifremi Unuttum' : 'Şifre Sıfırla'}
            </CardTitle>
            <CardDescription>
              {step === 'email' 
                ? 'E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim'
                : 'E-posta adresinize gelen kodu ve yeni şifrenizi girin'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    E-posta Adresi <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="blog-input"
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full blog-button-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    E-posta Adresi
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="blog-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token">
                    Sıfırlama Kodu <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="token"
                    name="token"
                    type="text"
                    placeholder="6 haneli kod"
                    value={formData.token}
                    onChange={handleInputChange}
                    className="blog-input"
                    required
                  />
                  {errors.token && (
                    <p className="text-sm text-destructive">{errors.token}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    Yeni Şifre <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="blog-input"
                    required
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Yeni Şifre Tekrar <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="blog-input"
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full blog-button-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sıfırlanıyor...' : 'Şifreyi Sıfırla'}
                </Button>
              </form>
            )}

            {/* Help Text */}
            <div className="text-center space-y-2">
              {step === 'email' ? (
                <p className="text-sm text-muted-foreground">
                  E-posta adresinize şifre sıfırlama bağlantısı göndereceğiz.
                  Lütfen spam klasörünüzü de kontrol edin.
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    E-posta adresinize gönderilen 6 haneli kodu girin.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    className="text-sm"
                  >
                    Kodu Tekrar Gönder
                  </Button>
                </div>
              )}
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <Link href="/auth/login" className="text-sm text-primary hover:text-primary/80 transition-colors">
                ← Giriş sayfasına dön
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <Card className="blog-card border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Yardıma mı ihtiyacınız var?
                </h3>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                  Şifre sıfırlama işlemi ile ilgili sorun yaşıyorsanız,{' '}
                  <a href="mailto:support@nextblog.com" className="underline hover:no-underline">
                    destek ekibimizle iletişime geçin
                  </a>
                  .
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}