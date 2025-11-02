"use client";

import { useState } from "react";
import {
  Shield,
  Bell,
  Settings,
  LogOut,
  Moon,
  Sun,
  Bot,
  Map,
  MessageSquare,
  AlertCircle,
  Phone,
  Users,
  Heart,
  Activity,
  Flame,
  Radio,
  TrendingUp,
  MapPin,
  Clock,
  Ambulance,
  Hospital,
  User,
  Mail,
  FileText,
  Video,
  MessageCircle,
  Calendar,
  Zap,
  Droplet
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import { AIChatbot } from "./AIChatbot";
import logoImage from 'figma:asset/4d744d9dc222fec480d1bb61c0c3c5755b6f748e.png';

interface FamilyDashboardProps {
  onLogout: () => void;
}

export function FamilyDashboard({ onLogout }: FamilyDashboardProps) {
  const [activeSection, setActiveSection] = useState("heatmap");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: "heatmap", label: "Heat map", icon: Map },
    { id: "community", label: "Community", icon: MessageSquare },
    { id: "sos", label: "SOS", icon: AlertCircle },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "heatmap":
        return <HeatMapSection />;
      case "community":
        return <CommunitySection />;
      case "sos":
        return <SOSSection />;
      default:
        return <HeatMapSection />;
    }
  };

  const activeMenuItem = menuItems.find(item => item.id === activeSection);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-emerald-600 to-teal-700 dark:from-emerald-800 dark:to-teal-900 p-6 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity"
            title="Back to home"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-teal-400">
              <img src={logoImage} alt="Codeveda Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-white">codeveda</h1>
              <p className="text-xs text-white/70">Family Portal</p>
            </div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="pt-4 border-t border-white/20">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">Sarah Johnson</p>
              <p className="text-white/70 text-xs">Family Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Page Title */}
              <div>
                <h1 className="text-slate-900 dark:text-slate-100">
                  {activeMenuItem?.label}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                  Patient: John Smith • Room 304-B
                </p>
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center gap-3">
                {/* AI Chatbot */}
                <button
                  onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                  className="relative inline-flex items-center justify-center w-10 h-10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                  aria-label="Open AI Assistant"
                  title="AI Medical Assistant"
                >
                  <Bot className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center justify-center w-10 h-10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </button>

                {/* Notifications */}
                <button className="relative inline-flex items-center justify-center w-10 h-10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Settings */}
                <button className="inline-flex items-center justify-center w-10 h-10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                  <Settings className="w-5 h-5" />
                </button>

                {/* Logout */}
                <button
                  onClick={onLogout}
                  className="inline-flex items-center justify-center w-10 h-10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* AI Chatbot */}
      <AIChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
}

