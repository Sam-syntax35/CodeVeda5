"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  FileText, User, Shield, Building, Filter, Download, 
  TrendingUp, AlertTriangle, Clock, CheckCircle, XCircle,
  Users, Calendar, Activity, Network, Sparkles, BarChart3, Check
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

// Mock data for reports
const patientReports = [
  {
    id: "R001",
    patientId: "P001",
    patientName: "Sarah Johnson",
    date: "2025-10-28",
    type: "Infection Risk Assessment",
    status: "Critical",
    riskScore: 85,
    summary: "High-risk MDR infection, requires immediate isolation"
  },
  {
    id: "R002",
    patientId: "P002",
    patientName: "Michael Chen",
    date: "2025-10-30",
    type: "Treatment Progress",
    status: "Stable",
    riskScore: 45,
    summary: "Responding well to antibiotic therapy, vitals stable"
  },
  {
    id: "R003",
    patientId: "P003",
    patientName: "Emma Williams",
    date: "2025-10-29",
    type: "Lab Results Summary",
    status: "Improving",
    riskScore: 32,
    summary: "Bacterial count decreasing, infection clearing"
  },
  {
    id: "R004",
    patientId: "P004",
    patientName: "David Kim",
    date: "2025-11-01",
    type: "ICU Clinical Summary",
    status: "Critical",
    riskScore: 92,
    summary: "Ventilator-dependent, MDR pneumonia confirmed"
  }
];

const regulatoryReports = [
  {
    id: "REG001",
    title: "Monthly MDR Case Report",
    authority: "ICMR",
    dueDate: "2025-11-05",
    status: "Pending",
    cases: 12,
    priority: "High"
  },
  {
    id: "REG002",
    title: "Healthcare-Associated Infections",
    authority: "WHO",
    dueDate: "2025-11-10",
    status: "Draft",
    cases: 8,
    priority: "Medium"
  },
  {
    id: "REG003",
    title: "Antimicrobial Resistance Surveillance",
    authority: "National Health Authority",
    dueDate: "2025-11-15",
    status: "Complete",
    cases: 23,
    priority: "High"
  },
  {
    id: "REG004",
    title: "Outbreak Notification Report",
    authority: "State Health Department",
    dueDate: "2025-11-03",
    status: "Submitted",
    cases: 3,
    priority: "Critical"
  }
];

const operationalReports = [
  {
    id: "OP001",
    category: "Staff Management",
    title: "Doctor Duty Hours - October 2025",
    metric: "Average 52 hrs/week",
    status: "Normal",
    trend: "stable"
  },
  {
    id: "OP002",
    category: "Facility Utilization",
    title: "Ward Occupancy Rate",
    metric: "87% occupied",
    status: "High",
    trend: "up"
  },
  {
    id: "OP003",
    category: "Room Management",
    title: "Room Rotation & Turnover",
    metric: "4.2 hrs average",
    status: "Good",
    trend: "down"
  },
  {
    id: "OP004",
    category: "Cleaning Services",
    title: "Sanitation Cycle Completion",
    metric: "94% compliance",
    status: "Good",
    trend: "up"
  }
];

const contactNetworkData = [
  {
    patientId: "P001",
    patientName: "Sarah Johnson",
    directContacts: 12,
    indirectContacts: 34,
    riskLevel: "High",
    lastUpdated: "2025-11-01 14:30"
  },
  {
    patientId: "P004",
    patientName: "David Kim",
    directContacts: 8,
    indirectContacts: 22,
    riskLevel: "Critical",
    lastUpdated: "2025-11-01 15:15"
  },
  {
    patientId: "P002",
    patientName: "Michael Chen",
    directContacts: 5,
    indirectContacts: 15,
    riskLevel: "Medium",
    lastUpdated: "2025-11-01 13:45"
  }
];

