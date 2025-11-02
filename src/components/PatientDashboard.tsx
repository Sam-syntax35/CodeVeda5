"use client";

import React, { useState, useEffect } from "react";
import { 
  Hexagon, 
  Bell, 
  Bookmark, 
  User, 
  Calendar, 
  Pill, 
  Utensils, 
  FileText, 
  CalendarDays,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  Activity,
  Heart,
  Thermometer,
  Droplet,
  Map,
  TrendingUp,
  Users,
  Radio,
  Flame,
  Navigation
} from "lucide-react";
import { Card } from "./ui/card";
import { MagicCard, GlobalCardSpotlight } from "./MagicCard";
import logoImage from 'figma:asset/4d744d9dc222fec480d1bb61c0c3c5755b6f748e.png';
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CommunityModule } from "./CommunityModule";

type PatientData = {
  id: string;
  name: string;
  age: number;
  gender: string;
  room: string;
  ward: string;
  phone?: string;
  email?: string;
  emergencyContact?: string;
  medicalHistory: string[];
  currentDiagnosis: string;
  caseStatus: string;
  medications: Array<{
    name: string;
    dose: string;
    startDate: string;
    frequency?: string;
  }>;
  testResults: Array<{
    test: string;
    result: string;
    date: string;
    status: string;
  }>;
  assignedStaff: Array<{
    name: string;
    role: string;
  }>;
  isolationStatus: string;
  isolationType: string;
  vitals?: {
    heartRate: string;
    bloodPressure: string;
    temperature: string;
    oxygenSaturation: string;
    lastUpdated: string;
  };
  diet?: {
    type: string;
    restrictions: string[];
    mealPlan: Array<{
      meal: string;
      time: string;
      items: string[];
    }>;
  };
};

type Props = {
  patient: PatientData;
  onBack: () => void;
  initialSection?: string;
};

