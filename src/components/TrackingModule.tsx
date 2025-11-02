'use client';

import { useState, useEffect } from 'react';
import { Clock, ZoomIn, ZoomOut, Droplet, AlertCircle, Users, Activity, TrendingUp, Shield, MapPin } from 'lucide-react';

interface ZoneData {
  id: string;
  name: string;
  risk: number;
  cases: number;
  hasAlert: boolean;
  floor: number;
  infected: number;
  staffVisits: number;
  lastCleaned: string;
  bacteriaType: string;
}

const mockZones: ZoneData[] = [
  {
    id: 'icu-a',
    name: 'ICU Ward A',
    risk: 90,
    cases: 4,
    hasAlert: true,
    floor: 3,
    infected: 4,
    staffVisits: 45,
    lastCleaned: '45 mins ago',
    bacteriaType: 'XDR'
  },
  {
    id: 'general-b',
    name: 'General Ward B',
    risk: 40,
    cases: 1,
    hasAlert: false,
    floor: 3,
    infected: 1,
    staffVisits: 28,
    lastCleaned: '2 hours ago',
    bacteriaType: 'Normal'
  },
  {
    id: 'main-lobby',
    name: 'Main Lobby',
    risk: 60,
    cases: 2,
    hasAlert: false,
    floor: 1,
    infected: 0,
    staffVisits: 95,
    lastCleaned: '3 hours ago',
    bacteriaType: 'N/A'
  },
  {
    id: 'pediatric',
    name: 'Pediatric Ward',
    risk: 15,
    cases: 0,
    hasAlert: false,
    floor: 2,
    infected: 0,
    staffVisits: 18,
    lastCleaned: '1 hour ago',
    bacteriaType: 'N/A'
  },
  {
    id: 'emergency',
    name: 'Emergency Room',
    risk: 75,
    cases: 3,
    hasAlert: false,
    floor: 1,
    infected: 3,
    staffVisits: 68,
    lastCleaned: '30 mins ago',
    bacteriaType: 'MDR'
  },
  {
    id: 'cafeteria',
    name: 'Staff Cafeteria',
    risk: 35,
    cases: 1,
    hasAlert: false,
    floor: 1,
    infected: 0,
    staffVisits: 42,
    lastCleaned: '30 mins ago',
    bacteriaType: 'N/A'
  },
  {
    id: 'isolation',
    name: 'Isolation Unit',
    risk: 95,
    cases: 6,
    hasAlert: true,
    floor: 4,
    infected: 6,
    staffVisits: 24,
    lastCleaned: '15 mins ago',
    bacteriaType: 'XDR'
  },
  {
    id: 'radiology',
    name: 'Radiology Dept',
    risk: 20,
    cases: 0,
    hasAlert: false,
    floor: 2,
    infected: 0,
    staffVisits: 12,
    lastCleaned: '1 hour ago',
    bacteriaType: 'N/A'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    risk: 25,
    cases: 0,
    hasAlert: false,
    floor: 1,
    infected: 0,
    staffVisits: 15,
    lastCleaned: '1 hour ago',
    bacteriaType: 'N/A'
  }
];

