'use client';

import { useState } from 'react';
import { 
  FileText, 
  Navigation, 
  Pill, 
  Utensils, 
  CalendarDays, 
  Users,
  Shield,
  Bell,
  User,
  Moon,
  Sun,
  LogOut,
  ArrowRight,
  Activity,
  Heart,
  TrendingUp
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { MagicCard, GlobalCardSpotlight } from './MagicCard';

interface PatientDashboardOverviewProps {
  onLogout: () => void;
  onCardClick: (section: string) => void;
}

export function PatientDashboardOverview({ onLogout, onCardClick }: PatientDashboardOverviewProps) {
  const { theme, toggleTheme } = useTheme();

  const featureCards = [
    {
      id: 'medical-history',
      title: 'Medical Report',
      description: 'View your complete medical history and current diagnosis',
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-900',
      stats: { label: 'Last Updated', value: '2 days ago' },
      glowColor: '59, 130, 246' // blue-500
    },
    {
      id: 'tracking',
      title: 'Tracking',
      description: 'Monitor your location and infection exposure zones',
      icon: Navigation,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-900',
      stats: { label: 'Zones Visited', value: '4 areas' },
      glowColor: '168, 85, 247' // purple-500
    },
    {
      id: 'medicines',
      title: 'Medicines',
      description: 'Access your medication schedule and prescriptions',
      icon: Pill,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30',
      borderColor: 'border-green-200 dark:border-green-900',
      stats: { label: 'Active Meds', value: '5 items' },
      glowColor: '34, 197, 94' // green-500
    },
    {
      id: 'diet',
      title: 'Diet Planner',
      description: 'Personalized meal plans and nutritional guidance',
      icon: Utensils,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30',
      borderColor: 'border-orange-200 dark:border-orange-900',
      stats: { label: 'Today\'s Meals', value: '3 planned' },
      glowColor: '249, 115, 22' // orange-500
    },
    {
      id: 'schedules',
      title: 'Plans & Schedules',
      description: 'View your treatment plans and daily schedules',
      icon: CalendarDays,
      gradient: 'from-pink-500 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100 dark:from-pink-950/30 dark:to-pink-900/30',
      borderColor: 'border-pink-200 dark:border-pink-900',
      stats: { label: 'Upcoming', value: '3 events' },
      glowColor: '236, 72, 153' // pink-500
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with healthcare community and support',
      icon: Users,
      gradient: 'from-indigo-500 to-indigo-600',
      bgGradient: 'from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/30',
      borderColor: 'border-indigo-200 dark:border-indigo-900',
      stats: { label: 'New Posts', value: '12 today' },
      glowColor: '99, 102, 241' // indigo-500
    }
  ];

  const quickStats = [
    { 
      label: 'Health Score', 
      value: '85%', 
      icon: Heart, 
      color: 'text-red-600 dark:text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      glowColor: '220, 38, 38' // red-600
    },
    { 
      label: 'Recovery Rate', 
      value: '+12%', 
      icon: TrendingUp, 
      color: 'text-green-600 dark:text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      glowColor: '22, 163, 74' // green-600
    },
    { 
      label: 'Activity', 
      value: 'Good', 
      icon: Activity, 
      color: 'text-blue-600 dark:text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      glowColor: '37, 99, 235' // blue-600
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Global Magic Bento Spotlight */}
      <GlobalCardSpotlight enabled={true} spotlightRadius={300} glowColor="132, 0, 255" />
      
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              title="Back to home"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900 dark:text-white">codeveda</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Patient Portal</p>
              </div>
            </button>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="inline-flex items-center justify-center w-10 h-10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                aria-label="Toggle theme"
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              {/* Notifications */}
              <button className="relative inline-flex items-center justify-center w-10 h-10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-3 ml-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 text-white">
                  <User className="w-5 h-5" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-gray-900 dark:text-white">Patient Portal</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: PT-5624</p>
                </div>
              </div>

              {/* Logout */}
              <button 
                onClick={onLogout}
                className="inline-flex items-center justify-center w-10 h-10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl text-gray-900 dark:text-white mb-2">
            Welcome to Your Health Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Access your medical information, track your recovery, and manage your health journey
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <MagicCard 
                key={index}
                glowColor={stat.glowColor}
                enableParticles={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                particleCount={6}
              >
                <div className={`${stat.bgColor} border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-full`}>
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                    <span className={`text-2xl ${stat.color}`}>{stat.value}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{stat.label}</p>
                </div>
              </MagicCard>
            );
          })}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <MagicCard
                key={card.id}
                glowColor={card.glowColor}
                enableParticles={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                particleCount={8}
              >
                <button
                  onClick={() => onCardClick(card.id)}
                  className={`group relative bg-gradient-to-br ${card.bgGradient} border ${card.borderColor} rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 w-full h-full`}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 min-h-[48px]">
                    {card.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-300 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{card.stats.label}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{card.stats.value}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
                </button>
              </MagicCard>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl mb-2">Need Assistance?</h3>
              <p className="text-indigo-100 dark:text-indigo-200 mb-4">
                Our medical team is available 24/7 to help you with any questions or concerns
              </p>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
                Contact Support
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
