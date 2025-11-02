import { useState } from 'react';
import { Shield, Stethoscope, Users, Heart, MessageCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { DashboardPage } from './components/DashboardPage';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Label } from './components/ui/label';
import { ThemeProvider } from './components/ThemeProvider';
import logoImage from 'figma:asset/4d744d9dc222fec480d1bb61c0c3c5755b6f748e.png';

function AppContent() {
  const [currentView, setCurrentView] = useState<'homepage' | 'login' | 'role-selection' | 'dashboard'>('homepage');
  const [userRole, setUserRole] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleRoleSelect = () => {
    if (selectedRole) {
      setUserRole(selectedRole);
      setCurrentView('dashboard');
    }
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleLogout = () => {
    setUserRole('');
    setSelectedRole('');
    setCurrentView('homepage');
  };

  const handleGetStarted = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = () => {
    setCurrentView('role-selection');
  };

  if (currentView === 'homepage') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentView === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentView === 'dashboard') {
    return <DashboardPage userRole={userRole} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Logo */}
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden bg-white border-4 border-teal-400">
                    <img src={logoImage} alt="Codeveda Logo" className="w-full h-full object-cover" />
                  </div>
                  <h1 className="text-7xl lg:text-8xl text-white tracking-tight">
                    codeveda
                  </h1>
                </div>
                <p className="text-teal-300 text-xl ml-24 mt-2">
                  MDR Infection Control System
                </p>
              </div>

              {/* Hero Text */}
              <h2 className="text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Healthcare that comes{' '}
                <span className="text-teal-400">directly</span> to your{' '}
                <span className="text-emerald-400">members</span>
              </h2>

              <p className="text-slate-300 text-lg mb-10 max-w-xl">
                AI-powered infection control platform combining real-time tracking, contact tracing, exposure zone monitoring, and instant health kit delivery in one unified solution.
              </p>

              {/* Role Selection */}
              <div className="mb-12 max-w-md">
                <Label htmlFor="role-select" className="text-white text-lg mb-3 block">
                  What brings you here?
                </Label>
                <div className="flex gap-3">
                  <Select value={selectedRole} onValueChange={handleRoleChange}>
                    <SelectTrigger 
                      id="role-select"
                      className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-800/70 transition-all backdrop-blur-sm h-12"
                    >
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="doctor" className="focus:bg-slate-700 focus:text-white cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-teal-400" />
                          <span>Doctor</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="patient" className="focus:bg-slate-700 focus:text-white cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-teal-400" />
                          <span>Patient</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="family" className="focus:bg-slate-700 focus:text-white cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-emerald-400" />
                          <span>Family</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleRoleSelect}
                    disabled={!selectedRole}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-8 h-12 shadow-lg shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl text-white mb-1">30min</div>
                  <div className="text-slate-400">Response Time</div>
                </div>
                <div>
                  <div className="text-3xl text-white mb-1">24/7</div>
                  <div className="text-slate-400">AI Monitoring</div>
                </div>
                <div>
                  <div className="text-3xl text-white mb-1">100%</div>
                  <div className="text-slate-400">Secure</div>
                </div>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main Image Card */}
                <Card className="overflow-hidden bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <div className="p-4 bg-gradient-to-r from-teal-900/50 to-emerald-900/50">
                    <div className="flex items-center gap-2 text-teal-400 mb-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Live Tracking Active</span>
                    </div>
                  </div>
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RldGhvc2NvcGUlMjBwaWxsc3xlbnwxfHx8fDE3NjE5MzkxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Medical supplies"
                    className="w-full h-64 object-cover"
                  />
                </Card>

                {/* Floating Card - AI Powered */}
                <Card className="absolute -bottom-8 -right-8 w-64 bg-gradient-to-br from-teal-600 to-teal-700 border-0 shadow-2xl shadow-teal-500/30">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white">AI Powered</div>
                        <div className="text-teal-100 text-sm">Smart Detection</div>
                      </div>
                    </div>
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1758691461957-13aff0c37c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGhlYWx0aGNhcmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTk3MDk3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Healthcare technology"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </Card>

                {/* Floating OCR Card */}
                <Card className="absolute -top-6 -left-6 bg-slate-800/90 border-slate-700 backdrop-blur-sm shadow-xl">
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-white">System Ready</div>
                      <div className="text-slate-400 text-sm">Scanning active</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-teal-500 hover:bg-teal-600 rounded-full shadow-lg shadow-teal-500/30 flex items-center justify-center text-white transition-all hover:scale-110">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
