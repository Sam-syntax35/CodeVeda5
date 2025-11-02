"use client";

import { useState } from 'react';
import { Moon, Sun, ArrowRight, Shield, Activity, Users, CheckCircle2, User, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTheme } from './ThemeProvider';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logoImage from 'figma:asset/4d744d9dc222fec480d1bb61c0c3c5755b6f748e.png';

type Props = {
  onGetStarted: () => void;
};

export function LandingPage({ onGetStarted }: Props) {
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-indigo-200 dark:border-indigo-700">
                <img src={logoImage} alt="Codeveda Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl text-indigo-600 dark:text-indigo-400">CODEVEDA</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  activeSection === 'home' ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  activeSection === 'about' ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  activeSection === 'services' ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  activeSection === 'projects' ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  activeSection === 'contact' ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
              >
                Contact
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 animate-gradient-shift"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-transparent to-violet-100 dark:from-blue-950 dark:via-transparent dark:to-violet-950 opacity-60 animate-gradient-shift-reverse"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Hero Heading */}
              <h1 className="text-5xl lg:text-7xl text-gray-900 dark:text-white mb-6 leading-tight">
                Stop MDR Infections{' '}
                <span className="text-indigo-600 dark:text-indigo-400">Before They Spread</span>
              </h1>
              
              {/* Hero Subtitle */}
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
                AI-powered real-time tracking system that detects, traces, and stops multi-drug resistant infections in hospitals — saving lives through prevention.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 text-lg shadow-lg shadow-indigo-500/30"
                >
                  Book a Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={onGetStarted}
                  variant="outline"
                  className="border-indigo-300 dark:border-indigo-700 h-14 px-8 text-lg hover:bg-indigo-50 dark:hover:bg-indigo-950"
                >
                  View Platform
                </Button>
              </div>

              {/* 3 Bullet Value Points */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-900 dark:text-white">Track every contact, every movement, in real-time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-900 dark:text-white">Visual heat maps showing infection risk across your facility</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-900 dark:text-white">Automated alerts and compliance reporting for regulatory standards</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image Cards */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main Image Card */}
                <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30">
                    <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 mb-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">OCR Ready</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Scan medical documents</p>
                  </div>
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RldGhvc2NvcGUlMjBwaWxsc3xlbnwxfHx8fDE3NjE5MzkxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Medical equipment"
                    className="w-full h-64 object-cover"
                  />
                </Card>

                {/* Floating Card */}
                <Card className="absolute -bottom-8 -right-8 w-56 bg-gradient-to-br from-indigo-600 to-purple-600 border-0 shadow-2xl">
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-white text-sm">AI Powered</div>
                    </div>
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                      alt="Healthcare technology"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-gray-900 dark:text-white mb-4">About Codeveda</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Born from a mission to end preventable hospital infections through technology and data
            </p>
          </div>

          {/* The Problem */}
          <div className="mb-16">
            <Card className="p-8 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
              <h3 className="text-2xl text-gray-900 dark:text-white mb-4">The Silent Threat</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Multi-Drug Resistant (MDR) infections spread silently through hospitals every day. Without real-time tracking, 
                healthcare workers can unknowingly transmit dangerous pathogens from patient to patient. Traditional manual 
                contact tracing is slow, incomplete, and often too late.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Result:</strong> Thousands of preventable deaths, extended hospital stays, and millions in additional healthcare costs annually.
              </p>
            </Card>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900">
              <h3 className="text-2xl text-indigo-900 dark:text-indigo-100 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                To eliminate avoidable hospital-acquired infections through intelligent, real-time tracking and prevention systems 
                that empower healthcare professionals with actionable data.
              </p>
            </Card>
            <Card className="p-8 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900">
              <h3 className="text-2xl text-purple-900 dark:text-purple-100 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                A world where every patient walks out of a hospital healthier than they walked in — where infection control 
                is precise, automated, and saves lives every single day.
              </p>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h3 className="text-3xl text-gray-900 dark:text-white text-center mb-10">Our Core Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-900 text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="text-xl text-gray-900 dark:text-white mb-3">Safety First</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Patient and staff safety is non-negotiable. Every feature is designed with protection as the priority.
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-teal-200 dark:border-teal-900 text-center">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Activity className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h4 className="text-xl text-gray-900 dark:text-white mb-3">Prevention</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Stop infections before they spread. Proactive detection beats reactive response every time.
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200 dark:border-orange-900 text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h4 className="text-xl text-gray-900 dark:text-white mb-3">Speed</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time alerts and instant contact tracing. When seconds matter, our system delivers.
                </p>
              </Card>
            </div>
          </div>

          {/* Impact Statement */}
          <Card className="p-12 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 text-center border-0">
            <h3 className="text-3xl text-white mb-4">Our Impact Goal</h3>
            <p className="text-2xl text-indigo-100 max-w-3xl mx-auto">
              <strong>ZERO avoidable hospital-acquired infections.</strong> This isn't just a goal — it's our commitment to every patient, 
              every healthcare worker, and every family who trusts the healthcare system.
            </p>
          </Card>

          {/* Founding Team */}
          <div className="mt-16">
            <h3 className="text-3xl text-gray-900 dark:text-white text-center mb-10">Meet Our Team</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl text-gray-900 dark:text-white mb-1">Dr. Sarah Chen</h4>
                <p className="text-indigo-600 dark:text-indigo-400 mb-3">CEO & Co-Founder</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Former ICU physician with 15 years fighting hospital infections. PhD in Epidemiology.
                </p>
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl text-gray-900 dark:text-white mb-1">Rajesh Kumar</h4>
                <p className="text-teal-600 dark:text-teal-400 mb-3">CTO & Co-Founder</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI/ML expert from MIT. Built real-time tracking systems for Fortune 500 healthcare companies.
                </p>
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl text-gray-900 dark:text-white mb-1">Dr. Michael Torres</h4>
                <p className="text-purple-600 dark:text-purple-400 mb-3">Chief Medical Officer</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Infectious disease specialist. Published 50+ papers on antimicrobial resistance prevention.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-gray-900 dark:text-white mb-4">What We Provide</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A complete infection control ecosystem — from detection to prevention to compliance
            </p>
          </div>

          <div className="space-y-6">
            {/* Service 1: Real-Time Infection Tracking */}
            <Card className="p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-900 dark:text-white mb-3">Real-Time Infection Tracking</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Track every movement, contact, and potential exposure in your facility with precision.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-900">
                      <h4 className="text-sm text-indigo-900 dark:text-indigo-200 mb-1">BLE Tracking</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Bluetooth Low Energy sensors track staff and patient movements</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-900">
                      <h4 className="text-sm text-indigo-900 dark:text-indigo-200 mb-1">Contact Detection</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Direct & indirect contact identification with duration logs</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-900">
                      <h4 className="text-sm text-indigo-900 dark:text-indigo-200 mb-1">Instant Alerts</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">SMS, email, and in-app notifications on exposure events</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Service 2: Heat Map of Hospital */}
            <Card className="p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-900 dark:text-white mb-3">Heat Map of Hospital</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Visual representation of infection risk zones across your entire facility in real-time.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900">
                      <h4 className="text-sm text-red-900 dark:text-red-200 mb-1">Live Risk Zones</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Color-coded areas showing low, medium, high, critical risk levels</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900">
                      <h4 className="text-sm text-red-900 dark:text-red-200 mb-1">Auto-Update</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Map updates as patients and staff move through the hospital</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900">
                      <h4 className="text-sm text-red-900 dark:text-red-200 mb-1">Zone Alerts</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Notifications when high-risk zones develop or expand</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Service 3: Patient Data Integration */}
            <Card className="p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-900 dark:text-white mb-3">Patient Data Integration</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Complete patient profiles with infection risk analysis and historical tracking.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-lg border border-teal-200 dark:border-teal-900">
                      <h4 className="text-sm text-teal-900 dark:text-teal-200 mb-1">Medical History</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Full records, medications, allergies, previous infections</p>
                    </div>
                    <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-lg border border-teal-200 dark:border-teal-900">
                      <h4 className="text-sm text-teal-900 dark:text-teal-200 mb-1">Risk Scoring</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">AI-calculated infection susceptibility scores</p>
                    </div>
                    <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-lg border border-teal-200 dark:border-teal-900">
                      <h4 className="text-sm text-teal-900 dark:text-teal-200 mb-1">Contact History</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Complete timeline of patient-staff interactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Service 4: Compliance Reporting */}
            <Card className="p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-900 dark:text-white mb-3">Compliance Reporting</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Automated regulatory reports that meet national and international healthcare standards.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-900">
                      <h4 className="text-sm text-purple-900 dark:text-purple-200 mb-1">Regulatory Reports</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">CDC, CMS, state health dept. formatted exports</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-900">
                      <h4 className="text-sm text-purple-900 dark:text-purple-200 mb-1">WHO Guidelines</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">International infection control standard adherence</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-900">
                      <h4 className="text-sm text-purple-900 dark:text-purple-200 mb-1">Audit Trails</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Complete action logs for accreditation reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Service 5: Lab Integration */}
            <Card className="p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-900 dark:text-white mb-3">Lab Integration</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Direct connection with laboratory systems for instant test result integration.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-900">
                      <h4 className="text-sm text-orange-900 dark:text-orange-200 mb-1">PCR Results</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Automated import of PCR test results and pathogen identification</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-900">
                      <h4 className="text-sm text-orange-900 dark:text-orange-200 mb-1">Culture Reports</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Bacterial culture test integration with resistance profiles</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-900">
                      <h4 className="text-sm text-orange-900 dark:text-orange-200 mb-1">Auto-Flagging</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Instant alerts on positive MDR test results</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Service 6: Doctor Dashboard */}
            <Card className="p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-900 dark:text-white mb-3">Doctor Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Complete physician workspace with patient management and treatment planning tools.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
                      <h4 className="text-sm text-blue-900 dark:text-blue-200 mb-1">Schedule Management</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Patient appointments, rounds, and procedure planning</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
                      <h4 className="text-sm text-blue-900 dark:text-blue-200 mb-1">Treatment Plans</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Create and monitor infection treatment protocols</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
                      <h4 className="text-sm text-blue-900 dark:text-blue-200 mb-1">Contact Tracking</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">See which patients you've been in contact with</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Service 7: Patient Portal */}
            <Card className="p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-gray-900 dark:text-white mb-3">Patient Portal</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Empower patients with access to their health information and treatment progress.
                  </p>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                      <h4 className="text-sm text-green-900 dark:text-green-200 mb-1">Medicines</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Current, daily, emergency, and discontinued medications</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                      <h4 className="text-sm text-green-900 dark:text-green-200 mb-1">Diet Planner</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Personalized nutrition plans for recovery</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                      <h4 className="text-sm text-green-900 dark:text-green-200 mb-1">Schedules</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Treatment schedules, appointments, medication times</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                      <h4 className="text-sm text-green-900 dark:text-green-200 mb-1">Reports</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Test results, vitals tracking, progress reports</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects / Case Studies Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-gray-900 dark:text-white mb-4">Proven Results</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real-world evidence from pilot hospitals and simulation studies
            </p>
          </div>

          {/* Main Case Study - Pilot Hospital */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-900">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-green-600 text-white rounded-full mb-4">
                  ✓ Pilot Study Complete
                </div>
                <h3 className="text-3xl text-gray-900 dark:text-white mb-4">St. Mary's Medical Center — ICU Ward Study</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  6-month pilot program in a 25-bed ICU unit with high MDR infection rates.
                </p>
                
                {/* Before vs After */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-red-100 dark:bg-red-950/30 rounded-lg border border-red-300 dark:border-red-900">
                    <p className="text-sm text-red-900 dark:text-red-200 mb-1">Before Codeveda</p>
                    <p className="text-3xl text-red-700 dark:text-red-300">12%</p>
                    <p className="text-xs text-red-800 dark:text-red-400">Infection rate</p>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-950/30 rounded-lg border border-green-300 dark:border-green-900">
                    <p className="text-sm text-green-900 dark:text-green-200 mb-1">After Codeveda</p>
                    <p className="text-3xl text-green-700 dark:text-green-300">4.2%</p>
                    <p className="text-xs text-green-800 dark:text-green-400">Infection rate</p>
                  </div>
                </div>

                <div className="p-5 bg-green-600 text-white rounded-lg mb-4">
                  <p className="text-2xl mb-1">65% Reduction</p>
                  <p className="text-green-100">in hospital-acquired MDR infections</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <p className="text-gray-700 dark:text-gray-300">Average patient stay reduced by 2.3 days</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <p className="text-gray-700 dark:text-gray-300">Contact tracing time cut from 8 hours to 12 minutes</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <p className="text-gray-700 dark:text-gray-300">Saved $480,000 in treatment costs over 6 months</p>
                  </div>
                </div>
              </div>

              <div>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                  alt="Hospital ICU ward"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 italic">
                    "Codeveda transformed how we handle infection control. The heat map alone has prevented at least 15 cross-contamination events that we would have missed with manual tracking."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">Dr. Jennifer Martinez</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Chief of Infectious Diseases, St. Mary's</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          {/* Simulation Study */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-900">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full mb-4">
                  Simulation Study
                </div>
                <h3 className="text-2xl text-gray-900 dark:text-white mb-4">200-Bed General Hospital — Full Facility Simulation</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Computer simulation modeling MDR spread across all hospital departments over 3 months.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-2xl text-gray-900 dark:text-white mb-1">35%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Infection reduction</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-2xl text-gray-900 dark:text-white mb-1">89%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Outbreak prevention</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">• Simulated 50,000+ patient-staff interactions</p>
                  <p className="text-gray-700 dark:text-gray-300">• Modeled 12 different MDR bacteria types</p>
                  <p className="text-gray-700 dark:text-gray-300">• Prevented 23 simulated outbreaks through early detection</p>
                </div>
              </div>

              <div>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                  alt="Healthcare simulation"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </Card>

          {/* Additional Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
                "The real-time alerts saved a patient's life. We detected MRSA exposure within minutes instead of days."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <User className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Dr. Robert Chang</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">ICU Director</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
                "Implementation was seamless. Staff adoption took less than a week. The dashboard is incredibly intuitive."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Linda Park, RN</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Infection Control Nurse</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
                "ROI was clear in month 2. We're saving more in prevented infections than the platform costs."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <User className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Mark Thompson</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Hospital CFO</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ready to protect your patients and staff? Let's start the conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl text-gray-900 dark:text-white mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name" className="text-gray-700 dark:text-gray-300 mb-2 block">
                      Your Name *
                    </Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="Dr. John Smith"
                      className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-hospital" className="text-gray-700 dark:text-gray-300 mb-2 block">
                      Hospital Name *
                    </Label>
                    <Input
                      id="contact-hospital"
                      type="text"
                      placeholder="Memorial Hospital"
                      className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-email" className="text-gray-700 dark:text-gray-300 mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@hospital.com"
                      className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone" className="text-gray-700 dark:text-gray-300 mb-2 block">
                      Phone Number *
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-role" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    Your Role
                  </Label>
                  <select
                    id="contact-role"
                    className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option>Physician</option>
                    <option>Hospital Administrator</option>
                    <option>Infection Control Specialist</option>
                    <option>IT Director</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="contact-beds" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    Number of Beds in Facility
                  </Label>
                  <select
                    id="contact-beds"
                    className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option>Under 50</option>
                    <option>50-100</option>
                    <option>100-250</option>
                    <option>250-500</option>
                    <option>500+</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="contact-message" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    Message
                  </Label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us about your infection control challenges..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white resize-none"
                  ></textarea>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacy-agree"
                    className="w-4 h-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    required
                  />
                  <Label htmlFor="privacy-agree" className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the privacy policy. My data will be kept confidential and used only for responding to this inquiry.
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl text-gray-900 dark:text-white mb-6">Get in Touch</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Our team is ready to answer your questions and schedule a personalized demo of the Codeveda platform.
                </p>

                <div className="space-y-6">
                  <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-lg text-gray-900 dark:text-white mb-1">Email</h4>
                        <p className="text-gray-600 dark:text-gray-400">contact@codeveda.com</p>
                        <p className="text-gray-600 dark:text-gray-400">support@codeveda.com</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <h4 className="text-lg text-gray-900 dark:text-white mb-1">Phone</h4>
                        <p className="text-gray-600 dark:text-gray-400">Sales: +1 (555) 123-4567</p>
                        <p className="text-gray-600 dark:text-gray-400">Support: +1 (555) 765-4321</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg text-gray-900 dark:text-white mb-1">Office</h4>
                        <p className="text-gray-600 dark:text-gray-400">123 Healthcare Innovation Drive</p>
                        <p className="text-gray-600 dark:text-gray-400">San Francisco, CA 94103</p>
                        <p className="text-gray-600 dark:text-gray-400">United States</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h4 className="text-lg text-gray-900 dark:text-white mb-1">Social Media</h4>
                        <div className="flex gap-3 mt-2">
                          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                            LinkedIn
                          </a>
                          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                            Twitter
                          </a>
                          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                            Facebook
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-indigo-600 to-purple-600 border-0">
                <h4 className="text-xl text-white mb-3">Schedule a Live Demo</h4>
                <p className="text-indigo-100 mb-4">
                  See the platform in action. Our experts will walk you through real-world scenarios and answer all your questions.
                </p>
                <Button
                  onClick={onGetStarted}
                  className="w-full h-12 bg-white text-indigo-600 hover:bg-gray-100"
                >
                  Book Demo Now
                </Button>
              </Card>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                <p className="text-sm text-yellow-900 dark:text-yellow-200">
                  <strong>Privacy Statement:</strong> Your information is secure with us. We use HIPAA-compliant systems and will never share your data with third parties. Contact information is used solely for responding to your inquiry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog / Insights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-gray-900 dark:text-white mb-4">Insights & Resources</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Stay informed about MDR infections, prevention strategies, and healthcare technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                <Shield className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 text-xs rounded-full">
                    MDR News
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Nov 1, 2025</span>
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-3">
                  CDC Reports 35% Rise in Carbapenem-Resistant Infections
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  New data shows alarming increase in antibiotic-resistant bacteria in U.S. hospitals. Learn what this means for infection control.
                </p>
                <Button variant="outline" className="w-full">Read More</Button>
              </div>
            </Card>

            {/* Blog Post 2 */}
            <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Activity className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 text-xs rounded-full">
                    Education
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Oct 28, 2025</span>
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-3">
                  Understanding Antimicrobial Resistance: A Guide for Healthcare Workers
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive overview of how bacteria develop resistance and what you can do to prevent it in your facility.
                </p>
                <Button variant="outline" className="w-full">Read More</Button>
              </div>
            </Card>

            {/* Blog Post 3 */}
            <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 text-xs rounded-full">
                    Prevention
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Oct 25, 2025</span>
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-3">
                  5 Proven Strategies to Reduce Hospital-Acquired Infections
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Evidence-based approaches that have shown measurable results in reducing infection rates in healthcare settings.
                </p>
                <Button variant="outline" className="w-full">Read More</Button>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="px-8 h-12 border-gray-300 dark:border-gray-700"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-gray-700">
                  <img src={logoImage} alt="Codeveda Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-lg text-white">CODEVEDA</span>
              </div>
              <p className="text-sm text-gray-400">
                AI-powered MDR infection control for safer hospitals.
              </p>
            </div>

            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-white">Features</a></li>
                <li><a href="#projects" className="hover:text-white">Case Studies</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">© 2025 Codeveda. All rights reserved. MDR Infection Control System.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
