"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  Users, FileText, Activity, ClipboardList, Calendar, 
  MessageSquare, ArrowRight, ChevronRight, Sparkles
} from "lucide-react";
import { MagicCard, GlobalCardSpotlight } from "./MagicCard";

interface DashboardOverviewProps {
  doctorName?: string;
  onModuleSelect: (module: string) => void;
}

const moduleCards = [
  {
    id: "patients",
    title: "Patients",
    description: "View and manage patient records, infection status, and medical history",
    icon: Users,
    gradient: "from-purple-600 via-purple-500 to-purple-400",
    glowColor: "shadow-purple-500/20",
    accentColor: "bg-purple-500",
    stats: { label: "Active Patients", value: "142" }
  },
  {
    id: "tracking",
    title: "Tracking",
    description: "Monitor infection spread, contact tracing, and real-time surveillance",
    icon: Activity,
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    glowColor: "shadow-blue-500/20",
    accentColor: "bg-blue-500",
    stats: { label: "Active Cases", value: "12" }
  },
  {
    id: "reports",
    title: "Reports",
    description: "Access comprehensive analytics, compliance reports, and documentation",
    icon: FileText,
    gradient: "from-indigo-600 via-indigo-500 to-purple-400",
    glowColor: "shadow-indigo-500/20",
    accentColor: "bg-indigo-500",
    stats: { label: "Reports", value: "28" }
  },
  {
    id: "plans",
    title: "Plans",
    description: "Create and manage treatment protocols, infection control strategies",
    icon: ClipboardList,
    gradient: "from-emerald-600 via-emerald-500 to-teal-400",
    glowColor: "shadow-emerald-500/20",
    accentColor: "bg-emerald-500",
    stats: { label: "Active Plans", value: "8" }
  },
  {
    id: "schedule",
    title: "Schedules",
    description: "Manage your daily appointments, rounds, and clinical activities",
    icon: Calendar,
    gradient: "from-orange-600 via-orange-500 to-amber-400",
    glowColor: "shadow-orange-500/20",
    accentColor: "bg-orange-500",
    stats: { label: "Today's Events", value: "8" }
  },
  {
    id: "community",
    title: "Community",
    description: "Collaborate with colleagues, access protocols and case discussions",
    icon: MessageSquare,
    gradient: "from-pink-600 via-pink-500 to-rose-400",
    glowColor: "shadow-pink-500/20",
    accentColor: "bg-pink-500",
    stats: { label: "New Updates", value: "15" }
  }
];

export function DashboardOverview({ doctorName = "Sarah Mitchell", onModuleSelect }: DashboardOverviewProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20 -m-6 p-6 min-h-full">
      <GlobalCardSpotlight enabled={true} spotlightRadius={300} glowColor="132, 0, 255" />
      <div className="max-w-7xl mx-auto px-0 py-6 md:px-2 md:py-10 lg:px-6">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-purple-700 dark:text-purple-300">
              MDR Infection Control System
            </span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-4"
          >
            Welcome, Dr. <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{doctorName}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Your professional cockpit for infection control, patient management, and clinical excellence
          </motion.p>
        </motion.div>

        {/* Main Portals Grid */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-gray-900 dark:text-white mb-2">
              Your Portals
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Access all your essential tools in one place
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moduleCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="group"
                >
                  <MagicCard
                    enableParticles={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    glowColor="132, 0, 255"
                    particleCount={8}
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onClick={() => onModuleSelect(card.id)}
                      className={`relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 ${card.glowColor} hover:shadow-xl`}
                    >
                    {/* Gradient Background Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5`} />
                    </div>

                    {/* Card Content */}
                    <div className="relative p-8">
                      {/* Icon Container */}
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                      >
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-2xl text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {card.description}
                      </p>

                      {/* Stats & Arrow */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                            {card.stats.label}
                          </p>
                          <p className="text-2xl text-gray-900 dark:text-white">
                            {card.stats.value}
                          </p>
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ x: 5 }}
                        >
                          <ChevronRight className="h-8 w-8 text-gray-400 dark:text-gray-600" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Accent Bar */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  </motion.div>
                  </MagicCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-700 dark:text-gray-300">All systems operational</span>
            </div>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-500">Last updated: Just now</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
