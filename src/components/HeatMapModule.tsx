'use client';

import { useState } from 'react';
import { Activity, AlertTriangle, Users, Wind, MapPin, Info, TrendingUp, TrendingDown, Clock, Thermometer } from 'lucide-react';

interface HospitalArea {
  id: string;
  name: string;
  floor: number;
  x: number;
  y: number;
  width: number;
  height: number;
  riskScore: number; // 0-100
  infectedPatients: number;
  bacteriaTypes: {
    normal: number;
    mdr: number;
    xdr: number;
  };
  staffMovement: number;
  lastCleaned: string;
  trend: 'up' | 'down' | 'stable';
}

const mockAreas: HospitalArea[] = [
  {
    id: 'icu-1',
    name: 'ICU Ward 1',
    floor: 3,
    x: 50,
    y: 50,
    width: 180,
    height: 120,
    riskScore: 85,
    infectedPatients: 4,
    bacteriaTypes: { normal: 1, mdr: 2, xdr: 1 },
    staffMovement: 45,
    lastCleaned: '45 mins ago',
    trend: 'up'
  },
  {
    id: 'ward-a',
    name: 'General Ward A',
    floor: 3,
    x: 250,
    y: 50,
    width: 200,
    height: 120,
    riskScore: 35,
    infectedPatients: 2,
    bacteriaTypes: { normal: 2, mdr: 0, xdr: 0 },
    staffMovement: 28,
    lastCleaned: '2 hours ago',
    trend: 'stable'
  },
  {
    id: 'ward-b',
    name: 'General Ward B',
    floor: 3,
    x: 470,
    y: 50,
    width: 200,
    height: 120,
    riskScore: 42,
    infectedPatients: 3,
    bacteriaTypes: { normal: 1, mdr: 2, xdr: 0 },
    staffMovement: 32,
    lastCleaned: '1 hour ago',
    trend: 'down'
  },
  {
    id: 'er',
    name: 'Emergency Room',
    floor: 3,
    x: 50,
    y: 190,
    width: 150,
    height: 140,
    riskScore: 72,
    infectedPatients: 3,
    bacteriaTypes: { normal: 0, mdr: 2, xdr: 1 },
    staffMovement: 68,
    lastCleaned: '30 mins ago',
    trend: 'up'
  },
  {
    id: 'isolation',
    name: 'Isolation Unit',
    floor: 3,
    x: 220,
    y: 190,
    width: 180,
    height: 140,
    riskScore: 95,
    infectedPatients: 6,
    bacteriaTypes: { normal: 0, mdr: 3, xdr: 3 },
    staffMovement: 24,
    lastCleaned: '15 mins ago',
    trend: 'stable'
  },
  {
    id: 'corridor-1',
    name: 'Main Corridor',
    floor: 3,
    x: 420,
    y: 190,
    width: 250,
    height: 60,
    riskScore: 55,
    infectedPatients: 0,
    bacteriaTypes: { normal: 0, mdr: 0, xdr: 0 },
    staffMovement: 95,
    lastCleaned: '3 hours ago',
    trend: 'up'
  },
  {
    id: 'radiology',
    name: 'Radiology Dept',
    floor: 3,
    x: 420,
    y: 270,
    width: 120,
    height: 60,
    riskScore: 18,
    infectedPatients: 0,
    bacteriaTypes: { normal: 0, mdr: 0, xdr: 0 },
    staffMovement: 12,
    lastCleaned: '1 hour ago',
    trend: 'stable'
  },
  {
    id: 'lab',
    name: 'Pathology Lab',
    floor: 3,
    x: 560,
    y: 270,
    width: 110,
    height: 60,
    riskScore: 28,
    infectedPatients: 0,
    bacteriaTypes: { normal: 0, mdr: 0, xdr: 0 },
    staffMovement: 18,
    lastCleaned: '45 mins ago',
    trend: 'stable'
  },
  {
    id: 'cafeteria',
    name: 'Staff Cafeteria',
    floor: 3,
    x: 50,
    y: 350,
    width: 160,
    height: 80,
    riskScore: 12,
    infectedPatients: 0,
    bacteriaTypes: { normal: 0, mdr: 0, xdr: 0 },
    staffMovement: 42,
    lastCleaned: '30 mins ago',
    trend: 'down'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    floor: 3,
    x: 230,
    y: 350,
    width: 130,
    height: 80,
    riskScore: 8,
    infectedPatients: 0,
    bacteriaTypes: { normal: 0, mdr: 0, xdr: 0 },
    staffMovement: 15,
    lastCleaned: '1 hour ago',
    trend: 'stable'
  },
  {
    id: 'waiting',
    name: 'Waiting Area',
    floor: 3,
    x: 380,
    y: 350,
    width: 170,
    height: 80,
    riskScore: 38,
    infectedPatients: 0,
    bacteriaTypes: { normal: 0, mdr: 0, xdr: 0 },
    staffMovement: 86,
    lastCleaned: '4 hours ago',
    trend: 'up'
  },
  {
    id: 'storage',
    name: 'Storage',
    floor: 3,
    x: 570,
    y: 350,
    width: 100,
    height: 80,
    riskScore: 5,
    infectedPatients: 0,
    bacteriaTypes: { normal: 0, mdr: 0, xdr: 0 },
    staffMovement: 8,
    lastCleaned: '6 hours ago',
    trend: 'stable'
  }
];