const cleaningComplianceData = [
  {
    roomId: "ICU-201",
    lastCleaned: "2025-11-01 06:00",
    nextScheduled: "2025-11-01 18:00",
    protocol: "Deep Clean + UV",
    staff: "Team A - Martinez",
    compliance: "Compliant",
    delayMinutes: 0
  },
  {
    roomId: "Ward-A-105",
    lastCleaned: "2025-11-01 08:30",
    nextScheduled: "2025-11-01 14:00",
    protocol: "Standard Clean",
    staff: "Team B - Kumar",
    compliance: "Compliant",
    delayMinutes: 0
  },
  {
    roomId: "ICU-203",
    lastCleaned: "2025-11-01 05:45",
    nextScheduled: "2025-11-01 17:45",
    protocol: "Isolation Protocol",
    staff: "Team C - Lee",
    compliance: "Delayed",
    delayMinutes: 35
  },
  {
    roomId: "Ward-B-212",
    lastCleaned: "2025-11-01 09:00",
    nextScheduled: "2025-11-01 15:00",
    protocol: "Standard Clean",
    staff: "Team A - Martinez",
    compliance: "Pending",
    delayMinutes: 15
  }
];

// Report sections for the main overview
const reportSections = [
  {
    title: "Patient Reports",
    description: "Individual patient's clinical summary – progress, test trends, medication, infection risk score.",
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
    borderColor: "border-teal-200 dark:border-teal-800",
    iconBg: "bg-teal-500 dark:bg-teal-600",
    icon: User
  },
  {
    title: "Regulatory Reports",
    description: "Reports needed for government/WHO/ICMR compliance (e.g., MDR cases, infection frequency, mandatory reporting).",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    iconBg: "bg-orange-500 dark:bg-orange-600",
    icon: Shield
  },
  {
    title: "Operational Reports",
    description: "Data about hospital operations → staff duty hours, ward occupancy, room rotation, cleaning cycles.",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-500 dark:bg-amber-600",
    icon: Building
  },
  {
    title: "Contact Network Report",
    description: "Shows who met whom → direct & indirect contact map export for tracking infection transmission chains.",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    iconBg: "bg-purple-500 dark:bg-purple-600",
    icon: Network
  },
  {
    title: "Cleaning & Sanitation Compliance Report",
    description: "Shows if cleaning staff cleaned exposed rooms on time or not. Real-time compliance tracking and alerts.",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    iconBg: "bg-cyan-500 dark:bg-cyan-600",
    icon: Sparkles
  },
  {
    title: "Other Reports",
    description: "Miscellaneous reports based on custom filters → e.g., doctor productivity, departmental infection comparison, custom downloads.",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    borderColor: "border-pink-200 dark:border-pink-800",
    iconBg: "bg-pink-500 dark:bg-pink-600",
    icon: BarChart3
  }
];

