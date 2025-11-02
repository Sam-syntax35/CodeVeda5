"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Users, Stethoscope, Activity, Briefcase, UserPlus, Bell, ChevronLeft, ChevronRight, MapPin, ArrowLeft } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

// Schedule types with their colors and icons
const scheduleTypes = {
  visiting: {
    label: "Visiting Patients",
    color: "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-800",
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
    circleColor: "text-blue-500",
    icon: Users
  },
  checkup: {
    label: "Checkups",
    color: "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800",
    iconBg: "bg-green-100 dark:bg-green-950",
    iconColor: "text-green-600 dark:text-green-400",
    circleColor: "text-green-500",
    icon: Stethoscope
  },
  icu: {
    label: "ICU Rounds",
    color: "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800",
    iconBg: "bg-red-100 dark:bg-red-950",
    iconColor: "text-red-600 dark:text-red-400",
    circleColor: "text-red-500",
    icon: Activity
  },
  clinic: {
    label: "Clinic Slots",
    color: "bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-800",
    iconBg: "bg-purple-100 dark:bg-purple-950",
    iconColor: "text-purple-600 dark:text-purple-400",
    circleColor: "text-purple-500",
    icon: Briefcase
  },
  opd: {
    label: "OPD Timing",
    color: "bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-800",
    iconBg: "bg-orange-100 dark:bg-orange-950",
    iconColor: "text-orange-600 dark:text-orange-400",
    circleColor: "text-orange-500",
    icon: UserPlus
  },
  special: {
    label: "Special Appointments",
    color: "bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-200 border-pink-300 dark:border-pink-800",
    iconBg: "bg-pink-100 dark:bg-pink-950",
    iconColor: "text-pink-600 dark:text-pink-400",
    circleColor: "text-pink-500",
    icon: Bell
  },
  meeting: {
    label: "Meetings & Handover",
    color: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700",
    iconBg: "bg-gray-100 dark:bg-gray-800",
    iconColor: "text-gray-600 dark:text-gray-400",
    circleColor: "text-gray-500",
    icon: Users
  }
};

// Mock schedule data for Saturday, November 1, 2025
const scheduleData = [
  {
    id: 1,
    type: "meeting",
    title: "Morning Handover Meeting",
    time: "7:00 AM - 7:30 AM",
    location: "Conference Room A",
    description: "Night shift to day shift handover, infection control status updates",
    participants: "All ICU doctors, Head Nurse",
    priority: "high"
  },
  {
    id: 2,
    type: "visiting",
    title: "General Ward Morning Rounds",
    time: "7:45 AM - 9:30 AM",
    location: "Ward A, Ward B",
    description: "Check all admitted patients, review overnight vitals and progress",
    patients: "12 patients",
    priority: "high"
  },
  {
    id: 3,
    type: "icu",
    title: "ICU Critical Rounds",
    time: "9:45 AM - 11:00 AM",
    location: "ICU - Beds 201-210",
    description: "Ventilator patients, MDR infection monitoring, Sarah Johnson (P001), David Kim (P004)",
    patients: "6 critical patients",
    priority: "critical"
  },
  {
    id: 4,
    type: "checkup",
    title: "Post-Surgery Follow-up",
    time: "11:15 AM - 12:00 PM",
    location: "Ward C",
    description: "Review test results, wound healing assessment for post-op patients",
    patients: "4 patients",
    priority: "medium"
  },
  {
    id: 5,
    type: "opd",
    title: "OPD Session",
    time: "2:00 PM - 5:00 PM",
    location: "OPD Room 3",
    description: "Walk-in and scheduled outpatient consultations",
    patients: "15-20 expected",
    priority: "medium"
  },
  {
    id: 6,
    type: "special",
    title: "Family Counseling Session",
    time: "5:15 PM - 5:45 PM",
    location: "Private Consultation Room",
    description: "Family discussion regarding David Kim's (P004) treatment plan and prognosis",
    participants: "Patient family, Social worker",
    priority: "high"
  },
  {
    id: 7,
    type: "clinic",
    title: "Private Clinic Appointments",
    time: "6:30 PM - 8:30 PM",
    location: "Private Clinic - Downtown",
    description: "Pre-booked private consultations",
    patients: "8 appointments",
    priority: "medium"
  },
  {
    id: 8,
    type: "visiting",
    title: "Evening Ward Rounds",
    time: "9:00 PM - 10:00 PM",
    location: "Ward A, Ward B, ICU",
    description: "Final rounds, check evening vitals, address any concerns",
    patients: "All admitted patients",
    priority: "high"
  }
];