export function PatientDashboard({ patient, onBack, initialSection = "overview" }: Props) {
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  const sidebarItems = [
    { id: "overview", label: "Medical History", icon: FileText },
    { id: "tracking", label: "Tracking", icon: Navigation },
    { id: "medicines", label: "Medicines", icon: Pill },
    { id: "diet", label: "Diet Planner", icon: Utensils },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "schedules", label: "Plans and Schedules", icon: CalendarDays },
    { id: "community", label: "Community", icon: Users },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <MedicalHistorySection patient={patient} />;
      case "tracking":
        return <TrackingSection patient={patient} />;
      case "medicines":
        return <MedicinesSection patient={patient} />;
      case "diet":
        return <DietPlannerSection patient={patient} />;
      case "reports":
        return <ReportsSection patient={patient} />;
      case "schedules":
        return <SchedulesSection patient={patient} />;
      case "community":
        return <CommunitySection />;
      default:
        return <MedicalHistorySection patient={patient} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <GlobalCardSpotlight enabled={true} spotlightRadius={300} glowColor="132, 0, 255" />
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-indigo-500 to-purple-600 dark:from-indigo-900 dark:to-purple-900 p-6 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
            title="Back to Patient List"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-teal-400">
              <img src={logoImage} alt="Codeveda Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl text-white">codeveda</h1>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => {
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
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl text-gray-900 dark:text-white mb-1">
                Hi {patient.name.split(" ")[0]}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Patient ID: {patient.id} • {patient.room}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              >
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              >
                <Bookmark className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Content Area */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function MedicalHistorySection({ patient }: { patient: PatientData }) {
  return (
    <div className="space-y-6">
      {/* Contact Details Card */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
              <p className="text-gray-900 dark:text-white">
                {patient.phone || "+1 (555) 123-4567"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-white">
                {patient.email || `${patient.name.toLowerCase().replace(" ", ".")}@email.com`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
              <p className="text-gray-900 dark:text-white">
                {patient.room} - {patient.ward}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Emergency Contact</p>
              <p className="text-gray-900 dark:text-white">
                {patient.emergencyContact || "+1 (555) 987-6543"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Medical History */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Medical History
        </h3>
        <ul className="space-y-3">
          {patient.medicalHistory.map((item, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-2" />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Current Diagnosis */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Current Diagnosis
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">{patient.currentDiagnosis}</p>
        <Badge className="bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200">
          {patient.caseStatus}
        </Badge>
      </Card>
    </div>
  );
}

function HeatMapSection({ patient }: { patient: PatientData }) {
  // Mock data for infection tracking and contact zones
  const contactZones = [
    { zone: "ICU Ward 3", riskLevel: "high", contacts: 12, lastContact: "2 hours ago" },
    { zone: "General Ward 5", riskLevel: "medium", contacts: 5, lastContact: "1 day ago" },
    { zone: "Radiology", riskLevel: "low", contacts: 3, lastContact: "3 days ago" },
    { zone: "Cafeteria", riskLevel: "medium", contacts: 8, lastContact: "1 day ago" },
  ];

  const roomGrid = [
    ["low", "low", "medium", "low", "low", "low"],
    ["low", "high", "high", "medium", "low", "low"],
    ["medium", "high", "critical", "high", "medium", "low"],
    ["low", "medium", "high", "medium", "low", "low"],
    ["low", "low", "medium", "low", "low", "low"],
  ];

  const infectionTrends = [
    { day: "Mon", contacts: 3 },
    { day: "Tue", contacts: 5 },
    { day: "Wed", contacts: 8 },
    { day: "Thu", contacts: 12 },
    { day: "Fri", contacts: 7 },
    { day: "Sat", contacts: 4 },
    { day: "Sun", contacts: 2 },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "bg-red-600 dark:bg-red-700";
      case "high":
        return "bg-orange-500 dark:bg-orange-600";
      case "medium":
        return "bg-yellow-400 dark:bg-yellow-500";
      case "low":
        return "bg-green-400 dark:bg-green-500";
      default:
        return "bg-gray-300 dark:bg-gray-600";
    }
  };

  const getRiskBadgeStyle = (risk: string) => {
    switch (risk) {
      case "critical":
        return "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200";
      case "high":
        return "bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200";
      case "low":
        return "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200";
      default:
        return "bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-red-200 dark:border-red-900">
          <div className="flex items-center justify-between mb-2">
            <Flame className="h-6 w-6 text-red-600 dark:text-red-400" />
            <Badge className="bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200">Critical</Badge>
          </div>
          <p className="text-3xl text-gray-900 dark:text-white mb-1">1</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">High Risk Zones</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 border-orange-200 dark:border-orange-900">
          <div className="flex items-center justify-between mb-2">
            <Radio className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <Badge className="bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200">Active</Badge>
          </div>
          <p className="text-3xl text-gray-900 dark:text-white mb-1">28</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Contacts</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-900">
          <div className="flex items-center justify-between mb-2">
            <Map className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200">Tracked</Badge>
          </div>
          <p className="text-3xl text-gray-900 dark:text-white mb-1">4</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Zones Visited</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-900">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <Badge className="bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200">Trend</Badge>
          </div>
          <p className="text-3xl text-gray-900 dark:text-white mb-1">-42%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">vs Last Week</p>
        </Card>
      </div>

      {/* Hospital Floor Heat Map */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-gray-900 dark:text-white mb-1">Floor Infection Risk Map</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time contamination tracking</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-400"></div>
              <span className="text-gray-600 dark:text-gray-400">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-400"></div>
              <span className="text-gray-600 dark:text-gray-400">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500"></div>
              <span className="text-gray-600 dark:text-gray-400">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-600"></div>
              <span className="text-gray-600 dark:text-gray-400">Critical</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {roomGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`flex-1 h-16 rounded-lg ${getRiskColor(cell)} transition-all hover:scale-105 cursor-pointer`}
                  title={`Room ${rowIndex + 1}-${cellIndex + 1}: ${cell} risk`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-900">
          <p className="text-sm text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Current Location: {patient.room} (Row 3, Room 3 - Critical Zone)
          </p>
        </div>
      </Card>

      {/* Contact Zones */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4">Contact Zones & Exposure</h3>
        <div className="space-y-3">
          {contactZones.map((zone, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${getRiskColor(zone.riskLevel)}`} />
                <div>
                  <p className="text-gray-900 dark:text-white">{zone.zone}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {zone.contacts} contacts • Last: {zone.lastContact}
                  </p>
                </div>
              </div>
              <Badge className={getRiskBadgeStyle(zone.riskLevel)}>
                {zone.riskLevel.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly Trend */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-6">Weekly Contact Trend</h3>
        <div className="flex items-end gap-2 h-48">
          {infectionTrends.map((data, index) => {
            const height = (data.contacts / 12) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="flex-1 flex items-end w-full">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 dark:from-indigo-700 dark:to-purple-600 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${height}%` }}
                    title={`${data.contacts} contacts`}
                  />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{data.day}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function MedicinesSection({ patient }: { patient: PatientData }) {
  // Mock data for different medicine categories
  const currentDiseaseMedicines = [
    { name: "Vancomycin", dose: "1g IV", frequency: "Every 12 hours", purpose: "MRSA infection treatment", daysLeft: 7 },
    { name: "Linezolid", dose: "600mg", frequency: "Twice daily", purpose: "Antibiotic for resistant bacteria", daysLeft: 7 },
    { name: "Daptomycin", dose: "500mg IV", frequency: "Once daily", purpose: "Skin and soft tissue infection", daysLeft: 5 }
  ];

  const dailyMedicines = [
    { name: "Aspirin", dose: "81mg", frequency: "Once daily (morning)", purpose: "Cardiovascular protection", duration: "Ongoing" },
    { name: "Metformin", dose: "500mg", frequency: "Twice daily (with meals)", purpose: "Diabetes management", duration: "Ongoing" },
    { name: "Atorvastatin", dose: "20mg", frequency: "Once daily (evening)", purpose: "Cholesterol control", duration: "Ongoing" },
    { name: "Lisinopril", dose: "10mg", frequency: "Once daily (morning)", purpose: "Blood pressure management", duration: "Ongoing" }
  ];

  const emergencyMedicines = [
    { name: "Epinephrine Auto-Injector", dose: "0.3mg", usage: "Severe allergic reaction", location: "Bedside cabinet" },
    { name: "Nitroglycerin", dose: "0.4mg sublingual", usage: "Chest pain/Angina", location: "Bedside drawer" },
    { name: "Albuterol Inhaler", dose: "2 puffs", usage: "Breathing difficulty", location: "With patient" },
    { name: "Glucose Tablets", dose: "15-20g", usage: "Low blood sugar", location: "Bedside cabinet" }
  ];

  const discontinuedMedicines = [
    { name: "Ciprofloxacin", reason: "Completed course", discontinuedDate: "Oct 28, 2025", duration: "10 days" },
    { name: "Prednisone", reason: "Treatment completed", discontinuedDate: "Oct 25, 2025", duration: "5 days (tapered)" },
    { name: "Morphine", reason: "Pain controlled, switched to oral analgesic", discontinuedDate: "Oct 30, 2025", duration: "3 days" }
  ];

  return (
    <div className="space-y-6">
      {/* Current Disease Medicines Card */}
      <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-red-200 dark:border-red-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <Pill className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-red-900 dark:text-red-100">Current Disease Treatment</h3>
            <p className="text-sm text-red-700 dark:text-red-300">Medicines for {patient.currentDiagnosis}</p>
          </div>
        </div>
        <div className="space-y-4">
          {currentDiseaseMedicines.map((med, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-900"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-gray-900 dark:text-white">{med.name}</h4>
                <Badge className="bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200">
                  {med.daysLeft} days left
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>Dosage:</strong> {med.dose}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>Frequency:</strong> {med.frequency}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Purpose:</strong> {med.purpose}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-950/50 rounded-lg">
          <p className="text-sm text-red-900 dark:text-red-200 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Complete the full course as prescribed by your doctor
          </p>
        </div>
      </Card>

      {/* Daily Medicines Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-blue-900 dark:text-blue-100">Daily Medications</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Regular maintenance medications</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyMedicines.map((med, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-900"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-gray-900 dark:text-white">{med.name}</h4>
                <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200">
                  {med.duration}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>Dosage:</strong> {med.dose}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>Frequency:</strong> {med.frequency}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Purpose:</strong> {med.purpose}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-200 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Set daily reminders to maintain consistent medication schedule
          </p>
        </div>
      </Card>

      {/* Emergency Medicines Card */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200 dark:border-orange-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="text-orange-900 dark:text-orange-100">Emergency Medications</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">For urgent medical situations</p>
          </div>
        </div>
        <div className="space-y-4">
          {emergencyMedicines.map((med, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-orange-900"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-gray-900 dark:text-white">{med.name}</h4>
                <Badge className="bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200">
                  Emergency
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>Dosage:</strong> {med.dose}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>Usage:</strong> {med.usage}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Location:</strong> {med.location}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-950/50 rounded-lg">
          <p className="text-sm text-orange-900 dark:text-orange-200 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Press the nurse call button immediately if emergency medication is needed
          </p>
        </div>
      </Card>

      {/* Discontinued Medicines Card */}
      <Card className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <FileText className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-gray-100">Discontinued Medications</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Previously used, no longer active</p>
          </div>
        </div>
        <div className="space-y-4">
          {discontinuedMedicines.map((med, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 opacity-75"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-gray-900 dark:text-white">{med.name}</h4>
                <Badge className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  Discontinued
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>Reason:</strong> {med.reason}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <strong>Discontinued:</strong> {med.discontinuedDate}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Duration taken:</strong> {med.duration}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* General Medication Reminders */}
      <Card className="p-6 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
          <div>
            <h4 className="text-yellow-900 dark:text-yellow-200 mb-2">Important Medication Guidelines</h4>
            <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-300">
              <li>• Always take medications at the prescribed times</li>
              <li>• Inform your nurse immediately if you experience any side effects</li>
              <li>• Do not stop taking antibiotics even if you feel better</li>
              <li>• Some medications should be taken with food - check with your nurse</li>
              <li>• Keep emergency medications easily accessible at all times</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

function DietPlannerSection({ patient }: { patient: PatientData }) {
  const diet = patient.diet || {
    type: "Standard Hospital Diet",
    restrictions: ["Low sodium", "No raw foods (infection control)"],
    mealPlan: [
      {
        meal: "Breakfast",
        time: "8:00 AM",
        items: ["Oatmeal with berries", "Scrambled eggs", "Whole wheat toast", "Orange juice"]
      },
      {
        meal: "Lunch",
        time: "12:30 PM",
        items: ["Grilled chicken breast", "Steamed vegetables", "Brown rice", "Fresh fruit"]
      },
      {
        meal: "Dinner",
        time: "6:00 PM",
        items: ["Baked fish", "Quinoa", "Green salad", "Yogurt"]
      }
    ]
  };

  // Nutritional goals for infection recovery
  const nutritionalGoals = [
    { nutrient: "Protein", target: "75-100g/day", purpose: "Tissue repair & immune support" },
    { nutrient: "Calories", target: "2000-2200 kcal/day", purpose: "Energy for recovery" },
    { nutrient: "Vitamin C", target: "500mg/day", purpose: "Wound healing & immunity" },
    { nutrient: "Zinc", target: "15-20mg/day", purpose: "Immune function" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Diet Information Banner */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-900">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <Utensils className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-green-900 dark:text-green-100">Personalized Diet Plan</h3>
              <Badge className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200">
                {diet.type}
              </Badge>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm mb-3">
              Nutritionally optimized for infection recovery and immune support
            </p>
            <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-300">
              <Calendar className="h-4 w-4" />
              <span>Updated daily based on your recovery progress</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Dietary Restrictions */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          Important Dietary Restrictions
        </h3>
        <div className="space-y-3">
          {diet.restrictions.map((restriction, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-900">
              <div className="w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-400"></div>
              <p className="text-gray-900 dark:text-white">{restriction}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Daily Meal Plan */}
      <div className="space-y-4">
        <h3 className="text-gray-900 dark:text-white">Daily Meal Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diet.mealPlan.map((meal, index) => (
            <Card
              key={index}
              className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-900"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-gray-900 dark:text-white">{meal.meal}</h4>
                <Badge className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200">
                  {meal.time}
                </Badge>
              </div>
              <ul className="space-y-2">
                {meal.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-green-600 dark:text-green-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Nutritional Goals */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
          Nutritional Goals for Recovery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nutritionalGoals.map((goal, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-gray-900 dark:text-white">{goal.nutrient}</h4>
                <Badge className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200">
                  {goal.target}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{goal.purpose}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Hydration Reminder */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
        <div className="flex items-start gap-3">
          <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-blue-900 dark:text-blue-200 mb-2">Hydration Goal</h4>
            <p className="text-blue-800 dark:text-blue-300 mb-2">
              <strong>Target:</strong> 8-10 glasses (2-2.5 liters) of water daily
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Proper hydration is essential for medication absorption and recovery
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ReportsSection({ patient }: { patient: PatientData }) {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4">Medical Reports</h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="text-gray-900 dark:text-white">Blood Culture Report</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Oct 30, 2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm">View PDF</Button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="text-gray-900 dark:text-white">Radiology Report</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Oct 28, 2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm">View PDF</Button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="text-gray-900 dark:text-white">Discharge Summary</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              </div>
            </div>
            <Button variant="outline" size="sm" disabled>Pending</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SchedulesSection({ patient }: { patient: PatientData }) {
  // Medication schedule organized by time
  const medicationSchedule = [
    {
      time: "8:00 AM",
      medications: [
        { name: "Vancomycin", dose: "1g IV", instruction: "Administer slowly over 60 minutes" },
        { name: "Multivitamin", dose: "1 tablet", instruction: "Take with breakfast" }
      ]
    },
    {
      time: "12:00 PM",
      medications: [
        { name: "Linezolid", dose: "600mg", instruction: "Take with or without food" }
      ]
    },
    {
      time: "2:00 PM",
      medications: [
        { name: "Pain Relief (as needed)", dose: "500mg", instruction: "Only if pain level > 5" }
      ]
    },
    {
      time: "6:00 PM",
      medications: [
        { name: "Ceftriaxone", dose: "2g IV", instruction: "IV infusion over 30 minutes" }
      ]
    },
    {
      time: "8:00 PM",
      medications: [
        { name: "Vancomycin", dose: "1g IV", instruction: "Administer slowly over 60 minutes" }
      ]
    },
    {
      time: "10:00 PM",
      medications: [
        { name: "Linezolid", dose: "600mg", instruction: "Take before bedtime" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Medication Schedule */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-purple-200 dark:border-purple-900">
        <div className="flex items-center gap-3 mb-6">
          <Pill className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <div>
            <h3 className="text-gray-900 dark:text-white">Daily Medication Schedule</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Prescribed medications and timing</p>
          </div>
        </div>
        <div className="space-y-3">
          {medicationSchedule.map((schedule, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-900"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-purple-600 dark:text-purple-400">Time</p>
                    <p className="text-purple-900 dark:text-purple-200">{schedule.time}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    {schedule.medications.map((med, medIndex) => (
                      <div key={medIndex} className="pb-2 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-gray-900 dark:text-white">{med.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{med.dose}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{med.instruction}</p>
                          </div>
                          <Badge className="bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200">
                            Scheduled
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-900">
          <p className="text-sm text-purple-900 dark:text-purple-200 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Reminder: Take all medications as prescribed. Contact your healthcare provider if you experience side effects.
          </p>
        </div>
      </Card>

      {/* Upcoming Appointments */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-6">Upcoming Appointments & Schedules</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-200 dark:border-indigo-900">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-gray-900 dark:text-white">Wound Dressing Change</h4>
              <Badge className="bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200">Today</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>2:00 PM - Nurse Emma Wilson</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-gray-900 dark:text-white">Doctor Rounds</h4>
              <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200">Tomorrow</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>9:00 AM - Dr. Michael Chen</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border border-green-200 dark:border-green-900">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-gray-900 dark:text-white">Blood Work</h4>
              <Badge className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200">Nov 3</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>6:00 AM - Lab Technician</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Assigned Staff */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-4">Assigned Healthcare Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patient.assignedStaff.map((staff, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
                <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">{staff.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{staff.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function TrackingSection({ patient }: { patient: PatientData }) {
  // Mock data for location tracking and movement history
  const locationHistory = [
    { location: "ICU Ward 3 - Room 302", time: "Current Location", status: "active" },
    { location: "Radiology Department", time: "1 hour ago", status: "past" },
    { location: "ICU Ward 3 - Room 302", time: "3 hours ago", status: "past" },
    { location: "Operating Room 5", time: "Yesterday, 2:30 PM", status: "past" },
    { location: "Pre-Op Ward", time: "Yesterday, 12:00 PM", status: "past" },
  ];

  const vitalSigns = patient.vitals || {
    heartRate: "72 bpm",
    bloodPressure: "120/80 mmHg",
    temperature: "98.6°F",
    oxygenSaturation: "98%",
    lastUpdated: "10 mins ago"
  };

  return (
    <div className="space-y-6">
      {/* Current Location */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-900">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-gray-900 dark:text-white mb-1">Current Location</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time patient tracking</p>
          </div>
          <Badge className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200">
            <Activity className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <MapPin className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <p className="text-gray-900 dark:text-white">{patient.room}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{patient.ward}</p>
          </div>
        </div>
      </Card>

      {/* Vital Signs */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900 dark:text-white">Latest Vital Signs</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Updated {vitalSigns.lastUpdated}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-lg border border-red-200 dark:border-red-900">
            <Heart className="h-5 w-5 text-red-600 dark:text-red-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Heart Rate</p>
            <p className="text-gray-900 dark:text-white">{vitalSigns.heartRate}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Blood Pressure</p>
            <p className="text-gray-900 dark:text-white">{vitalSigns.bloodPressure}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-lg border border-orange-200 dark:border-orange-900">
            <Thermometer className="h-5 w-5 text-orange-600 dark:text-orange-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Temperature</p>
            <p className="text-gray-900 dark:text-white">{vitalSigns.temperature}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-950/30 dark:to-green-950/30 rounded-lg border border-teal-200 dark:border-teal-900">
            <Droplet className="h-5 w-5 text-teal-600 dark:text-teal-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">O₂ Saturation</p>
            <p className="text-gray-900 dark:text-white">{vitalSigns.oxygenSaturation}</p>
          </div>
        </div>
      </Card>

      {/* Movement History */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white mb-6">Movement History</h3>
        <div className="space-y-3">
          {locationHistory.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg border ${
                item.status === "active"
                  ? "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900"
                  : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className={`w-3 h-3 rounded-full mt-1 ${
                item.status === "active" ? "bg-green-500 animate-pulse" : "bg-gray-400 dark:bg-gray-600"
              }`} />
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">{item.location}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Isolation Status */}
      <Card className="p-6 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
          <div>
            <h4 className="text-yellow-900 dark:text-yellow-200 mb-2">Isolation Status</h4>
            <p className="text-yellow-800 dark:text-yellow-300 mb-1">
              <strong>Status:</strong> {patient.isolationStatus}
            </p>
            <p className="text-yellow-800 dark:text-yellow-300">
              <strong>Type:</strong> {patient.isolationType}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CommunitySection() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-900">
        <h3 className="text-gray-900 dark:text-white mb-2">Patient Community & Resources</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Connect with other patients, access health resources, and stay informed about your care
        </p>
      </Card>
      <CommunityModule />
    </div>
  );
}