export function ReportsModule() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [viewingReport, setViewingReport] = useState<string | null>(null);

  const getRiskBadgeClass = (score: number) => {
    if (score >= 70) return "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800";
    if (score >= 40) return "bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-800";
    return "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800";
  };

  const getStatusBadgeClass = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "critical") return "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800";
    if (statusLower === "pending" || statusLower === "draft") return "bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800";
    if (statusLower === "complete" || statusLower === "submitted" || statusLower === "compliant") return "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800";
    return "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-800";
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="w-full justify-start bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1 overflow-x-auto flex-wrap h-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="patient" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Patient Reports</span>
          </TabsTrigger>
          <TabsTrigger value="regulatory" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Regulatory</span>
          </TabsTrigger>
          <TabsTrigger value="operational" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Operational</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span>Contact Network</span>
          </TabsTrigger>
          <TabsTrigger value="cleaning" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Cleaning & Sanitation</span>
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Other Reports</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Title */}
            <div className="lg:sticky lg:top-8">
              <h1 className="text-gray-900 dark:text-white mb-4 leading-tight">
                Why doctors use our comprehensive reporting system
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                All types of analytics, summaries, and documentation organized in one place. 
                This helps doctors, infection control teams, and hospital admin quickly see patterns, 
                performance, and compliance.
              </p>
              <Button className="bg-teal-600 dark:bg-teal-700 text-white hover:bg-teal-700 dark:hover:bg-teal-600">
                <Download className="h-4 w-4 mr-2" />
                Export All Reports
              </Button>
            </div>

            {/* Right Side - Animated Feature Cards */}
            <div className="space-y-4">
              {reportSections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Card 
                      className={`p-6 ${section.bgColor} border ${section.borderColor} cursor-pointer hover:shadow-lg transition-all duration-300`}
                      onClick={() => {
                        const tabMap: { [key: string]: string } = {
                          "Patient Reports": "patient",
                          "Regulatory Reports": "regulatory",
                          "Operational Reports": "operational",
                          "Contact Network Report": "contact",
                          "Cleaning & Sanitation Compliance Report": "cleaning",
                          "Other Reports": "other"
                        };
                        setSelectedTab(tabMap[section.title] || "overview");
                      }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkmark Icon */}
                        <div className={`${section.iconBg} rounded-full p-2 flex-shrink-0`}>
                          <Check className="h-6 w-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-gray-900 dark:text-white mb-2">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* Patient Reports Tab */}
        <TabsContent value="patient" className="space-y-4">
          <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">Individual Patient Clinical Reports</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Detailed clinical summaries with progress tracking and risk assessments
                </p>
              </div>
              <Button className="bg-teal-600 dark:bg-teal-700 text-white hover:bg-teal-700 dark:hover:bg-teal-600">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>

            <div className="space-y-3">
              {patientReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className="p-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-gray-900 dark:text-white">{report.patientName}</h4>
                          <Badge variant="outline" className="text-xs">
                            {report.patientId}
                          </Badge>
                          <Badge variant="outline" className={getStatusBadgeClass(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="text-gray-900 dark:text-white">{report.type}</span> • {report.date}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{report.summary}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Risk Score</p>
                          <Badge variant="outline" className={getRiskBadgeClass(report.riskScore)}>
                            {report.riskScore}
                          </Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-300 dark:border-gray-600"
                          onClick={() => setViewingReport(report.id)}
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          View PDF
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Regulatory Reports Tab */}
        <TabsContent value="regulatory" className="space-y-4">
          <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">Compliance & Regulatory Reporting</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Government, WHO, and ICMR mandated reports for MDR cases and infection surveillance
                </p>
              </div>
              <Button className="bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="space-y-3">
              {regulatoryReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className="p-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-gray-900 dark:text-white">{report.title}</h4>
                          {report.priority === "Critical" && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            {report.authority}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {report.dueDate}
                          </span>
                          <span>{report.cases} cases</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusBadgeClass(report.status)}>
                          {report.status}
                        </Badge>
                        <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                          <FileText className="h-3 w-3 mr-1" />
                          {report.status === "Complete" || report.status === "Submitted" ? "Download" : "Edit"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Regulatory Summary */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-900">
            <h4 className="text-gray-900 dark:text-white mb-4">Compliance Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl text-blue-600 dark:text-blue-400 mb-1">4</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Reports</p>
              </div>
              <div className="text-center">
                <p className="text-3xl text-green-600 dark:text-green-400 mb-1">2</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Submitted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl text-orange-600 dark:text-orange-400 mb-1">1</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-3xl text-red-600 dark:text-red-400 mb-1">1</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Urgent</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Operational Reports Tab */}
        <TabsContent value="operational" className="space-y-4">
          <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">Hospital Operational Metrics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Staff management, facility utilization, and operational efficiency data
                </p>
              </div>
              <Button className="bg-purple-600 dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {operationalReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className="p-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2 text-xs">
                            {report.category}
                          </Badge>
                          <h4 className="text-gray-900 dark:text-white mb-1">{report.title}</h4>
                        </div>
                        {report.trend === "up" && <TrendingUp className="h-5 w-5 text-green-500" />}
                        {report.trend === "down" && <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />}
                        {report.trend === "stable" && <Activity className="h-5 w-5 text-gray-500" />}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl text-gray-900 dark:text-white">{report.metric}</p>
                        <Badge variant="outline" className={getStatusBadgeClass(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Contact Network Report Tab */}
        <TabsContent value="contact" className="space-y-4">
          <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">Contact Network Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Direct and indirect patient contact mapping for infection transmission tracking
                </p>
              </div>
              <Button className="bg-teal-600 dark:bg-teal-700 text-white hover:bg-teal-700 dark:hover:bg-teal-600">
                <Download className="h-4 w-4 mr-2" />
                Export Network Map
              </Button>
            </div>

            <div className="space-y-3">
              {contactNetworkData.map((contact, index) => (
                <motion.div
                  key={contact.patientId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className="p-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-gray-900 dark:text-white">{contact.patientName}</h4>
                          <Badge variant="outline" className="text-xs">
                            {contact.patientId}
                          </Badge>
                          <Badge variant="outline" className={
                            contact.riskLevel === "Critical" 
                              ? "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800"
                              : contact.riskLevel === "High"
                              ? "bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-800"
                              : "bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800"
                          }>
                            {contact.riskLevel} Risk
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Direct Contacts</p>
                              <p className="text-gray-900 dark:text-white">{contact.directContacts}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Network className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Indirect Contacts</p>
                              <p className="text-gray-900 dark:text-white">{contact.indirectContacts}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Last Updated</p>
                        <p className="text-sm text-gray-900 dark:text-white mb-3">{contact.lastUpdated}</p>
                        <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                          View Network
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Cleaning & Sanitation Tab */}
        <TabsContent value="cleaning" className="space-y-4">
          <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">Cleaning & Sanitation Compliance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-time tracking of room cleaning schedules, protocols, and staff compliance
                </p>
              </div>
              <Button className="bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-600">
                <Download className="h-4 w-4 mr-2" />
                Export Compliance Report
              </Button>
            </div>

            <div className="space-y-3">
              {cleaningComplianceData.map((room, index) => (
                <motion.div
                  key={room.roomId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className={`p-4 border-2 ${
                      room.compliance === "Compliant" 
                        ? "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-800"
                        : room.compliance === "Delayed"
                        ? "bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-800"
                        : "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-300 dark:border-yellow-800"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-gray-900 dark:text-white">{room.roomId}</h4>
                          <Badge variant="outline" className={getStatusBadgeClass(room.compliance)}>
                            {room.compliance === "Compliant" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {room.compliance === "Delayed" && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {room.compliance === "Pending" && <Clock className="h-3 w-3 mr-1" />}
                            {room.compliance}
                          </Badge>
                          {room.delayMinutes > 0 && (
                            <span className="text-xs text-orange-600 dark:text-orange-400">
                              +{room.delayMinutes} min delay
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Last Cleaned</p>
                            <p className="text-gray-900 dark:text-white">{room.lastCleaned}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next Scheduled</p>
                            <p className="text-gray-900 dark:text-white">{room.nextScheduled}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Protocol</p>
                            <p className="text-gray-900 dark:text-white">{room.protocol}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Assigned Staff</p>
                            <p className="text-gray-900 dark:text-white">{room.staff}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Compliance Summary */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-900 mt-4">
              <h4 className="text-gray-900 dark:text-white mb-4">Today's Compliance Overview</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl text-green-600 dark:text-green-400 mb-1">2</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Compliant</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl text-orange-600 dark:text-orange-400 mb-1">1</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Delayed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl text-yellow-600 dark:text-yellow-400 mb-1">1</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl text-blue-600 dark:text-blue-400 mb-1">92%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Overall Rate</p>
                </div>
              </div>
            </Card>
          </Card>
        </TabsContent>

        {/* Other Reports Tab */}
        <TabsContent value="other" className="space-y-4">
          <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 dark:text-white mb-1">Custom & Miscellaneous Reports</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Generate custom reports with advanced filters and export options
                </p>
              </div>
              <Button className="bg-indigo-600 dark:bg-indigo-700 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600">
                <Filter className="h-4 w-4 mr-2" />
                Custom Report Builder
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Doctor Productivity Report",
                  description: "Patient consultations, procedures performed, and hours logged",
                  icon: Users,
                  color: "blue"
                },
                {
                  title: "Departmental Comparison",
                  description: "Cross-departmental infection rates and treatment outcomes",
                  icon: Building,
                  color: "purple"
                },
                {
                  title: "Treatment Efficacy Analysis",
                  description: "Success rates of different treatment protocols and antibiotics",
                  icon: Activity,
                  color: "green"
                },
                {
                  title: "Infection Trend Forecasting",
                  description: "Predictive analytics for infection outbreaks and resource planning",
                  icon: TrendingUp,
                  color: "orange"
                }
              ].map((report, index) => {
                const IconComponent = report.icon;
                return (
                  <motion.div
                    key={report.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="p-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 bg-${report.color}-100 dark:bg-${report.color}-950 rounded-lg`}>
                          <IconComponent className={`h-5 w-5 text-${report.color}-600 dark:text-${report.color}-400`} />
                        </div>
                        <div>
                          <h4 className="text-gray-900 dark:text-white mb-1">{report.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {report.description}
                          </p>
                          <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                            Generate
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* PDF Viewer Modal */}
      {viewingReport && (() => {
        const report = patientReports.find(r => r.id === viewingReport);
        if (!report) return null;

        // Generate detailed report data based on patient
        const detailedReportData = {
          R001: {
            lab: {
              culture: "Klebsiella pneumoniae (Carbapenem-resistant)",
              sensitivity: "Resistant to: Meropenem, Imipenem, Ceftriaxone, Ciprofloxacin",
              wbc: "18,500/µL (High)",
              crp: "145 mg/L (Elevated)",
              procalcitonin: "4.2 ng/mL (High)"
            },
            vitals: [
              { time: "06:00", temp: "38.9°C", bp: "142/88", hr: "102", spo2: "93%" },
              { time: "12:00", temp: "39.2°C", bp: "138/85", hr: "108", spo2: "91%" },
              { time: "18:00", temp: "38.6°C", bp: "145/90", hr: "105", spo2: "92%" }
            ],
            treatment: [
              "Polymyxin B 2.5mg/kg IV every 12 hours",
              "Tigecycline 100mg loading dose, then 50mg IV every 12 hours",
              "Supplemental oxygen therapy (4L/min)",
              "Contact isolation protocol initiated",
              "Daily wound care with silver dressing"
            ],
            notes: "Patient requires immediate isolation. High risk for septic shock. Monitor renal function closely due to Polymyxin B nephrotoxicity. Consider consultation with infectious disease specialist."
          },
          R002: {
            lab: {
              culture: "Staphylococcus aureus (MRSA)",
              sensitivity: "Sensitive to: Vancomycin, Linezolid, Daptomycin",
              wbc: "9,200/µL (Normal)",
              crp: "42 mg/L (Mild elevation)",
              procalcitonin: "0.8 ng/mL (Normal)"
            },
            vitals: [
              { time: "06:00", temp: "37.2°C", bp: "128/82", hr: "78", spo2: "97%" },
              { time: "12:00", temp: "37.4°C", bp: "125/80", hr: "80", spo2: "98%" },
              { time: "18:00", temp: "37.1°C", bp: "130/84", hr: "76", spo2: "98%" }
            ],
            treatment: [
              "Vancomycin 1g IV every 12 hours (trough level monitoring)",
              "Wound care twice daily",
              "Standard precautions maintained",
              "Physical therapy for mobility",
              "Nutritional support - high protein diet"
            ],
            notes: "Patient showing excellent response to therapy. Vital signs stable. Wound healing progressing well. May consider discharge planning within 5-7 days if trend continues."
          },
          R003: {
            lab: {
              culture: "Pseudomonas aeruginosa (Multidrug-resistant)",
              sensitivity: "Sensitive to: Colistin, Ceftazidime-avibactam",
              wbc: "7,800/µL (Normal)",
              crp: "28 mg/L (Mild elevation)",
              procalcitonin: "0.4 ng/mL (Normal)"
            },
            vitals: [
              { time: "06:00", temp: "36.8°C", bp: "118/75", hr: "72", spo2: "99%" },
              { time: "12:00", temp: "37.0°C", bp: "120/78", hr: "75", spo2: "98%" },
              { time: "18:00", temp: "36.9°C", bp: "122/76", hr: "74", spo2: "99%" }
            ],
            treatment: [
              "Ceftazidime-avibactam 2.5g IV every 8 hours",
              "Respiratory therapy - incentive spirometry",
              "Ambulation with physical therapy",
              "Monitor for superinfection",
              "Continue airborne precautions"
            ],
            notes: "Significant clinical improvement noted. Bacterial count decreasing on repeat cultures. Patient afebrile for 48 hours. Continue current antibiotic regimen for full 14-day course."
          },
          R004: {
            lab: {
              culture: "Acinetobacter baumannii (Extremely drug-resistant)",
              sensitivity: "Limited options: Colistin (intermediate), Tigecycline",
              wbc: "22,400/µL (Very High)",
              crp: "198 mg/L (Severely elevated)",
              procalcitonin: "8.7 ng/mL (Very High)"
            },
            vitals: [
              { time: "06:00", temp: "39.8°C", bp: "95/62", hr: "118", spo2: "86%" },
              { time: "12:00", temp: "40.1°C", bp: "92/58", hr: "122", spo2: "84%" },
              { time: "18:00", temp: "39.5°C", bp: "98/65", hr: "115", spo2: "87%" }
            ],
            treatment: [
              "Colistin 5 million units loading, then 2.5 million units IV every 12 hours",
              "Tigecycline 100mg loading dose, then 50mg IV every 12 hours",
              "Mechanical ventilation (SIMV mode)",
              "Vasopressor support - Norepinephrine infusion",
              "Strict isolation - Enhanced contact precautions",
              "Daily assessment for ECMO candidacy"
            ],
            notes: "CRITICAL: Patient in septic shock with acute respiratory distress syndrome (ARDS). Prognosis guarded. Family counseling completed. Multi-disciplinary team managing care including ICU, infectious disease, and pulmonology."
          }
        };

        const data = detailedReportData[report.id as keyof typeof detailedReportData];

        return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* PDF Header */}
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-700 dark:to-cyan-700 text-white p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-white mb-2">Clinical Report - {report.patientName}</h2>
                    <p className="text-teal-100 text-sm">Patient ID: {report.patientId} | Report ID: {report.id}</p>
                    <p className="text-teal-100 text-sm">Date: {report.date} | Type: {report.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setViewingReport(null)}
                      className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              </div>

              {/* PDF Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-8 bg-gray-50 dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
                  
                  {/* Hospital Letterhead */}
                  <div className="border-b-2 border-teal-600 pb-4 mb-6">
                    <h1 className="text-2xl text-teal-600 dark:text-teal-400 mb-1">Codeveda Medical Center</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Department of Infectious Disease & MDR Control</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">123 Healthcare Drive, Medical District | Tel: +91-XXXX-XXXXXX</p>
                  </div>

                  {/* Patient Information */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-gray-900 dark:text-white mb-3 border-b border-gray-300 dark:border-gray-700 pb-2">
                      Patient Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Patient Name:</p>
                        <p className="text-gray-900 dark:text-white">{report.patientName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Patient ID:</p>
                        <p className="text-gray-900 dark:text-white">{report.patientId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Report Date:</p>
                        <p className="text-gray-900 dark:text-white">{report.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Clinical Status:</p>
                        <Badge variant="outline" className={getStatusBadgeClass(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Infection Risk Assessment
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Risk Score:</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getRiskBadgeClass(report.riskScore)}>
                            {report.riskScore}/100
                          </Badge>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${report.riskScore >= 70 ? 'bg-red-500' : report.riskScore >= 40 ? 'bg-orange-500' : 'bg-green-500'}`}
                              style={{ width: `${report.riskScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Summary:</p>
                        <p className="text-sm text-gray-900 dark:text-white">{report.summary}</p>
                      </div>
                    </div>
                  </div>

                  {/* Laboratory Results */}
                  <div>
                    <h3 className="text-gray-900 dark:text-white mb-3 border-b border-gray-300 dark:border-gray-700 pb-2">
                      Laboratory Results
                    </h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Culture Results:</p>
                          <p className="text-gray-900 dark:text-white">{data.lab.culture}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">WBC Count:</p>
                          <p className="text-gray-900 dark:text-white">{data.lab.wbc}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Antibiotic Sensitivity:</p>
                        <p className="text-gray-900 dark:text-white text-sm bg-yellow-50 dark:bg-yellow-950/20 p-2 rounded">
                          {data.lab.sensitivity}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">C-Reactive Protein (CRP):</p>
                          <p className="text-gray-900 dark:text-white">{data.lab.crp}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Procalcitonin:</p>
                          <p className="text-gray-900 dark:text-white">{data.lab.procalcitonin}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vital Signs Monitoring */}
                  <div>
                    <h3 className="text-gray-900 dark:text-white mb-3 border-b border-gray-300 dark:border-gray-700 pb-2">
                      Vital Signs (Last 24 Hours)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                          <tr>
                            <th className="text-left p-2 text-gray-900 dark:text-white">Time</th>
                            <th className="text-left p-2 text-gray-900 dark:text-white">Temperature</th>
                            <th className="text-left p-2 text-gray-900 dark:text-white">Blood Pressure</th>
                            <th className="text-left p-2 text-gray-900 dark:text-white">Heart Rate</th>
                            <th className="text-left p-2 text-gray-900 dark:text-white">SpO2</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.vitals.map((vital, idx) => (
                            <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                              <td className="p-2 text-gray-900 dark:text-white">{vital.time}</td>
                              <td className="p-2 text-gray-900 dark:text-white">{vital.temp}</td>
                              <td className="p-2 text-gray-900 dark:text-white">{vital.bp} mmHg</td>
                              <td className="p-2 text-gray-900 dark:text-white">{vital.hr} bpm</td>
                              <td className="p-2 text-gray-900 dark:text-white">{vital.spo2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Current Treatment Plan */}
                  <div>
                    <h3 className="text-gray-900 dark:text-white mb-3 border-b border-gray-300 dark:border-gray-700 pb-2">
                      Current Treatment Protocol
                    </h3>
                    <ul className="space-y-2">
                      {data.treatment.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-900 dark:text-white">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Clinical Notes */}
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-gray-900 dark:text-white mb-2">Physician's Clinical Notes</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {data.notes}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="border-t-2 border-gray-300 dark:border-gray-700 pt-4 mt-8">
                    <div className="flex justify-between items-end text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Attending Physician:</p>
                        <p className="text-gray-900 dark:text-white">Dr. Rajesh Kumar, MD</p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">Infectious Disease Specialist</p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">License: MED-2024-12345</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 dark:text-gray-400 text-xs">Report Generated: {new Date().toLocaleString()}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">Verified & Authenticated</p>
                        <div className="mt-2 px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs rounded">
                          ✓ Digital Signature Applied
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confidentiality Notice */}
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs text-gray-600 dark:text-gray-400 text-center">
                    <p className="italic">
                      CONFIDENTIAL MEDICAL RECORD - This document contains privileged and confidential information. 
                      Unauthorized disclosure or distribution is prohibited under medical privacy regulations.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })()}
    </div>
  );
}
