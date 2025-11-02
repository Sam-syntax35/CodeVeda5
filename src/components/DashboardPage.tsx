'use client';

import { useState, useEffect } from 'react';
import { Bell, Settings, Activity, Users, MapPin, Map, AlertTriangle, BarChart3, Shield, LogOut, ClipboardList, Calendar, MessageSquare, FileText, Menu, X, Moon, Sun, Bot, LayoutDashboard } from 'lucide-react';
import { PlansModule } from './PlansModule';
import { CommunityModule } from './CommunityModule';
import { AIChatbot } from './AIChatbot';
import { PatientsModule } from './PatientsModule';
import { SchedulesModule } from './SchedulesModule';
import { ReportsModule } from './ReportsModule';
import { HeatMapModule } from './HeatMapModule';
import { TrackingModule } from './TrackingModule';
import { useTheme } from './ThemeProvider';
import { DashboardOverview } from './DashboardOverview';
import { FamilyDashboard } from './FamilyDashboard';
import logoImage from 'figma:asset/4d744d9dc222fec480d1bb61c0c3c5755b6f748e.png';
import { PatientDashboardOverview } from './PatientDashboardOverview';
import { PatientDashboard } from './PatientDashboard';

interface DashboardPageProps {
  userRole: string;
  onLogout: () => void;
  initialModule?: string;
}

// Mock patient data for patient dashboard
const mockPatientData = {
  id: 'PT-5624',
  name: 'John Anderson',
  age: 42,
  gender: 'Male',
  room: 'Room 305',
  ward: 'ICU Ward 3',
  phone: '+1 (555) 123-4567',
  email: 'john.anderson@email.com',
  emergencyContact: '+1 (555) 987-6543',
  medicalHistory: [
    'Hypertension (diagnosed 2019)',
    'Type 2 Diabetes (diagnosed 2020)',
    'Previous surgery: Appendectomy (2015)',
    'Allergies: Penicillin, Peanuts'
  ],
  currentDiagnosis: 'MDR Bacterial Infection - Under active treatment with combination antibiotic therapy',
  caseStatus: 'Active Treatment',
  medications: [
    { name: 'Vancomycin', dose: '1g IV', startDate: '2024-10-15', frequency: 'Every 12 hours' },
    { name: 'Linezolid', dose: '600mg', startDate: '2024-10-16', frequency: 'Every 12 hours' },
    { name: 'Metformin', dose: '500mg', startDate: '2024-01-10', frequency: 'Twice daily' },
    { name: 'Lisinopril', dose: '10mg', startDate: '2024-01-10', frequency: 'Once daily' },
    { name: 'Vitamin D3', dose: '1000 IU', startDate: '2024-10-01', frequency: 'Once daily' }
  ],
  testResults: [
    { test: 'Blood Culture', result: 'MDR Bacteria Detected', date: '2024-10-28', status: 'Critical' },
    { test: 'Complete Blood Count', result: 'WBC: 14,500/μL', date: '2024-10-29', status: 'Abnormal' },
    { test: 'Chest X-Ray', result: 'Clear', date: '2024-10-27', status: 'Normal' }
  ],
  assignedStaff: [
    { name: 'Dr. Sarah Mitchell', role: 'Infectious Disease Specialist' },
    { name: 'Nurse Emily Parker', role: 'Primary Care Nurse' }
  ],
  isolationStatus: 'Contact Precautions',
  isolationType: 'Isolation Room',
  vitals: {
    heartRate: '78 bpm',
    bloodPressure: '128/82 mmHg',
    temperature: '37.2°C',
    oxygenSaturation: '97%',
    lastUpdated: '2 hours ago'
  },
  diet: {
    type: 'Diabetic Diet',
    restrictions: ['Low sodium', 'No raw foods (infection control)', 'Sugar-controlled meals'],
    mealPlan: [
      {
        meal: 'Breakfast',
        time: '8:00 AM',
        items: ['Steel-cut oatmeal with berries', 'Scrambled eggs', 'Whole wheat toast', 'Unsweetened tea']
      },
      {
        meal: 'Lunch',
        time: '12:30 PM',
        items: ['Grilled chicken breast', 'Steamed broccoli', 'Brown rice', 'Fresh fruit salad']
      },
      {
        meal: 'Dinner',
        time: '6:00 PM',
        items: ['Baked salmon', 'Quinoa', 'Mixed green salad', 'Greek yogurt']
      }
    ]
  }
};

