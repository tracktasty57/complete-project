import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, Button, Input, Textarea } from '../components/ui';

/**
 * Contact page component with contact form and service description
 */
export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    budget: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
        budget: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'tracktasty57@gmail.com',
      action: 'mailto:tracktasty57@gmail.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team during business hours',
      contact: '+92 300 1234567',
      action: 'tel:+923001234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Located at University of Gujrat campus',
      contact: 'Gujrat, Punjab, Pakistan',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'We\'re available during these hours',
      contact: 'Mon-Fri: 9AM-6PM PKT',
      action: '#'
    }
  ];

  const services = [
    'Recipe Management System',
    'Meal Planning Features',
    'Ingredient Tracking',
    'Shopping List Integration',
    'Nutritional Analysis',
    'Custom Recipe Development',
    'Other'
  ];

  const budgetRanges = [
    'Under PKR 50,000',
    'PKR 50,000 - PKR 150,000',
    'PKR 150,000 - PKR 500,000',
    'PKR 500,000 - PKR 1,000,000',
    'Over PKR 1,000,000'
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Get in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
              Touch
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <Card key={index} variant="elevated" hoverable>
              <CardBody className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                  <CardDescription className="text-sm">{info.description}</CardDescription>
                  <p className="font-medium text-slate-900">{info.contact}</p>
                </div>
                {info.action !== '#' && (
                  <Button variant="outline" size="sm" className="w-full">
                    <a href={info.action}>Contact</a>
                  </Button>
                )}
              </CardBody>
            </Card>
          );
        })}
      </section>

      {/* Main Contact Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            <CardDescription>
              Have questions about Recipe Finder? Need help with features? Fill out the form below and we'll get back to you within 24 hours.
            </CardDescription>
          </CardHeader>
          
          <CardBody>
            {formStatus === 'success' ? (
              <div className="text-center space-y-4 py-8">
                <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-semibold text-slate-900">Message Sent!</h3>
                <p className="text-slate-600">
                  Thank you for your message. We'll get back to you within 24 hours.
                </p>
                <Button onClick={() => setFormStatus('idle')}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                  />
                  <Input
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Feature/Service Interested In
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select a feature/service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Project Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range, index) => (
                        <option key={index} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Textarea
                  label="Message Details"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Tell us about your recipe management needs, feature requests, or any questions you have about our platform..."
                />
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  loading={formStatus === 'loading'}
                  rightIcon={<Send className="h-4 w-4" />}
                >
                  {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </CardBody>
        </Card>

        {/* Service Information */}
        <div className="space-y-8">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-2xl">Why Choose Us?</CardTitle>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Expert Team</h4>
                    <p className="text-slate-600 text-sm">
                      Our experienced developers and designers deliver high-quality solutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Fast Turnaround</h4>
                    <p className="text-slate-600 text-sm">
                      We work efficiently to deliver your project on time and within budget.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Ongoing Support</h4>
                    <p className="text-slate-600 text-sm">
                      We provide continued support and maintenance after project completion.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Transparent Process</h4>
                    <p className="text-slate-600 text-sm">
                      Clear communication and regular updates throughout the project lifecycle.
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card variant="filled">
            <CardBody className="text-center space-y-4">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto" />
              <div>
                <CardTitle>Prefer to Chat?</CardTitle>
                <CardDescription>
                  Schedule a free 30-minute consultation to discuss your project in detail.
                </CardDescription>
              </div>
              <Button variant="outline" className="w-full">
                Schedule a Call
              </Button>
            </CardBody>
          </Card>

          <Card variant="outlined">
            <CardBody className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-lg">Quick Response Guarantee</CardTitle>
              </div>
              <CardDescription>
                We respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call us directly at +92 300 1234567.
              </CardDescription>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Here are some common questions we receive from potential clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "How long does a typical project take?",
              answer: "Project timelines vary based on complexity, but most web development projects take 4-12 weeks from start to finish."
            },
            {
              question: "Do you provide ongoing maintenance?",
              answer: "Yes, we offer maintenance packages to keep your website updated, secure, and performing optimally."
            },
            {
              question: "What technologies do you work with?",
              answer: "We specialize in React, TypeScript, Node.js, and modern web technologies, but we're adaptable to your needs."
            },
            {
              question: "Can you work with our existing team?",
              answer: "Absolutely! We're experienced in collaborating with in-house teams and can integrate seamlessly into your workflow."
            }
          ].map((faq, index) => (
            <Card key={index} variant="elevated">
              <CardBody className="space-y-3">
                <CardTitle className="text-lg">{faq.question}</CardTitle>
                <CardDescription>{faq.answer}</CardDescription>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;