export function HeatMapModule() {
  const [selectedArea, setSelectedArea] = useState<HospitalArea | null>(null);
  const [selectedFloor, setSelectedFloor] = useState(3);
  const [showLegend, setShowLegend] = useState(true);

  const getRiskColor = (score: number): string => {
    if (score >= 80) return 'bg-red-600 dark:bg-red-700'; // Critical
    if (score >= 60) return 'bg-orange-500 dark:bg-orange-600'; // High
    if (score >= 40) return 'bg-yellow-500 dark:bg-yellow-600'; // Medium
    if (score >= 20) return 'bg-lime-500 dark:bg-lime-600'; // Low
    return 'bg-green-500 dark:bg-green-600'; // Safe
  };

  const getRiskLabel = (score: number): string => {
    if (score >= 80) return 'Critical Risk';
    if (score >= 60) return 'High Risk';
    if (score >= 40) return 'Medium Risk';
    if (score >= 20) return 'Low Risk';
    return 'Safe';
  };

  const getRiskTextColor = (score: number): string => {
    if (score >= 80) return 'text-red-600 dark:text-red-400';
    if (score >= 60) return 'text-orange-600 dark:text-orange-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 20) return 'text-lime-600 dark:text-lime-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getOpacity = (score: number): number => {
    // Higher risk = more opaque
    return 0.3 + (score / 100) * 0.6; // Range from 0.3 to 0.9
  };

  const filteredAreas = mockAreas.filter(area => area.floor === selectedFloor);

  const overallStats = {
    criticalAreas: mockAreas.filter(a => a.riskScore >= 80).length,
    highRiskAreas: mockAreas.filter(a => a.riskScore >= 60 && a.riskScore < 80).length,
    totalInfected: mockAreas.reduce((sum, a) => sum + a.infectedPatients, 0),
    avgRiskScore: Math.round(mockAreas.reduce((sum, a) => sum + a.riskScore, 0) / mockAreas.length)
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 mb-1">Critical Areas</p>
              <p className="text-3xl text-red-600 dark:text-red-500">{overallStats.criticalAreas}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 mb-1">High Risk Areas</p>
              <p className="text-3xl text-orange-600 dark:text-orange-500">{overallStats.highRiskAreas}</p>
            </div>
            <Activity className="w-8 h-8 text-orange-600 dark:text-orange-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 mb-1">Total Infected</p>
              <p className="text-3xl text-blue-600 dark:text-blue-500">{overallStats.totalInfected}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 mb-1">Avg Risk Score</p>
              <p className="text-3xl text-slate-900 dark:text-slate-100">{overallStats.avgRiskScore}</p>
            </div>
            <Thermometer className="w-8 h-8 text-teal-600 dark:text-teal-500" />
          </div>
        </div>
      </div>

      {/* Main Heat Map Container */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Header with Floor Selection */}
        <div className="border-b border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-500" />
                Infection Temperature Map
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time infection risk visualization by hospital area</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowLegend(!showLegend)}
                className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {showLegend ? 'Hide' : 'Show'} Legend
              </button>
              
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                {[1, 2, 3, 4].map(floor => (
                  <button
                    key={floor}
                    onClick={() => setSelectedFloor(floor)}
                    className={`px-3 py-1.5 text-sm rounded transition-colors ${
                      selectedFloor === floor
                        ? 'bg-teal-600 dark:bg-teal-700 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Floor {floor}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="border-b border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-800">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Risk Levels:</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">Safe (0-19)</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-lime-500"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">Low (20-39)</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-500"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">Medium (40-59)</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-500"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">High (60-79)</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-600"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">Critical (80-100)</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Floor Plan */}
        <div className="p-6">
          <div className="bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden relative" style={{ height: '500px' }}>
            {/* Floor Plan SVG */}
            <svg viewBox="0 0 720 480" className="w-full h-full">
              {/* Background Grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-800" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="720" height="480" fill="url(#grid)" />

              {/* Hospital Areas */}
              {filteredAreas.map(area => (
                <g key={area.id}>
                  {/* Area Rectangle with Heat Map Color */}
                  <rect
                    x={area.x}
                    y={area.y}
                    width={area.width}
                    height={area.height}
                    className={`${getRiskColor(area.riskScore)} cursor-pointer transition-all duration-300 ${
                      selectedArea?.id === area.id ? 'stroke-slate-900 dark:stroke-white' : 'stroke-slate-400 dark:stroke-slate-600'
                    }`}
                    strokeWidth={selectedArea?.id === area.id ? '3' : '2'}
                    opacity={getOpacity(area.riskScore)}
                    onClick={() => setSelectedArea(area)}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget;
                      rect.style.strokeWidth = '3';
                    }}
                    onMouseLeave={(e) => {
                      const rect = e.currentTarget;
                      if (selectedArea?.id !== area.id) {
                        rect.style.strokeWidth = '2';
                      }
                    }}
                  />

                  {/* Area Label */}
                  <text
                    x={area.x + area.width / 2}
                    y={area.y + area.height / 2 - 10}
                    textAnchor="middle"
                    className="text-xs fill-slate-900 dark:fill-white pointer-events-none"
                    style={{ fontWeight: 600 }}
                  >
                    {area.name}
                  </text>

                  {/* Risk Score Badge */}
                  <text
                    x={area.x + area.width / 2}
                    y={area.y + area.height / 2 + 10}
                    textAnchor="middle"
                    className="text-sm fill-slate-900 dark:fill-white pointer-events-none"
                    style={{ fontWeight: 700 }}
                  >
                    {area.riskScore}
                  </text>

                  {/* Trend Indicator */}
                  {area.trend === 'up' && (
                    <path
                      d={`M ${area.x + area.width - 15} ${area.y + 15} l 5 -5 l 5 5`}
                      stroke="currentColor"
                      className="text-red-600 dark:text-red-500 pointer-events-none"
                      strokeWidth="2"
                      fill="none"
                    />
                  )}
                  {area.trend === 'down' && (
                    <path
                      d={`M ${area.x + area.width - 15} ${area.y + 10} l 5 5 l 5 -5`}
                      stroke="currentColor"
                      className="text-green-600 dark:text-green-500 pointer-events-none"
                      strokeWidth="2"
                      fill="none"
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Selected Area Details */}
        {selectedArea && (
          <div className="border-t border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  {selectedArea.name}
                  <span className={`px-2 py-0.5 text-xs rounded ${getRiskColor(selectedArea.riskScore)} text-white`}>
                    {getRiskLabel(selectedArea.riskScore)}
                  </span>
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Floor {selectedArea.floor} • Risk Score: {selectedArea.riskScore}/100</p>
              </div>
              
              <button
                onClick={() => setSelectedArea(null)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Infected Patients */}
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-red-600 dark:text-red-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Infected Patients</span>
                </div>
                <p className="text-2xl text-slate-900 dark:text-slate-100">{selectedArea.infectedPatients}</p>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <div>Normal: {selectedArea.bacteriaTypes.normal}</div>
                  <div className="text-orange-600 dark:text-orange-500">MDR: {selectedArea.bacteriaTypes.mdr}</div>
                  <div className="text-red-600 dark:text-red-500">XDR: {selectedArea.bacteriaTypes.xdr}</div>
                </div>
              </div>

              {/* Staff Movement */}
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Staff Movement</span>
                </div>
                <p className="text-2xl text-slate-900 dark:text-slate-100">{selectedArea.staffMovement}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">visits/hour</p>
              </div>

              {/* Last Cleaned */}
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-green-600 dark:text-green-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Last Cleaned</span>
                </div>
                <p className="text-slate-900 dark:text-slate-100">{selectedArea.lastCleaned}</p>
              </div>

              {/* Trend */}
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4 text-purple-600 dark:text-purple-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Trend</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedArea.trend === 'up' && (
                    <>
                      <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-500" />
                      <span className="text-red-600 dark:text-red-500">Increasing</span>
                    </>
                  )}
                  {selectedArea.trend === 'down' && (
                    <>
                      <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-500" />
                      <span className="text-green-600 dark:text-green-500">Decreasing</span>
                    </>
                  )}
                  {selectedArea.trend === 'stable' && (
                    <>
                      <div className="w-5 h-0.5 bg-slate-400"></div>
                      <span className="text-slate-600 dark:text-slate-400">Stable</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-teal-600 dark:bg-teal-700 text-white rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors">
                Request Deep Cleaning
              </button>
              <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                View Patient Details
              </button>
              <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                Download Report
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* High Risk Areas List */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="text-slate-900 dark:text-slate-100 mb-4">High Priority Areas</h3>
          <div className="space-y-3">
            {mockAreas
              .filter(a => a.riskScore >= 60)
              .sort((a, b) => b.riskScore - a.riskScore)
              .map(area => (
                <div
                  key={area.id}
                  onClick={() => setSelectedArea(area)}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getRiskColor(area.riskScore)}`}></div>
                    <div>
                      <p className="text-slate-900 dark:text-slate-100">{area.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {area.infectedPatients} infected • {area.staffMovement} staff visits/hr
                      </p>
                    </div>
                  </div>
                  <span className={`text-lg ${getRiskTextColor(area.riskScore)}`}>{area.riskScore}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="text-slate-900 dark:text-slate-100 mb-4">AI Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-900 dark:text-red-100">Immediate deep cleaning required</p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">Isolation Unit & ICU Ward 1 have critical risk levels</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-900 rounded-lg">
              <Activity className="w-5 h-5 text-orange-600 dark:text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-900 dark:text-orange-100">Reduce staff movement</p>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">Main Corridor shows high traffic with increasing risk</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 dark:text-blue-100">Patient relocation advised</p>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Consider moving non-critical patients from Ward B</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg">
              <Wind className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-green-900 dark:text-green-100">Good ventilation status</p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">Pharmacy & Storage areas maintaining low risk levels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
