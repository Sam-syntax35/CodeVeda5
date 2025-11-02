"use client";

import React, { useState } from "react";
import { Search, AlertCircle, User, Calendar, MapPin, FileText, Pill, FlaskConical, Users, Shield, Network, Sparkles, Download, CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { PatientDashboard } from "./PatientDashboard";

// Mock patient database
const patientDatabase = {
  "P001": {
    id: "P001",
    name: "Sarah Johnson",
    age: 45,
    gender: "Female",
    room: "ICU-204",
    ward: "Intensive Care Unit",
    medicalHistory: [
      "Type 2 Diabetes (2015)",
      "Hypertension (2018)",
      "Penicillin allergy",
      "Previous MRSA infection (2023)"
    ],
    currentDiagnosis: "Post-surgical wound infection with suspected MDR bacteria",
    caseStatus: "Critical - Under observation",
    medications: [
      { name: "Vancomycin", dose: "1g IV q12h", startDate: "Oct 28, 2025" },
      { name: "Meropenem", dose: "2g IV q8h", startDate: "Oct 29, 2025" },
      { name: "Metformin", dose: "500mg PO bid", startDate: "Ongoing" }
    ],
    testResults: [
      { test: "Blood Culture", result: "MRSA detected", date: "Oct 30, 2025", status: "critical" },
      { test: "WBC Count", result: "15,200/μL (High)", date: "Nov 1, 2025", status: "warning" },
      { test: "CRP", result: "85 mg/L (Elevated)", date: "Nov 1, 2025", status: "warning" }
    ],
    assignedStaff: [
      { name: "Dr. Michael Chen", role: "Attending Physician" },
      { name: "Nurse Emma Wilson", role: "Primary Nurse" },
      { name: "John Davis", role: "Care Attendant" }
    ],
    isolationStatus: "Contact Precautions - Strict isolation",
    isolationType: "isolated",
    contactNetwork: {
      directContacts: [
        { name: "Nurse Emma Wilson", role: "Primary Nurse", contactTime: "Oct 31, 10:15 AM", duration: "45 min", riskLevel: "high" },
        { name: "Dr. Michael Chen", role: "Attending Physician", contactTime: "Oct 31, 2:30 PM", duration: "20 min", riskLevel: "medium" },
        { name: "John Davis", role: "Care Attendant", contactTime: "Nov 1, 8:00 AM", duration: "30 min", riskLevel: "high" },
        { name: "Dr. Susan Lee", role: "Infectious Disease Consultant", contactTime: "Oct 30, 4:00 PM", duration: "15 min", riskLevel: "low" }
      ],
      indirectContacts: [
        { name: "Patient Robert Martinez (P002)", location: "Shared CT Scan Room", contactTime: "Oct 30, 11:00 AM", riskLevel: "medium" },
        { name: "Technician Mark Johnson", location: "Radiology Department", contactTime: "Oct 30, 11:15 AM", riskLevel: "low" }
      ]
    },
    cleaningCompliance: {
      roomCleanings: [
        { date: "Nov 1, 2025", time: "6:00 AM", cleanedBy: "Ana Rodriguez", status: "completed", protocol: "MDR Isolation Protocol" },
        { date: "Oct 31, 2025", time: "6:00 PM", cleanedBy: "James Carter", status: "completed", protocol: "MDR Isolation Protocol" },
        { date: "Oct 31, 2025", time: "6:00 AM", cleanedBy: "Ana Rodriguez", status: "completed", protocol: "MDR Isolation Protocol" },
        { date: "Oct 30, 2025", time: "6:00 PM", cleanedBy: "James Carter", status: "delayed", protocol: "MDR Isolation Protocol", delay: "2 hours" }
      ],
      overallCompliance: 75,
      lastCleaned: "6 hours ago"
    }
  },
  "P002": {
    id: "P002",
    name: "Robert Martinez",
    age: 62,
    gender: "Male",
    room: "Ward B-312",
    ward: "General Medicine",
    medicalHistory: [
      "COPD (2010)",
      "Former smoker (quit 2012)",
      "Previous pneumonia (2022)"
    ],
    currentDiagnosis: "Community-acquired pneumonia, responding well to treatment",
    caseStatus: "Stable - Improving",
    medications: [
      { name: "Ceftriaxone", dose: "2g IV daily", startDate: "Oct 27, 2025" },
      { name: "Azithromycin", dose: "500mg PO daily", startDate: "Oct 27, 2025" }
    ],
    testResults: [
      { test: "Chest X-ray", result: "Infiltrate improving", date: "Oct 31, 2025", status: "normal" },
      { test: "SpO2", result: "94% on room air", date: "Nov 1, 2025", status: "normal" },
      { test: "Temperature", result: "37.2°C (Normal)", date: "Nov 1, 2025", status: "normal" }
    ],
    assignedStaff: [
      { name: "Dr. Lisa Park", role: "Attending Physician" },
      { name: "Nurse James Brown", role: "Primary Nurse" }
    ],
    isolationStatus: "Standard precautions",
    isolationType: "standard",
    contactNetwork: {
      directContacts: [
        { name: "Nurse James Brown", role: "Primary Nurse", contactTime: "Nov 1, 9:00 AM", duration: "25 min", riskLevel: "low" },
        { name: "Dr. Lisa Park", role: "Attending Physician", contactTime: "Nov 1, 11:30 AM", duration: "15 min", riskLevel: "low" }
      ],
      indirectContacts: [
        { name: "Patient Sarah Johnson (P001)", location: "Shared CT Scan Room", contactTime: "Oct 30, 11:00 AM", riskLevel: "medium" }
      ]
    },
    cleaningCompliance: {
      roomCleanings: [
        { date: "Nov 1, 2025", time: "7:00 AM", cleanedBy: "Maria Gonzalez", status: "completed", protocol: "Standard Protocol" },
        { date: "Oct 31, 2025", time: "7:00 PM", cleanedBy: "Carlos Mendez", status: "completed", protocol: "Standard Protocol" },
        { date: "Oct 31, 2025", time: "7:00 AM", cleanedBy: "Maria Gonzalez", status: "completed", protocol: "Standard Protocol" }
      ],
      overallCompliance: 100,
      lastCleaned: "5 hours ago"
    }
  },
  "P003": {
    id: "P003",
    name: "Emily Thompson",
    age: 28,
    gender: "Female",
    room: "Ward A-105",
    ward: "Maternity",
    medicalHistory: [
      "No significant past medical history",
      "First pregnancy"
    ],
    currentDiagnosis: "Post-partum recovery, monitoring for signs of infection",
    caseStatus: "Stable - Routine monitoring",
    medications: [
      { name: "Prenatal vitamins", dose: "1 tab daily", startDate: "Ongoing" },
      { name: "Iron supplement", dose: "65mg daily", startDate: "Oct 30, 2025" }
    ],
    testResults: [
      { test: "CBC", result: "All parameters normal", date: "Oct 31, 2025", status: "normal" },
      { test: "Temperature", result: "36.8°C (Normal)", date: "Nov 1, 2025", status: "normal" }
    ],
    assignedStaff: [
      { name: "Dr. Amanda Foster", role: "OB/GYN" },
      { name: "Nurse Rachel Green", role: "Primary Nurse" },
      { name: "Maria Santos", role: "Lactation Consultant" }
    ],
    isolationStatus: "No isolation required",
    isolationType: "none",
    contactNetwork: {
      directContacts: [
        { name: "Nurse Rachel Green", role: "Primary Nurse", contactTime: "Nov 1, 8:30 AM", duration: "20 min", riskLevel: "low" },
        { name: "Dr. Amanda Foster", role: "OB/GYN", contactTime: "Oct 31, 3:00 PM", duration: "15 min", riskLevel: "low" },
        { name: "Maria Santos", role: "Lactation Consultant", contactTime: "Nov 1, 10:00 AM", duration: "40 min", riskLevel: "low" }
      ],
      indirectContacts: []
    },
    cleaningCompliance: {
      roomCleanings: [
        { date: "Nov 1, 2025", time: "6:30 AM", cleanedBy: "Lisa Thompson", status: "completed", protocol: "Standard Protocol" },
        { date: "Oct 31, 2025", time: "6:30 PM", cleanedBy: "David Lee", status: "completed", protocol: "Standard Protocol" }
      ],
      overallCompliance: 100,
      lastCleaned: "5.5 hours ago"
    }
  },
  "P004": {
    id: "P004",
    name: "David Kim",
    age: 55,
    gender: "Male",
    room: "ICU-201",
    ward: "Intensive Care Unit",
    medicalHistory: [
      "Liver cirrhosis (2020)",
      "Hepatitis C (resolved after treatment)",
      "Chronic kidney disease Stage 3"
    ],
    currentDiagnosis: "Septic shock secondary to MDR E. coli bacteremia",
    caseStatus: "Critical - Hemodynamically unstable",
    medications: [
      { name: "Piperacillin/Tazobactam", dose: "4.5g IV q6h", startDate: "Oct 29, 2025" },
      { name: "Colistin", dose: "5 MIU IV q12h", startDate: "Oct 31, 2025" },
      { name: "Norepinephrine", dose: "Titrated to MAP >65", startDate: "Oct 30, 2025" }
    ],
    testResults: [
      { test: "Blood Culture", result: "MDR E. coli (Carbapenem-resistant)", date: "Oct 30, 2025", status: "critical" },
      { test: "Lactate", result: "4.2 mmol/L (Elevated)", date: "Nov 1, 2025", status: "critical" },
      { test: "Creatinine", result: "2.8 mg/dL (Elevated)", date: "Nov 1, 2025", status: "warning" }
    ],
    assignedStaff: [
      { name: "Dr. Richard Turner", role: "ICU Intensivist" },
      { name: "Nurse Patricia Moore", role: "ICU Nurse" },
      { name: "Dr. Susan Lee", role: "Infectious Disease Specialist" }
    ],
    isolationStatus: "Contact Precautions - Strict isolation with additional MDR protocols",
    isolationType: "isolated",
    contactNetwork: {
      directContacts: [
        { name: "Nurse Patricia Moore", role: "ICU Nurse", contactTime: "Nov 1, 7:00 AM", duration: "60 min", riskLevel: "high" },
        { name: "Dr. Richard Turner", role: "ICU Intensivist", contactTime: "Nov 1, 8:30 AM", duration: "30 min", riskLevel: "high" },
        { name: "Dr. Susan Lee", role: "Infectious Disease Specialist", contactTime: "Oct 31, 5:00 PM", duration: "25 min", riskLevel: "medium" },
        { name: "Respiratory Therapist Tom Harris", role: "RT", contactTime: "Nov 1, 6:00 AM", duration: "20 min", riskLevel: "high" }
      ],
      indirectContacts: [
        { name: "Lab Technician Sarah Chen", location: "Blood Sample Transport", contactTime: "Oct 31, 9:00 AM", riskLevel: "low" },
        { name: "Pharmacy Staff Mike Wilson", location: "Medication Delivery", contactTime: "Nov 1, 7:30 AM", riskLevel: "low" }
      ]
    },
    cleaningCompliance: {
      roomCleanings: [
        { date: "Nov 1, 2025", time: "5:30 AM", cleanedBy: "Ana Rodriguez", status: "completed", protocol: "MDR+ Enhanced Protocol" },
        { date: "Oct 31, 2025", time: "5:30 PM", cleanedBy: "James Carter", status: "completed", protocol: "MDR+ Enhanced Protocol" },
        { date: "Oct 31, 2025", time: "5:30 AM", cleanedBy: "Ana Rodriguez", status: "completed", protocol: "MDR+ Enhanced Protocol" },
        { date: "Oct 30, 2025", time: "5:30 PM", cleanedBy: "James Carter", status: "completed", protocol: "MDR+ Enhanced Protocol" }
      ],
      overallCompliance: 100,
      lastCleaned: "6.5 hours ago"
    }
  }
};

type PatientData = typeof patientDatabase[keyof typeof patientDatabase];

export function PatientsModule() {
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleBack = () => {
    window.history.back();
  };

  const handleSearch = (id: string) => {
    setPatientId(id);
    if (id.trim() === "") {
      setPatientData(null);
      setNotFound(false);
      return;
    }

    const data = patientDatabase[id.toUpperCase() as keyof typeof patientDatabase];
    if (data) {
      setPatientData(data);
      setNotFound(false);
    } else {
      setPatientData(null);
      setNotFound(true);
    }
  };

  const getIsolationBadgeColor = (type: string) => {
    switch (type) {
      case "isolated":
        return "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800";
      case "standard":
        return "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-800";
      case "none":
        return "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800";
      case "normal":
        return "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700";
    }
  };

  // Show patient dashboard if selected
  if (showDashboard && patientData) {
    return <PatientDashboard patient={patientData} onBack={() => setShowDashboard(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
      >
        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back</span>
      </button>

      {/* Header */}
      <div>
        <h2 className="text-gray-900 dark:text-white mb-2">Patient Information</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter Patient ID to retrieve complete medical records and current status
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter Patient ID (e.g., P001, P002)"
            value={patientId}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Try: P001, P002, P003, or P004
        </p>
      </div>

      {/* Not Found Message */}
      {notFound && (
        <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
          <div>
            <p className="text-yellow-800 dark:text-yellow-200">
              Patient ID "{patientId}" not found in the system.
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Please verify the Patient ID and try again.
            </p>
          </div>
        </div>
      )}

      {/* Patient Data Display */}
      {patientData && (
        <div className="space-y-6">
          {/* Patient Header Card */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-1">
                    {patientData.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {patientData.age} years old • {patientData.gender} • ID: {patientData.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={getIsolationBadgeColor(patientData.isolationType)}>
                  <Shield className="h-3 w-3 mr-1" />
                  {patientData.isolationType === "isolated" ? "Isolated" : patientData.isolationType === "standard" ? "Standard" : "No Isolation"}
                </Badge>
                <Button
                  onClick={() => setShowDashboard(true)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                >
                  View Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-gray-900 dark:text-white">{patientData.room} - {patientData.ward}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Case Status</p>
                  <p className="text-gray-900 dark:text-white">{patientData.caseStatus}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Current Diagnosis */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Current Diagnosis
            </h4>
            <p className="text-gray-700 dark:text-gray-300">{patientData.currentDiagnosis}</p>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Medical History */}
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h4 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Medical History
              </h4>
              <ul className="space-y-2">
                {patientData.medicalHistory.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Isolation Status */}
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <h4 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Isolation Status
              </h4>
              <div className="flex items-start gap-3">
                <div className={`p-3 rounded-lg ${
                  patientData.isolationType === "isolated" 
                    ? "bg-red-100 dark:bg-red-950" 
                    : patientData.isolationType === "standard"
                    ? "bg-blue-100 dark:bg-blue-950"
                    : "bg-green-100 dark:bg-green-950"
                }`}>
                  <Shield className={`h-6 w-6 ${
                    patientData.isolationType === "isolated" 
                      ? "text-red-600 dark:text-red-400" 
                      : patientData.isolationType === "standard"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-green-600 dark:text-green-400"
                  }`} />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">{patientData.isolationStatus}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {patientData.isolationType === "isolated" 
                      ? "All staff must follow strict isolation protocols when entering the room." 
                      : patientData.isolationType === "standard"
                      ? "Standard hospital infection control measures apply."
                      : "No special precautions required."}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Medications */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Pill className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Current Medications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patientData.medications.map((med, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-900 dark:text-white mb-1">{med.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{med.dose}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Started: {med.startDate}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Test Results */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Recent Test Results
            </h4>
            <div className="space-y-3">
              {patientData.testResults.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white mb-1">{test.test}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{test.result}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-500 dark:text-gray-500">{test.date}</p>
                    <Badge variant="outline" className={getStatusBadgeColor(test.status)}>
                      {test.status === "critical" ? "Critical" : test.status === "warning" ? "Warning" : "Normal"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Assigned Staff */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Assigned Staff Duty List
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patientData.assignedStaff.map((staff, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white">{staff.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{staff.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Network Report */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-gray-900 dark:text-white flex items-center gap-2">
                <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Contact Network Report
              </h4>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Map
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Tracks all direct and indirect contacts to identify potential infection transmission chains
            </p>

            {/* Direct Contacts */}
            <div className="mb-6">
              <h5 className="text-gray-900 dark:text-white mb-3">Direct Contacts</h5>
              <div className="space-y-3">
                {patientData.contactNetwork.directContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white">{contact.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{contact.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-900 dark:text-white">{contact.contactTime}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Duration: {contact.duration}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          contact.riskLevel === "high" 
                            ? "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800"
                            : contact.riskLevel === "medium"
                            ? "bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800"
                            : "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800"
                        }
                      >
                        {contact.riskLevel.charAt(0).toUpperCase() + contact.riskLevel.slice(1)} Risk
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indirect Contacts */}
            {patientData.contactNetwork.indirectContacts.length > 0 && (
              <div>
                <h5 className="text-gray-900 dark:text-white mb-3">Indirect Contacts</h5>
                <div className="space-y-3">
                  {patientData.contactNetwork.indirectContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 border-dashed">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white">{contact.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{contact.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-900 dark:text-white">{contact.contactTime}</p>
                        <Badge 
                          variant="outline" 
                          className={
                            contact.riskLevel === "medium"
                              ? "bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800"
                              : "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800"
                          }
                        >
                          {contact.riskLevel.charAt(0).toUpperCase() + contact.riskLevel.slice(1)} Risk
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Cleaning & Sanitation Compliance Report */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Cleaning & Sanitation Compliance
              </h4>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Overall Compliance</p>
                  <p className={`text-2xl ${
                    patientData.cleaningCompliance.overallCompliance >= 90 
                      ? "text-green-600 dark:text-green-500" 
                      : patientData.cleaningCompliance.overallCompliance >= 70
                      ? "text-yellow-600 dark:text-yellow-500"
                      : "text-red-600 dark:text-red-500"
                  }`}>
                    {patientData.cleaningCompliance.overallCompliance}%
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Monitors room cleaning schedules and compliance to prevent cross-contamination. Last cleaned: {patientData.cleaningCompliance.lastCleaned}
            </p>

            <div className="space-y-3">
              {patientData.cleaningCompliance.roomCleanings.map((cleaning, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                  cleaning.status === "completed" 
                    ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900"
                    : "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900"
                }`}>
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      cleaning.status === "completed"
                        ? "bg-green-100 dark:bg-green-950"
                        : "bg-yellow-100 dark:bg-yellow-950"
                    }`}>
                      {cleaning.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">{cleaning.protocol}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cleaned by: {cleaning.cleanedBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-900 dark:text-white">{cleaning.date}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{cleaning.time}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        cleaning.status === "completed"
                          ? "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800"
                          : "bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800"
                      }
                    >
                      {cleaning.status === "completed" ? "Completed" : `Delayed: ${cleaning.delay}`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!patientData && !notFound && patientId === "" && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-gray-900 dark:text-white mb-2">
            No patient selected
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enter a Patient ID above to view complete medical records and current status
          </p>
        </div>
      )}
    </div>
  );
}
