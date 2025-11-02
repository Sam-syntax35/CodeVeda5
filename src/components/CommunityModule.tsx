"use client";

import React, { useState } from "react";
import { Search, Star, Clock, Users, TrendingUp, BookOpen, Shield, Zap, Award } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import exampleImage from 'figma:asset/4bdcdae820da3b13b4d66d46e36fb1cd11b2ce81.png';

// Category types
type CategoryType = "all" | "alerts" | "cases" | "protocols" | "events" | "research" | "training";

interface CommunityResource {
  id: string;
  category: CategoryType;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  duration: string;
  participants?: number;
  badge?: string;
  isNew?: boolean;
}

// Mock data for community resources
const communityResources: CommunityResource[] = [
  {
    id: "1",
    category: "protocols",
    title: "MDR Infection Control Protocol",
    description: "Comprehensive guidelines for managing multi-drug resistant infections including isolation procedures and PPE requirements",
    image: "https://images.unsplash.com/photo-1739185069005-8cb46fef2702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.8,
    reviews: 342,
    duration: "15 mins",
    badge: "Updated"
  },
  {
    id: "2",
    category: "cases",
    title: "Complex MDR Case Discussion",
    description: "Interactive case study on treating ventilator-associated pneumonia with carbapenem resistance",
    image: "https://images.unsplash.com/photo-1758574437870-f83c160efd82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.6,
    reviews: 568,
    duration: "45 mins",
    participants: 23,
    isNew: true
  },
  {
    id: "3",
    category: "alerts",
    title: "Critical Alert Response Training",
    description: "Emergency protocols and response procedures for outbreak situations in hospital settings",
    image: "https://images.unsplash.com/photo-1625258111307-3e929842d9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.7,
    reviews: 234,
    duration: "30 mins",
    badge: "Critical"
  },
  {
    id: "4",
    category: "training",
    title: "Infection Control Workshop",
    description: "Hands-on training for healthcare professionals covering latest infection prevention techniques",
    image: "https://images.unsplash.com/photo-1616992510024-f1293eb00e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.9,
    reviews: 891,
    duration: "2 hours",
    participants: 156,
    badge: "Popular"
  },
  {
    id: "5",
    category: "research",
    title: "Antibiotic Resistance Research",
    description: "Latest findings on antimicrobial resistance patterns and emerging treatment strategies",
    image: "https://images.unsplash.com/photo-1631557677599-ee5fe0b3440b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.5,
    reviews: 423,
    duration: "60 mins",
    isNew: true
  },
  {
    id: "6",
    category: "protocols",
    title: "Surgical Site Infection Prevention",
    description: "Evidence-based protocols for preventing post-operative infections and wound care management",
    image: "https://images.unsplash.com/photo-1759693834549-ff197ef70bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.7,
    reviews: 512,
    duration: "25 mins",
    badge: "Essential"
  }
];

const categories = [
  { id: "all" as CategoryType, label: "All Resources", icon: BookOpen },
  { id: "alerts" as CategoryType, label: "Critical Alerts", icon: Shield },
  { id: "cases" as CategoryType, label: "Case Studies", icon: Users },
  { id: "protocols" as CategoryType, label: "Protocols", icon: BookOpen },
  { id: "events" as CategoryType, label: "Events", icon: TrendingUp },
  { id: "research" as CategoryType, label: "Research", icon: Award },
  { id: "training" as CategoryType, label: "Training", icon: Zap }
];

export function CommunityModule() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = communityResources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-gray-900 dark:text-white mb-2">Community Resources</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Access curated medical resources, case studies, and protocols for infection control
        </p>
      </div>

      {/* Recommendation Banner */}
      <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-teal-200 dark:border-teal-900">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex-shrink-0">
            <Award className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 dark:text-white mb-2">Recommended for You</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Based on your recent activity (ICU rounds, MDR cases), we suggest:
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-teal-600 dark:bg-teal-700 text-white border-0">
                MDR Treatment Guidelines
              </Badge>
              <Badge className="bg-cyan-600 dark:bg-cyan-700 text-white border-0">
                ICU Infection Prevention
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search resources, cases, protocols..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-600"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-teal-600 dark:bg-teal-700 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card 
            key={resource.id} 
            className="group overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
              <ImageWithFallback
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {resource.isNew && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500 text-white border-0">
                    New
                  </Badge>
                </div>
              )}
              {resource.badge && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-0">
                    {resource.badge}
                  </Badge>
                </div>
              )}
              <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center gap-1">
                <Clock className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                <span className="text-xs text-gray-900 dark:text-white">{resource.duration}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h4 className="text-gray-900 dark:text-white mb-1 line-clamp-1">
                  {resource.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {resource.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-900 dark:text-white">{resource.rating}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({resource.reviews} reviews)
                  </span>
                </div>
                {resource.participants && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Users className="h-3 w-3" />
                    {resource.participants}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">
            No resources found. Try adjusting your filters or search query.
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-900">
        <h4 className="text-gray-900 dark:text-white mb-4">Community Engagement</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl text-blue-600 dark:text-blue-400 mb-1">127</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Discussions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-purple-600 dark:text-purple-400 mb-1">43</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Protocols Shared</p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-teal-600 dark:text-teal-400 mb-1">892</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Members</p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-pink-600 dark:text-pink-400 mb-1">15</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming Events</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