function HeatMapSection() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  const zones = [
    { id: 1, name: "ICU Ward A", risk: 90, cases: 4, level: "critical" },
    { id: 2, name: "General Ward B", risk: 40, cases: 1, level: "moderate" },
    { id: 3, name: "Main Lobby", risk: 60, cases: 2, level: "high" },
    { id: 4, name: "Pediatric Ward", risk: 15, cases: 0, level: "safe" },
    { id: 5, name: "Emergency Room", risk: 75, cases: 3, level: "high" },
    { id: 6, name: "Staff Cafeteria", risk: 35, cases: 1, level: "moderate" },
  ];

  const getZoneBorderColor = (level: string) => {
    switch (level) {
      case "critical":
        return "border-red-500";
      case "high":
        return "border-orange-500";
      case "moderate":
        return "border-yellow-500";
      case "safe":
        return "border-green-500";
      default:
        return "border-gray-500";
    }
  };

  const getZoneGradient = (level: string) => {
    switch (level) {
      case "critical":
        return "from-red-950/60 via-red-900/40 to-red-950/60";
      case "high":
        return "from-orange-950/60 via-orange-900/40 to-orange-950/60";
      case "moderate":
        return "from-yellow-950/60 via-yellow-900/40 to-yellow-950/60";
      case "safe":
        return "from-emerald-950/60 via-emerald-900/40 to-emerald-950/60";
      default:
        return "from-gray-950/60 via-gray-900/40 to-gray-950/60";
    }
  };

  const getRiskTextColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-400";
      case "high":
        return "text-orange-400";
      case "moderate":
        return "text-yellow-400";
      case "safe":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-950 -m-6 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-3xl mb-2">Infection Heat Map</h1>
        <p className="text-slate-400">
          Real-time visualization of infection risk levels across hospital zones
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-slate-800/50 dark:bg-slate-900/50 rounded-lg p-4 mb-6 border border-slate-700 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Last updated: {getCurrentTime()}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Labels
            </button>
            <button className="w-10 h-10 bg-slate-700 dark:bg-slate-800 hover:bg-slate-600 dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-300 transition-colors">
              <MapPin className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 bg-slate-700 dark:bg-slate-800 hover:bg-slate-600 dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-300 transition-colors">
              <Activity className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-700 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-slate-300 text-sm">Critical (&gt;80)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span className="text-slate-300 text-sm">High (60-80)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500"></div>
            <span className="text-slate-300 text-sm">Moderate (30-60)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-slate-300 text-sm">Safe (&lt;30)</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Heat Map Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {zones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id.toString())}
                className={`relative p-6 rounded-xl border-2 ${getZoneBorderColor(
                  zone.level
                )} bg-gradient-to-br ${getZoneGradient(
                  zone.level
                )} hover:scale-105 transition-all duration-200 text-left group`}
              >
                {/* Alert Badge for Critical */}
                {zone.level === "critical" && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-4 w-4 text-white" />
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="text-white mb-3">{zone.name}</h3>
                  <p className={`text-sm mb-1 ${getRiskTextColor(zone.level)}`}>
                    Risk: {zone.risk}%
                  </p>
                  <p className="text-slate-400 text-sm">
                    {zone.cases} {zone.cases === 1 ? "case" : "cases"}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Zone Info */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 dark:bg-slate-900/50 rounded-lg p-6 border border-slate-700 dark:border-slate-800 h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-700/50 dark:bg-slate-800/50 flex items-center justify-center mb-4">
              <Droplet className="h-10 w-10 text-slate-500" />
            </div>
            <h3 className="text-slate-300 text-lg mb-2">Select a zone</h3>
            <p className="text-slate-500 text-sm">
              Click on any zone to view details and take actions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunitySection() {
  // Patient information
  const patientInfo = {
    name: "John Smith",
    roomNumber: "304-B",
    ward: "ICU Ward A",
    diseases: ["MRSA Infection", "Pneumonia"],
    currentMedicines: [
      { name: "Vancomycin", dose: "1g IV", frequency: "Every 12 hours" },
      { name: "Linezolid", dose: "600mg", frequency: "Twice daily" },
      { name: "Ceftriaxone", dose: "2g IV", frequency: "Once daily" }
    ],
    isolationStatus: "Contact Isolation",
    isolationType: "Strict Precautions Required"
  };

  const forumPosts = [
    {
      title: "Coping with hospital anxiety",
      author: "Maria R.",
      replies: 24,
      time: "2 hours ago",
      category: "Support",
    },
    {
      title: "Nutritional tips during recovery",
      author: "Dr. Anderson",
      replies: 18,
      time: "5 hours ago",
      category: "Health",
    },
    {
      title: "Visiting hours and safety protocols",
      author: "Admin",
      replies: 42,
      time: "1 day ago",
      category: "Information",
    },
  ];

  const supportGroups = [
    {
      name: "Family Support Circle",
      members: 156,
      nextMeeting: "Today at 6:00 PM",
      type: "Virtual",
    },
    {
      name: "Recovery Journey",
      members: 89,
      nextMeeting: "Tomorrow at 3:00 PM",
      type: "In-Person",
    },
    {
      name: "Caregiver Wellness",
      members: 203,
      nextMeeting: "Nov 3 at 7:00 PM",
      type: "Virtual",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Patient Information Card */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-900">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-indigo-900 dark:text-indigo-100 mb-1">
              Patient Information
            </h3>
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              Current status and medical details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name & Room */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-900">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Patient Name</p>
            <p className="text-gray-900 dark:text-white">{patientInfo.name}</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-900">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Room & Ward</p>
            <p className="text-gray-900 dark:text-white">{patientInfo.roomNumber}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{patientInfo.ward}</p>
          </div>

          {/* Diseases */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-900">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Diagnoses</p>
            <div className="space-y-1">
              {patientInfo.diseases.map((disease, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-900 dark:text-white">{disease}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Isolation Status */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-900">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Isolation Status</p>
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <p className="text-gray-900 dark:text-white">{patientInfo.isolationStatus}</p>
            </div>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">{patientInfo.isolationType}</p>
          </div>
        </div>

        {/* Current Medicines */}
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-900">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-gray-900 dark:text-white">Current Medications</h4>
          </div>
          <div className="space-y-2">
            {patientInfo.currentMedicines.map((medicine, index) => (
              <div 
                key={index}
                className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">{medicine.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {medicine.dose} • {medicine.frequency}
                  </p>
                </div>
                <Badge className="bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200">
                  Active
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Welcome Banner */}
      <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-900">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
            <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-emerald-900 dark:text-emerald-100 mb-2">
              Welcome to the Family Community
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300">
              Connect with other families, share experiences, and access support
              resources during your loved one's treatment journey.
            </p>
          </div>
        </div>
      </Card>

      {/* Support Groups */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Support Groups
        </h3>
        <div className="space-y-3">
          {supportGroups.map((group, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-gray-900 dark:text-white mb-1">
                    {group.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {group.members} members
                  </p>
                </div>
                <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200">
                  {group.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Next meeting: {group.nextMeeting}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300"
              >
                Join Group
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Forum Posts */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Recent Forum Discussions
        </h3>
        <div className="space-y-3">
          {forumPosts.map((post, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-white mb-1">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Posted by {post.author} • {post.time}
                  </p>
                </div>
                <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {post.category}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MessageSquare className="h-4 w-4" />
                <span>{post.replies} replies</span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full">
          View All Discussions
        </Button>
      </Card>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-900">
          <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
          <h4 className="text-gray-900 dark:text-white mb-2">
            Educational Resources
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Learn about treatments, recovery processes, and care guidelines
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Access Library
          </Button>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-900">
          <Video className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-3" />
          <h4 className="text-gray-900 dark:text-white mb-2">Video Consultations</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Schedule virtual meetings with healthcare team
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Book Session
          </Button>
        </Card>
      </div>
    </div>
  );
}

function SOSSection() {
  const emergencyContacts = [
    {
      name: "Emergency Services",
      phone: "911",
      type: "Critical Emergency",
      available: "24/7",
      icon: Ambulance,
      color: "red",
    },
    {
      name: "Hospital Main Desk",
      phone: "+1 (555) 123-4567",
      type: "General Inquiries",
      available: "24/7",
      icon: Hospital,
      color: "blue",
    },
    {
      name: "Nurse Station (Floor 3)",
      phone: "+1 (555) 123-4571",
      type: "Patient Care",
      available: "24/7",
      icon: Heart,
      color: "emerald",
    },
    {
      name: "Dr. Michael Chen",
      phone: "+1 (555) 123-4580",
      type: "Primary Physician",
      available: "8 AM - 6 PM",
      icon: User,
      color: "purple",
    },
  ];

  const quickActions = [
    {
      title: "Request Immediate Visit",
      description: "Get urgent permission to visit patient",
      icon: Zap,
      color: "orange",
    },
    {
      title: "Medical Update",
      description: "Request latest medical status",
      icon: Activity,
      color: "blue",
    },
    {
      title: "Speak to Doctor",
      description: "Schedule emergency consultation",
      icon: Phone,
      color: "emerald",
    },
    {
      title: "Report Concern",
      description: "Submit urgent care concerns",
      icon: AlertCircle,
      color: "red",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      red: {
        bg: "bg-red-50 dark:bg-red-950/30",
        border: "border-red-200 dark:border-red-900",
        text: "text-red-900 dark:text-red-100",
        icon: "text-red-600 dark:text-red-400",
      },
      blue: {
        bg: "bg-blue-50 dark:bg-blue-950/30",
        border: "border-blue-200 dark:border-blue-900",
        text: "text-blue-900 dark:text-blue-100",
        icon: "text-blue-600 dark:text-blue-400",
      },
      emerald: {
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
        border: "border-emerald-200 dark:border-emerald-900",
        text: "text-emerald-900 dark:text-emerald-100",
        icon: "text-emerald-600 dark:text-emerald-400",
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-950/30",
        border: "border-purple-200 dark:border-purple-900",
        text: "text-purple-900 dark:text-purple-100",
        icon: "text-purple-600 dark:text-purple-400",
      },
      orange: {
        bg: "bg-orange-50 dark:bg-orange-950/30",
        border: "border-orange-200 dark:border-orange-900",
        text: "text-orange-900 dark:text-orange-100",
        icon: "text-orange-600 dark:text-orange-400",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      {/* Emergency Alert Banner */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-red-200 dark:border-red-900">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 animate-pulse" />
          </div>
          <div className="flex-1">
            <h3 className="text-red-900 dark:text-red-100 mb-2">
              Emergency Support Available 24/7
            </h3>
            <p className="text-red-700 dark:text-red-300 mb-4">
              If you're experiencing a medical emergency, call 911 immediately. For
              urgent patient concerns, use the emergency contacts below.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Phone className="h-4 w-4 mr-2" />
              Call Emergency Services
            </Button>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Emergency Contacts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon;
            const colors = getColorClasses(contact.color);
            return (
              <div
                key={index}
                className={`p-5 rounded-lg border ${colors.bg} ${colors.border}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                  <Badge className="bg-white/50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300">
                    {contact.available}
                  </Badge>
                </div>
                <h4 className={`${colors.text} mb-1`}>{contact.name}</h4>
                <p className="text-2xl text-gray-900 dark:text-white mb-2">
                  {contact.phone}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contact.type}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => window.open(`tel:${contact.phone}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const colors = getColorClasses(action.color);
            return (
              <button
                key={index}
                className={`p-5 rounded-lg border ${colors.bg} ${colors.border} text-left hover:shadow-md transition-all`}
              >
                <Icon className={`h-6 w-6 ${colors.icon} mb-3`} />
                <h4 className={`${colors.text} mb-2`}>{action.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Patient Status Alert */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4">
          Current Patient Status
        </h3>
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-900 dark:text-emerald-100">
              Stable Condition
            </span>
          </div>
          <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-2">
            Last updated: <Clock className="inline h-3 w-3" /> 15 minutes ago
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vital signs are normal. Patient is resting comfortably. Next doctor
            rounds scheduled for 2:00 PM today.
          </p>
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="outline" className="flex-1">
            <Mail className="h-4 w-4 mr-2" />
            Request Update
          </Button>
          <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Video className="h-4 w-4 mr-2" />
            Video Visit
          </Button>
        </div>
      </Card>
    </div>
  );
}