export function DashboardPage({ userRole, onLogout, initialModule = 'patients' }: DashboardPageProps) {
  // If user role is family, show the Family Dashboard
  if (userRole === 'family') {
    return <FamilyDashboard onLogout={onLogout} />;
  }

  // If user role is patient, show patient-specific interface
  const [patientView, setPatientView] = useState<'overview' | 'detail'>('overview');
  const [patientSection, setPatientSection] = useState<string>('overview');

  if (userRole === 'patient') {
    const handleCardClick = (section: string) => {
      // Map card IDs to patient dashboard sections
      const sectionMap: { [key: string]: string } = {
        'medical-history': 'overview',
        'tracking': 'tracking',
        'medicines': 'medicines',
        'diet': 'diet',
        'schedules': 'schedules',
        'community': 'community'
      };
      
      setPatientSection(sectionMap[section] || 'overview');
      setPatientView('detail');
    };

    const handleBackToOverview = () => {
      setPatientView('overview');
    };

    if (patientView === 'overview') {
      return <PatientDashboardOverview onLogout={onLogout} onCardClick={handleCardClick} />;
    } else {
      // Show detailed patient dashboard with the selected section
      return <PatientDashboard patient={mockPatientData} onBack={handleBackToOverview} initialSection={patientSection} />;
    }
  }
  const [activeModule, setActiveModule] = useState(initialModule);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (initialModule) {
      setActiveModule(initialModule);
    }
  }, [initialModule]);

  const getRoleInfo = () => {
    switch (userRole) {
      case 'doctor':
        return {
          title: 'Infection Control Officer',
          id: 'ICO-2847',
          initials: 'IC'
        };
      case 'patient':
        return {
          title: 'Patient Portal',
          id: 'PT-5624',
          initials: 'PT'
        };
      case 'family':
        return {
          title: 'Family Member',
          id: 'FM-8931',
          initials: 'FM'
        };
      default:
        return {
          title: 'User',
          id: 'USR-0000',
          initials: 'U'
        };
    }
  };

  const roleInfo = getRoleInfo();

  const menuItems = [
    {
      id: 'patients',
      name: 'Patients',
      icon: Users,
      description: 'Patient management & records',
      badge: '24',
      features: [
        'Patient list (search, filters)',
        'Patient profile view',
        'Infection status badge (low/medium/high risk)',
        'Previous visit history',
        'Current medication + treatment plan',
        'Add medical notes / prescriptions',
        'File upload (lab pdf, image)'
      ]
    },
    {
      id: 'tracking',
      name: 'Tracking',
      icon: MapPin,
      description: 'Real-time location tracking',
      badge: '12 New',
      features: [
        'Live IoT tracking map',
        'Timeline view of movements',
        'Contact history (who met whom)',
        'Risk score auto calculation',
        'Flag risky contact button'
      ]
    },
    {
      id: 'heatmap',
      name: 'Heat Map',
      icon: Map,
      description: 'Infection temperature map',
      badge: '3 Critical',
      features: [
        'Visual infection risk by area',
        'Color-coded temperature zones',
        'Patient & bacteria distribution',
        'Staff movement tracking',
        'Cleaning schedule status',
        'AI-powered risk predictions'
      ]
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: FileText,
      description: 'Clinical & infection reports',
      badge: '3 New',
      features: [
        'Lab test reports (CBC, culture, PCR)',
        'Infection risk report (AI generated)',
        'Antibiotic sensitivity report',
        'Download PDF report',
        'Graphs: recovery progress, vital trends'
      ]
    },
    {
      id: 'plans',
      name: 'Plans',
      icon: ClipboardList,
      description: 'Treatment planning',
      badge: '8 Active',
      features: [
        'Create new treatment plan',
        'Edit medication dosage',
        'Add observation instructions',
        'Set target values (temp, BP, etc.)',
        'Plan effectiveness tracking'
      ]
    },
    {
      id: 'schedule',
      name: 'Schedule',
      icon: Calendar,
      description: 'Time management',
      badge: 'Today: 6',
      features: [
        'Doctor\'s daily appointment list',
        'Patient visit schedule',
        'Test schedule (blood test timing)',
        'Discharge planning calendar',
        'Automated reminders'
      ]
    },
    {
      id: 'community',
      name: 'Community',
      icon: MessageSquare,
      description: 'Medical collaboration',
      badge: '2 Unread',
      features: [
        'Chat with other doctors + nurses',
        'Share medical cases',
        'Discuss antibiotic resistance cases',
        'Ask senior expert suggestions',
        'Post updates inside hospital network'
      ]
    }
  ];

  const activeMenuItem = menuItems.find(item => item.id === activeModule);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-slate-900 dark:bg-slate-950 text-white transition-all duration-300 flex flex-col border-r border-slate-800 dark:border-slate-800 ${sidebarOpen ? "w-64" : "w-20"}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800 dark:border-slate-800">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <button 
                onClick={onLogout}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity w-full text-left"
                title="Back to home"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-teal-400">
                  <img src={logoImage} alt="Codeveda Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-white">codeveda</h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Doctor Cockpit</p>
                </div>
              </button>
            ) : (
              <button 
                onClick={onLogout}
                className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-teal-400 mx-auto hover:opacity-80 transition-opacity"
                title="Back to home"
              >
                <img src={logoImage} alt="Codeveda Logo" className="w-full h-full object-cover" />
              </button>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {/* Overview Button */}
          <button
            onClick={() => setActiveModule('overview')}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-all relative ${
              activeModule === 'overview'
                ? "bg-teal-600 dark:bg-teal-700 text-white" 
                : "text-slate-300 dark:text-slate-400 hover:bg-slate-800 dark:hover:bg-slate-900 hover:text-white"
            } mb-2`}
          >
            {activeModule === 'overview' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400"></div>
            )}
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {sidebarOpen && (
              <>
                <div className="flex-1 text-left">
                  <div className="text-sm">Overview</div>
                </div>
              </>
            )}
          </button>

          <div className={sidebarOpen ? "px-4 py-2 text-xs text-slate-500 dark:text-slate-600" : "hidden"}>
            MODULES
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full px-4 py-3 flex items-center gap-3 transition-all relative ${
                  isActive 
                    ? "bg-teal-600 dark:bg-teal-700 text-white" 
                    : "text-slate-300 dark:text-slate-400 hover:bg-slate-800 dark:hover:bg-slate-900 hover:text-white"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400"></div>
                )}
                <Icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && (
                  <>
                    <div className="flex-1 text-left">
                      <div>{item.name}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">{item.description}</div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {item.badge}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 dark:border-slate-800">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-slate-300 dark:text-slate-400 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-900 rounded-lg transition-all"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-10 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Page Title */}
              <div>
                <h1 className="text-slate-900 dark:text-slate-100">{activeMenuItem?.name}</h1>
                <p className="text-slate-500 dark:text-slate-400">{activeMenuItem?.description}</p>
              </div>

              {/* Right Side Icons + Profile */}
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
                  title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                >
                  {theme === 'light' ? (
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

                {/* User Profile Card */}
                <div className="flex items-center gap-3 ml-3 pl-3 border-l border-slate-200 dark:border-slate-700">
                  <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-teal-600 dark:bg-teal-700 text-white">
                      {roleInfo.initials}
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-slate-900 dark:text-slate-100">{roleInfo.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">ID: {roleInfo.id}</p>
                  </div>
                </div>

                {/* Logout */}
                <button onClick={onLogout} className="inline-flex items-center justify-center w-10 h-10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Conditional Rendering based on active module */}
          {activeModule === 'overview' ? (
            <DashboardOverview onModuleSelect={setActiveModule} />
          ) : activeModule === 'patients' ? (
            <PatientsModule />
          ) : activeModule === 'tracking' ? (
            <TrackingModule />
          ) : activeModule === 'plans' ? (
            <PlansModule />
          ) : activeModule === 'community' ? (
            <CommunityModule />
          ) : activeModule === 'schedule' ? (
            <SchedulesModule />
          ) : activeModule === 'reports' ? (
            <ReportsModule />
          ) : activeModule === 'heatmap' ? (
            <HeatMapModule />
          ) : (
            <>
              {/* System Status Alert */}
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 animate-pulse"></div>
                  <div>
                    <h3 className="text-blue-900 dark:text-blue-100 mb-1">System Status: Active Monitoring</h3>
                    <p className="text-blue-700 dark:text-blue-300">All tracking systems operational. Last sync: 2 minutes ago</p>
                  </div>
                </div>
              </div>

              {/* Module Content */}
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="p-6">
                  <h3 className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                    {activeMenuItem && <activeMenuItem.icon className="w-6 h-6 text-teal-600 dark:text-teal-500" />}
                    {activeMenuItem?.name} Module
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1.5">
                    Complete {activeMenuItem?.name.toLowerCase()} management for infection control
                  </p>
                </div>
                <div className="p-6 pt-0">
                  {/* Feature List */}
                  <div className="space-y-4">
                    <h3 className="text-slate-700 dark:text-slate-300 mb-3">Available Features:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeMenuItem?.features.map((feature, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <div className="w-2 h-2 bg-teal-500 dark:bg-teal-600 rounded-full mt-2 shrink-0"></div>
                          <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex gap-3">
                      <button className="inline-flex items-center justify-center rounded-lg transition-all duration-200 px-4 py-2 bg-teal-600 dark:bg-teal-700 text-white hover:bg-teal-700 dark:hover:bg-teal-600">
                        Open {activeMenuItem?.name}
                      </button>
                      <button className="inline-flex items-center justify-center rounded-lg transition-all duration-200 px-4 py-2 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                        View Documentation
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="p-6 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 mb-1">Total Records</p>
                        <p className="text-3xl text-slate-900 dark:text-slate-100">248</p>
                      </div>
                      <Activity className="w-8 h-8 text-teal-600 dark:text-teal-500" />
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="p-6 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 mb-1">High Priority</p>
                        <p className="text-3xl text-red-600 dark:text-red-500">12</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="p-6 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 mb-1">Active Today</p>
                        <p className="text-3xl text-green-600 dark:text-green-500">86</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm">© 2025 codeveda. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Clinical Safety Compliant
              </span>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>

      {/* AI Chatbot */}
      <AIChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
}