// Calculate time distribution
const calculateTimeDistribution = () => {
  const distribution: Record<string, number> = {};
  
  scheduleData.forEach(item => {
    const [startStr, endStr] = item.time.split(' - ');
    const start = parseTime(startStr);
    const end = parseTime(endStr);
    const duration = end - start;
    
    if (!distribution[item.type]) {
      distribution[item.type] = 0;
    }
    distribution[item.type] += duration;
  });
  
  return distribution;
};

const parseTime = (timeStr: string): number => {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  return hours + minutes / 60;
};

// Time distribution visualization component
function TimeDistributionCircle() {
  const distribution = calculateTimeDistribution();
  const total = Object.values(distribution).reduce((sum, val) => sum + val, 0);
  
  // Calculate percentages and create segments
  const segments = Object.entries(distribution).map(([type, hours], index) => {
    const percentage = (hours / total) * 100;
    return {
      type,
      hours: hours.toFixed(1),
      percentage: percentage.toFixed(0),
      label: scheduleTypes[type as keyof typeof scheduleTypes].label,
      color: scheduleTypes[type as keyof typeof scheduleTypes].circleColor,
      iconBg: scheduleTypes[type as keyof typeof scheduleTypes].iconBg,
      iconColor: scheduleTypes[type as keyof typeof scheduleTypes].iconColor,
      icon: scheduleTypes[type as keyof typeof scheduleTypes].icon
    };
  });

  // Calculate positions for circular layout
  const centerX = 200;
  const centerY = 200;
  const radius = 140;
  
  return (
    <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-900">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left side - Title */}
        <div className="flex-1">
          <h3 className="text-gray-900 dark:text-white mb-3">Daily Time Distribution</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Comprehensive breakdown of how your {total.toFixed(1)} hours are allocated across different activities today
          </p>
        </div>

        {/* Right side - Circular visualization */}
        <div className="relative" style={{ width: '400px', height: '400px' }}>
          <svg width="400" height="400" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="40"
              className="text-gray-200 dark:text-gray-700"
            />
            
            {/* Animated segments */}
            {segments.map((segment, index) => {
              const circumference = 2 * Math.PI * radius;
              let startOffset = 0;
              
              // Calculate starting position based on previous segments
              for (let i = 0; i < index; i++) {
                startOffset += (parseFloat(segments[i].percentage) / 100) * circumference;
              }
              
              const segmentLength = (parseFloat(segment.percentage) / 100) * circumference;
              const remainingCircumference = circumference - segmentLength;
              
              return (
                <motion.circle
                  key={segment.type}
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="40"
                  strokeDasharray={`${segmentLength} ${remainingCircumference}`}
                  strokeDashoffset={-startOffset}
                  className={segment.color}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${segmentLength} ${remainingCircumference}` }}
                  transition={{
                    duration: 1,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              );
            })}
          </svg>

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl text-gray-900 dark:text-white mb-1">{total.toFixed(1)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
            </div>
          </div>

          {/* Positioned labels around the circle */}
          {segments.map((segment, index) => {
            const angle = ((index / segments.length) * 360 - 90) * (Math.PI / 180);
            const labelRadius = radius + 80;
            const x = centerX + labelRadius * Math.cos(angle);
            const y = centerY + labelRadius * Math.sin(angle);
            
            const Icon = segment.icon;
            
            return (
              <motion.div
                key={`label-${segment.type}`}
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15 + 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="flex flex-col items-center gap-1 min-w-[80px]">
                  <div className={`${segment.iconBg} rounded-full p-2`}>
                    <Icon className={`h-4 w-4 ${segment.iconColor}`} />
                  </div>
                  <p className="text-xs text-gray-900 dark:text-white text-center leading-tight">
                    {segment.label}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {segment.hours}h ({segment.percentage}%)
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend at the bottom */}
      <div className="mt-8 pt-6 border-t border-blue-200 dark:border-blue-800">
        <div className="flex flex-wrap gap-4 justify-center">
          {segments.map((segment, index) => (
            <motion.div
              key={`legend-${segment.type}`}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1 + 0.5
              }}
            >
              <div className={`w-3 h-3 rounded-full ${segment.color.replace('text-', 'bg-')}`} />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {segment.label}: {segment.hours}h
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function SchedulesModule() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 1)); // Nov 1, 2025
  const [selectedSchedule, setSelectedSchedule] = useState<typeof scheduleData[0] | null>(null);

  const handleBack = () => {
    window.history.back();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 dark:text-white mb-2">Daily Schedule</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your complete daily timetable with all appointments, rounds, and meetings
        </p>
      </div>

      {/* Time Distribution Circle */}
      <TimeDistributionCircle />

      {/* Date Navigation */}
      <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDay('prev')}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div className="text-center">
              <p className="text-gray-900 dark:text-white">{formatDate(selectedDate)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {scheduleData.length} scheduled items
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDay('next')}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>

      {/* Schedule Type Legend */}
      <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h4 className="text-gray-900 dark:text-white mb-3">Schedule Types</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(scheduleTypes).map(([key, type]) => (
            <Badge 
              key={key}
              variant="outline" 
              className={type.color}
            >
              {type.label}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Timeline View */}
      <div className="space-y-4">
        {scheduleData.map((item, index) => {
          const typeConfig = scheduleTypes[item.type as keyof typeof scheduleTypes];
          const Icon = typeConfig.icon;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Card 
                className={`p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all cursor-pointer hover:shadow-lg ${
                  selectedSchedule?.id === item.id ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                }`}
                onClick={() => setSelectedSchedule(selectedSchedule?.id === item.id ? null : item)}
              >
                <div className="flex items-start gap-4">
                  {/* Time Marker */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`h-12 w-12 rounded-full ${typeConfig.iconBg} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${typeConfig.iconColor}`} />
                    </div>
                    {index < scheduleData.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 dark:bg-gray-700 mt-2" />
                    )}
                  </div>

                  {/* Schedule Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="text-gray-900 dark:text-white mb-1">{item.title}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{item.time}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className={typeConfig.color}>
                          {typeConfig.label}
                        </Badge>
                        {item.priority === "critical" && (
                          <Badge variant="outline" className="bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800">
                            Critical
                          </Badge>
                        )}
                        {item.priority === "high" && (
                          <Badge variant="outline" className="bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-800">
                            High Priority
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.location}</span>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {item.description}
                    </p>

                    {/* Additional Details */}
                    {selectedSchedule?.id === item.id && (
                      <motion.div 
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.patients && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Patients: <span className="text-gray-900 dark:text-white">{item.patients}</span>
                            </span>
                          </div>
                        )}
                        {item.participants && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Participants: <span className="text-gray-900 dark:text-white">{item.participants}</span>
                            </span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Daily Summary */}
      <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-teal-200 dark:border-teal-900">
        <h4 className="text-gray-900 dark:text-white mb-4">Today's Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl text-teal-600 dark:text-teal-400 mb-1">8</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-blue-600 dark:text-blue-400 mb-1">3</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-red-600 dark:text-red-400 mb-1">1</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Critical</p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-purple-600 dark:text-purple-400 mb-1">
              {calculateTimeDistribution() && Object.values(calculateTimeDistribution()).reduce((sum, val) => sum + val, 0).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