export function TrackingModule() {
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'critical';
    if (risk >= 60) return 'high';
    if (risk >= 30) return 'moderate';
    return 'safe';
  };

  const getRiskGradient = (risk: number) => {
    if (risk >= 80) return 'from-red-950/60 via-red-900/40 to-red-950/60'; // Critical
    if (risk >= 60) return 'from-orange-950/60 via-orange-900/40 to-orange-950/60'; // High
    if (risk >= 30) return 'from-yellow-950/60 via-yellow-900/40 to-yellow-950/60'; // Moderate
    return 'from-green-950/60 via-green-900/40 to-green-950/60'; // Safe
  };

  const getRiskBorderColor = (risk: number) => {
    if (risk >= 80) return 'border-red-600';
    if (risk >= 60) return 'border-orange-500';
    if (risk >= 30) return 'border-yellow-500';
    return 'border-green-500';
  };

  const getRiskTextColor = (risk: number) => {
    if (risk >= 80) return 'text-red-500';
    if (risk >= 60) return 'text-orange-400';
    if (risk >= 30) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="p-8 pb-6">
        <h1 className="text-4xl text-white mb-2">Infection Heat Map</h1>
        <p className="text-slate-400 text-lg">Real-time visualization of infection risk levels across hospital zones</p>
      </div>

      {/* Controls Bar */}
      <div className="px-8 pb-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
          <div className="flex items-center justify-between">
            {/* Last Updated */}
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-5 h-5" />
              <span>Last updated: {currentTime}</span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`px-6 py-2 rounded-lg transition-all ${
                  showLabels 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Labels
              </button>
              <button 
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                className="w-10 h-10 flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
                className="w-10 h-10 flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Legend */}
          {showLabels && (
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-600"></div>
                <span className="text-slate-300">Critical ({'>'}80)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-500"></div>
                <span className="text-slate-300">High (60-80)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-500"></div>
                <span className="text-slate-300">Moderate (30-60)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <span className="text-slate-300">Safe ({'<'}30)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="flex gap-6">
          {/* Zone Grid */}
          <div className="flex-1">
            <div 
              className="grid grid-cols-3 gap-4 transition-transform"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
            >
              {mockZones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`relative aspect-square rounded-xl border-2 ${getRiskBorderColor(zone.risk)} 
                    bg-gradient-to-br ${getRiskGradient(zone.risk)} 
                    hover:scale-105 transition-all duration-300 cursor-pointer
                    ${selectedZone?.id === zone.id ? 'ring-4 ring-blue-500/50 scale-105' : ''}
                  `}
                >
                  {/* Alert Badge */}
                  {zone.hasAlert && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border-2 border-slate-900 animate-pulse">
                      <span className="text-white text-xs">!</span>
                    </div>
                  )}

                  {/* Zone Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-white text-lg mb-2">{zone.name}</h3>
                    <p className={`text-sm mb-1 ${getRiskTextColor(zone.risk)}`}>
                      Risk: {zone.risk}%
                    </p>
                    <p className="text-slate-400 text-xs">
                      {zone.cases} {zone.cases === 1 ? 'case' : 'cases'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Side Panel */}
          <div className="w-80 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            {selectedZone ? (
              <div className="space-y-6">
                {/* Zone Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl text-white">{selectedZone.name}</h3>
                    <button
                      onClick={() => setSelectedZone(null)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      selectedZone.risk >= 80 ? 'bg-red-600' :
                      selectedZone.risk >= 60 ? 'bg-orange-500' :
                      selectedZone.risk >= 30 ? 'bg-yellow-500' :
                      'bg-green-500'
                    } text-white`}>
                      {selectedZone.risk >= 80 ? 'Critical' :
                       selectedZone.risk >= 60 ? 'High Risk' :
                       selectedZone.risk >= 30 ? 'Moderate' :
                       'Safe'}
                    </span>
                    <span className="text-slate-400 text-sm">Floor {selectedZone.floor}</span>
                  </div>
                </div>

                {/* Risk Score Circle */}
                <div className="flex justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        className="text-slate-700"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        className={getRiskTextColor(selectedZone.risk)}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${selectedZone.risk * 3.51} 351`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-3xl ${getRiskTextColor(selectedZone.risk)}`}>
                        {selectedZone.risk}%
                      </span>
                      <span className="text-slate-400 text-xs">Risk Level</span>
                    </div>
                  </div>
                </div>

                {/* Zone Stats */}
                <div className="space-y-3">
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-red-500" />
                      <span className="text-slate-400 text-sm">Infected Patients</span>
                    </div>
                    <p className="text-2xl text-white">{selectedZone.infected}</p>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span className="text-slate-400 text-sm">Staff Visits/Hour</span>
                    </div>
                    <p className="text-2xl text-white">{selectedZone.staffVisits}</p>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-slate-400 text-sm">Last Cleaned</span>
                    </div>
                    <p className="text-white">{selectedZone.lastCleaned}</p>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span className="text-slate-400 text-sm">Bacteria Type</span>
                    </div>
                    <p className={`text-white ${
                      selectedZone.bacteriaType === 'XDR' ? 'text-red-500' :
                      selectedZone.bacteriaType === 'MDR' ? 'text-orange-500' :
                      ''
                    }`}>
                      {selectedZone.bacteriaType}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    View Full Details
                  </button>
                  <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    Request Deep Cleaning
                  </button>
                  <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                    Download Report
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <Droplet className="w-20 h-20 text-slate-600 mb-6" />
                <h3 className="text-xl text-slate-400 mb-3">Select a zone</h3>
                <p className="text-slate-500">
                  Click on any zone to view details and take actions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="px-8 pb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">Critical Zones</p>
              <p className="text-3xl text-red-500">{mockZones.filter(z => z.risk >= 80).length}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">High Risk Zones</p>
              <p className="text-3xl text-orange-500">{mockZones.filter(z => z.risk >= 60 && z.risk < 80).length}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">Total Cases</p>
              <p className="text-3xl text-white">{mockZones.reduce((sum, z) => sum + z.cases, 0)}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">Safe Zones</p>
              <p className="text-3xl text-green-500">{mockZones.filter(z => z.risk < 30).length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
