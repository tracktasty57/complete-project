"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    ChefHat,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import { Card, CardBody, Button, Input } from '@/components/ui';
import { registerUser } from '@/services/api';

export default function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        setServerError('');
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError('');

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setFormStatus('error');
            return;
        }

        setFormStatus('loading');
        setErrors({});

        try {
            const res = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            console.log('✅ Registration success:', res);
            setFormStatus('success');

            setTimeout(() => router.push('/login'), 2000);
        } catch (err: any) {
            console.error('Registration failed:', err);
            setFormStatus('error');
            setServerError(err.message || 'Registration failed. Try again later.');
        }
    };

    const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
        if (field === 'password') setShowPassword(!showPassword);
        else setShowConfirmPassword(!showConfirmPassword);
    };

    if (formStatus === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl animate-fade-in">
                        <CardBody className="text-center space-y-6 py-12">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-bounce" />
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                    Welcome to Recipe Finder!
                                </h1>
                                <p className="text-gray-600">
                                    Your culinary journey starts now.
                                </p>
                            </div>
                            <Button
                                size="lg"
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                onClick={() => router.push('/login')}
                            >
                                Sign In to Your Account
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center space-y-4 animate-fade-in">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <ChefHat className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Join Recipe Finder
                    </h1>
                    <p className="text-gray-600">Start your culinary adventure today</p>
                </div>

                <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl animate-fade-in-up">
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {(serverError || (formStatus === 'error' && Object.keys(errors).length > 0)) && (
                                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-4 flex items-start space-x-3">
                                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-red-800">Error</p>
                                        <ul className="text-sm text-red-700 mt-1 list-disc list-inside">
                                            {serverError ? <li>{serverError}</li> : Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your full name"
                                leftIcon={<User className="h-4 w-4" />}
                                error={errors.name}
                            />

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your email"
                                leftIcon={<Mail className="h-4 w-4" />}
                                error={errors.email}
                            />

                            <div className="relative">
                                <Input
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Create a password"
                                    leftIcon={<Lock className="h-4 w-4" />}
                                    error={errors.password}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('password')}
                                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            <div className="relative">
                                <Input
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Confirm your password"
                                    leftIcon={<Lock className="h-4 w-4" />}
                                    error={errors.confirmPassword}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200"
                                loading={formStatus === 'loading'}
                            >
                                {formStatus === 'loading' ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>
                    </CardBody>
                </Card>

                <div className="text-center animate-fade-in-up">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-orange-600 hover:text-red-600 font-medium transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
