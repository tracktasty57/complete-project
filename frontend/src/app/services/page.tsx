"use client";

import React from 'react';
import Link from 'next/link';
import {
    Code,
    Palette,
    Smartphone,
    Globe,
    Zap,
    Shield,
    ArrowRight,
    Check,
    Star
} from 'lucide-react';
import { Card, CardTitle, CardDescription, CardBody, Button } from '@/components/ui';
import DynamicLayout from '@/components/DynamicLayout';

export default function ServicesPage() {
    const services = [
        {
            id: 'web-development',
            title: 'Web Development',
            description: 'Custom web applications built with modern technologies like React, TypeScript, and Node.js.',
            icon: Code,
            image: '/api/placeholder/400/250',
            features: [
                'Responsive Design',
                'Modern Frameworks',
                'Performance Optimization',
                'SEO Friendly',
                'Cross-browser Compatibility'
            ],
            pricing: 'Starting at $2,500',
            color: 'bg-blue-500'
        },
        {
            id: 'ui-ux-design',
            title: 'UI/UX Design',
            description: 'Beautiful, user-centered designs that enhance user experience and drive conversions.',
            icon: Palette,
            image: '/api/placeholder/400/250',
            features: [
                'User Research',
                'Wireframing & Prototyping',
                'Visual Design',
                'Usability Testing',
                'Design Systems'
            ],
            pricing: 'Starting at $1,800',
            color: 'bg-emerald-500'
        },
        {
            id: 'mobile-development',
            title: 'Mobile Development',
            description: 'Native and cross-platform mobile applications for iOS and Android devices.',
            icon: Smartphone,
            image: '/api/placeholder/400/250',
            features: [
                'Native iOS & Android',
                'React Native',
                'Flutter Development',
                'App Store Optimization',
                'Push Notifications'
            ],
            pricing: 'Starting at $3,500',
            color: 'bg-purple-500'
        },
        {
            id: 'web-hosting',
            title: 'Web Hosting & Deployment',
            description: 'Reliable hosting solutions with automated deployment and continuous integration.',
            icon: Globe,
            image: '/api/placeholder/400/250',
            features: [
                'Cloud Hosting',
                'SSL Certificates',
                'Automated Backups',
                'CDN Integration',
                '99.9% Uptime'
            ],
            pricing: 'Starting at $50/month',
            color: 'bg-orange-500'
        },
        {
            id: 'performance-optimization',
            title: 'Performance Optimization',
            description: 'Speed up your website and improve user experience with advanced optimization techniques.',
            icon: Zap,
            image: '/api/placeholder/400/250',
            features: [
                'Core Web Vitals',
                'Image Optimization',
                'Code Splitting',
                'Caching Strategies',
                'Performance Monitoring'
            ],
            pricing: 'Starting at $800',
            color: 'bg-yellow-500'
        },
        {
            id: 'security-audit',
            title: 'Security Audit',
            description: 'Comprehensive security assessment to protect your applications from vulnerabilities.',
            icon: Shield,
            image: '/api/placeholder/400/250',
            features: [
                'Vulnerability Assessment',
                'Penetration Testing',
                'Security Best Practices',
                'Compliance Review',
                'Security Training'
            ],
            pricing: 'Starting at $1,200',
            color: 'bg-red-500'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            company: 'TechStart Inc.',
            rating: 5,
            comment: 'Exceptional work on our web application. The team delivered beyond our expectations with great attention to detail.'
        },
        {
            name: 'Michael Chen',
            company: 'Digital Solutions',
            rating: 5,
            comment: 'Professional service and excellent communication throughout the project. Highly recommended!'
        },
        {
            name: 'Emily Rodriguez',
            company: 'Creative Agency',
            rating: 5,
            comment: 'The UI/UX design transformed our user experience. Our conversion rates increased by 40%.'
        }
    ];

    return (
        <DynamicLayout>
            <div className="space-y-16">
                <section className="text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                            Our{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                                Services
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            We provide comprehensive digital solutions to help your business grow and succeed in the modern world.
                        </p>
                    </div>
                </section>

                <section className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900">
                            What We Offer
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            From concept to deployment, we handle every aspect of your digital project with expertise and care.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <Card key={service.id} variant="elevated" hoverable className="overflow-hidden">
                                    <div className="relative">
                                        <div className={`h-48 ${service.color} flex items-center justify-center`}>
                                            <Icon className="h-16 w-16 text-white" />
                                        </div>

                                        <CardBody className="space-y-6">
                                            <div className="space-y-3">
                                                <CardTitle className="text-xl">{service.title}</CardTitle>
                                                <CardDescription className="text-base">
                                                    {service.description}
                                                </CardDescription>
                                            </div>

                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-slate-900">Key Features:</h4>
                                                <ul className="space-y-2">
                                                    {service.features.map((feature, index) => (
                                                        <li key={index} className="flex items-center space-x-2 text-sm text-slate-600">
                                                            <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                                                <div>
                                                    <p className="text-lg font-bold text-slate-900">{service.pricing}</p>
                                                </div>
                                                <Button>
                                                    <Link href="/contact" className="flex items-center">
                                                        Get Quote
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                <section className="bg-slate-50 rounded-2xl p-8 lg:p-12 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Our Process
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            We follow a proven methodology to ensure your project is delivered on time and exceeds expectations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Discovery', description: 'We understand your needs and goals' },
                            { step: '02', title: 'Planning', description: 'Create detailed project roadmap' },
                            { step: '03', title: 'Development', description: 'Build with modern technologies' },
                            { step: '04', title: 'Launch', description: 'Deploy and provide ongoing support' }
                        ].map((phase, index) => (
                            <div key={index} className="text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                                    {phase.step}
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900">{phase.title}</h3>
                                <p className="text-slate-600">{phase.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900">
                            What Our Clients Say
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Don't just take our word for it. Here's what our satisfied clients have to say about our services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} variant="elevated">
                                <CardBody className="space-y-4">
                                    <div className="flex items-center space-x-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 italic">"{testimonial.comment}"</p>
                                    <div className="border-t border-slate-200 pt-4">
                                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                                        <p className="text-sm text-slate-600">{testimonial.company}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 lg:p-12 text-center text-white">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">
                            Let's discuss how we can help bring your vision to life with our expert services.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="lg">
                                <Link href="/contact">
                                    Get Free Consultation
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                                <Link href="/about">
                                    Learn About Us
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </DynamicLayout>
    );
}
