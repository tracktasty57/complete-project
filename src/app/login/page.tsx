"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ChefHat, AlertCircle } from 'lucide-react';
import { Card, CardBody, Button, Input } from '@/components/ui';
import { loginUser } from '@/services/api';

export default function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (formStatus === 'error') {
            setFormStatus('idle');
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('loading');

        if (!formData.email || !formData.password) {
            setFormStatus('error');
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        try {
            const res = await loginUser(formData);
            console.log('✅ Login success:', res);

            if (res.token) localStorage.setItem('token', res.token);
            if (res.user?.name) localStorage.setItem('username', res.user.name);

            setFormStatus('idle');
            router.push('/dashboard');
        } catch (err: any) {
            console.error('Login failed:', err);
            setFormStatus('error');
            setErrorMessage(err.message || 'Invalid email or password');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center space-y-4 animate-fade-in">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <ChefHat className="h-8 w-8 text-white" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600">Sign in to discover amazing recipes</p>
                </div>

                <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl animate-fade-in-up">
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {formStatus === 'error' && (
                                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-4 flex items-start space-x-3">
                                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-red-800">Login Failed</p>
                                        <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                                    </div>
                                </div>
                            )}

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your email"
                                leftIcon={<Mail className="h-4 w-4" />}
                                state={formStatus === 'error' ? 'error' : 'default'}
                            />

                            <div className="relative">
                                <Input
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your password"
                                    leftIcon={<Lock className="h-4 w-4" />}
                                    state={formStatus === 'error' ? 'error' : 'default'}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200"
                                loading={formStatus === 'loading'}
                            >
                                {formStatus === 'loading' ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </form>
                    </CardBody>
                </Card>

                <div className="text-center animate-fade-in-up">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-orange-600 hover:text-red-600 font-medium transition-colors">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
