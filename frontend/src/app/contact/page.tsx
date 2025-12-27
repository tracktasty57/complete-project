"use client";

import React from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    MessageCircle,
    ChefHat
} from 'lucide-react';
import { Card, CardTitle, CardDescription, CardBody, Button } from '@/components/ui';
import DynamicLayout from '@/components/DynamicLayout';

export default function ContactPage() {
    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            description: 'Send us an email for any questions or support',
            contact: 'tracktasty57@gmail.com',
            action: 'mailto:tracktasty57@gmail.com',
            buttonText: 'Send Email'
        },
        {
            icon: Phone,
            title: 'Call Us',
            description: 'Speak directly with us during business hours',
            contact: '+92 300 1234567',
            action: 'tel:+923001234567',
            buttonText: 'Call Now'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            description: 'Located at University of Gujrat campus',
            contact: 'Gujrat, Punjab, Pakistan',
            action: null,
            buttonText: null
        },
        {
            icon: Clock,
            title: 'Support Hours',
            description: 'We\'re available during these hours',
            contact: 'Mon-Fri: 9AM-6PM PKT',
            subContact: 'Saturday: 10AM-4PM PKT',
            action: null,
            buttonText: null
        }
    ];

    return (
        <DynamicLayout>
            <div className="space-y-16">
                <section className="text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                            Get in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                                Touch
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Have questions about Recipe Finder? Need help with a feature? We're here to help!
                            Reach out to us through any of the channels below.
                        </p>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((info, index) => {
                        const Icon = info.icon;
                        return (
                            <Card key={index} variant="elevated" hoverable>
                                <CardBody className="text-center space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <CardTitle className="text-xl">{info.title}</CardTitle>
                                        <CardDescription className="text-sm">{info.description}</CardDescription>
                                        <p className="font-semibold text-slate-900 text-base">{info.contact}</p>
                                        {info.subContact && (
                                            <p className="font-medium text-slate-700 text-sm">{info.subContact}</p>
                                        )}
                                    </div>
                                    {info.action && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600"
                                        >
                                            <a href={info.action}>{info.buttonText}</a>
                                        </Button>
                                    )}
                                </CardBody>
                            </Card>
                        );
                    })}
                </section>

                <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 lg:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900">About Recipe Finder</h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    Recipe Finder is a comprehensive meal planning and recipe management platform
                                    developed as a university project at the University of Gujrat, Pakistan.
                                </p>
                                <p>
                                    Our platform helps you discover amazing recipes, plan your weekly meals,
                                    manage shopping lists, and organize your culinary journey all in one place.
                                </p>
                                <p>
                                    Built with modern web technologies including React, TypeScript, Node.js,
                                    and MongoDB, Recipe Finder combines functionality with an intuitive user experience.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl h-80 flex items-center justify-center">
                            <div className="text-center text-orange-700 space-y-4">
                                <ChefHat className="h-20 w-20 mx-auto" />
                                <p className="font-bold text-2xl">Recipe Finder</p>
                                <p className="text-lg">Your Culinary Companion</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card variant="elevated">
                        <CardBody className="text-center space-y-4 p-8">
                            <MessageCircle className="h-16 w-16 text-orange-600 mx-auto" />
                            <div>
                                <CardTitle className="text-2xl mb-2">Need Help?</CardTitle>
                                <CardDescription className="text-base">
                                    For questions about features, bug reports, or general inquiries,
                                    feel free to reach out via email or phone.
                                </CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600"
                            >
                                <a href="mailto:tracktasty57@gmail.com">Email Support</a>
                            </Button>
                        </CardBody>
                    </Card>

                    <Card variant="elevated">
                        <CardBody className="text-center space-y-4 p-8">
                            <Clock className="h-16 w-16 text-orange-600 mx-auto" />
                            <div>
                                <CardTitle className="text-2xl mb-2">Response Time</CardTitle>
                                <CardDescription className="text-base">
                                    We typically respond to all inquiries within 24-48 hours during business days.
                                    For urgent matters, please call us directly.
                                </CardDescription>
                            </div>
                            <div className="text-sm text-slate-600 space-y-1">
                                <p className="font-medium">Monday - Friday: 9:00 AM - 6:00 PM PKT</p>
                                <p className="font-medium">Saturday: 10:00 AM - 4:00 PM PKT</p>
                            </div>
                        </CardBody>
                    </Card>
                </section>
            </div>
        </DynamicLayout>
    );
}
