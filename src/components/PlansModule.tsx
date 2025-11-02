'use client';

import { Calendar, Clock, MapPin, Plus, CheckCircle2, AlertCircle, Users, Stethoscope, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './TabsComponent';
import { MagicCard, GlobalCardSpotlight } from './MagicCard';

export function PlansModule() {
  const handleBack = () => {
    window.history.back();
  };

  const weekendVisits = [
    {
      id: 1,
      title: 'Weekend Round - ICU Ward',
      date: 'Saturday, Nov 2, 2025',
      time: '09:00 AM - 11:00 AM',
      location: 'ICU, 3rd Floor',
      priority: 'high',
      tasks: [
        'Review patient vitals for 8 critical patients',
        'Check ventilator settings',
        'Review overnight lab reports',
        'Update treatment plans'
      ],
      completed: false
    },
    {
      id: 2,
      title: 'Family Consultation Meeting',
      date: 'Saturday, Nov 2, 2025',
      time: '02:00 PM - 03:30 PM',
      location: 'Conference Room A',
      priority: 'medium',
      tasks: [
        'Meet family of Patient ID: PT-5624',
        'Explain treatment progress',
        'Discuss discharge planning',
        'Answer questions about medication'
      ],
      completed: false
    },
    {
      id: 3,
      title: 'Lab Culture Report Review',
      date: 'Sunday, Nov 3, 2025',
      time: '10:00 AM - 11:00 AM',
      location: 'Office',
      priority: 'high',
      tasks: [
        'Review 12 pending culture reports',
        'Identify antibiotic resistance patterns',
        'Update treatment protocols',
        'Flag critical cases for Monday rounds'
      ],
      completed: false
    },
    {
      id: 4,
      title: 'Critical Case Checkup',
      date: 'Sunday, Nov 3, 2025',
      time: '04:00 PM - 05:00 PM',
      location: 'Ward 2B',
      priority: 'high',
      tasks: [
        'Monitor post-surgery recovery',
        'Check infection markers',
        'Adjust pain management protocol'
      ],
      completed: false
    }
  ];

  const clinicVisits = [
    {
      id: 5,
      title: 'Morning OPD Session',
      date: 'Monday, Nov 4, 2025',
      time: '08:00 AM - 12:00 PM',
      location: 'City Clinic, MG Road',
      priority: 'medium',
      tasks: [
        '15 appointments booked',
        '8 follow-up patients',
        '7 new consultations',
        'General health checkups'
      ],
      completed: false
    },
    {
      id: 6,
      title: 'Specialist Consultation',
      date: 'Tuesday, Nov 5, 2025',
      time: '03:00 PM - 06:00 PM',
      location: 'City Clinic',
      priority: 'high',
      tasks: [
        'Complex case: Chronic infection management',
        'Second opinion consultations (3 patients)',
        'Treatment plan reviews',
        'Prescription adjustments'
      ],
      completed: false
    },
    {
      id: 7,
      title: 'Follow-up Appointments',
      date: 'Wednesday, Nov 6, 2025',
      time: '05:00 PM - 07:00 PM',
      location: 'City Clinic',
      priority: 'medium',
      tasks: [
        '10 post-treatment follow-ups',
        'Lab report discussions',
        'Recovery progress assessment',
        'Medication efficacy review'
      ],
      completed: false
    },
    {
      id: 8,
      title: 'Evening Walk-in Clinic',
      date: 'Thursday, Nov 7, 2025',
      time: '06:00 PM - 09:00 PM',
      location: 'City Clinic',
      priority: 'low',
      tasks: [
        'Open consultation hours',
        'Minor ailments & infections',
        'Health advice sessions',
        'Prescription renewals'
      ],
      completed: false
    }
  ];

  const volunteerServices = [
    {
      id: 9,
      title: 'Free Medical Camp - Rural Village',
      date: 'Saturday, Nov 9, 2025',
      time: '07:00 AM - 02:00 PM',
      location: 'Rampur Village, 35km from city',
      priority: 'medium',
      tasks: [
        'General health screening for 100+ villagers',
        'Blood pressure & diabetes testing',
        'Free medicine distribution',
        'Health awareness session on hygiene'
      ],
      completed: false
    },
    {
      id: 10,
      title: 'School Health Awareness Seminar',
      date: 'Monday, Nov 11, 2025',
      time: '11:00 AM - 01:00 PM',
      location: 'St. Mary\'s School, Auditorium',
      priority: 'low',
      tasks: [
        'Talk on infectious disease prevention',
        'Hand hygiene demonstration',
        'Q&A session with students',
        'Distribute educational pamphlets'
      ],
      completed: false
    },
    {
      id: 11,
      title: 'Blood Donation Camp Duty',
      date: 'Sunday, Nov 17, 2025',
      time: '09:00 AM - 05:00 PM',
      location: 'Community Center, Sector 12',
      priority: 'medium',
      tasks: [
        'Donor health screening',
        'Medical supervision during donation',
        'Emergency response standby',
        'Coordinate with blood bank team'
      ],
      completed: false
    },
    {
      id: 12,
      title: 'NGO Health Checkup Drive',
      date: 'Saturday, Nov 23, 2025',
      time: '10:00 AM - 04:00 PM',
      location: 'Slum Area - Nehru Nagar',
      priority: 'medium',
      tasks: [
        'Free health checkups for underprivileged',
        'Identify cases needing urgent care',
        'Vaccination drive support',
        'Nutrition counseling'
      ],
      completed: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600 text-white';
      case 'medium':
        return 'bg-slate-900 text-white';
      case 'low':
        return 'bg-slate-200 text-slate-700';
      default:
        return 'bg-slate-900 text-white';
    }
  };

  const renderPlanCard = (plan: any, icon: any) => {
    const Icon = icon;
    return (
      <MagicCard
        key={plan.id}
        enableParticles={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        glowColor="132, 0, 255"
        particleCount={6}
      >
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-50 dark:bg-teal-950 rounded-lg">
                <Icon className="w-5 h-5 text-teal-600 dark:text-teal-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-1 text-slate-900 dark:text-slate-100">{plan.title}</h3>
                <div className="text-slate-500 dark:text-slate-400 mt-1.5 flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {plan.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {plan.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {plan.location}
                  </span>
                </div>
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getPriorityColor(plan.priority)}`}>
              {plan.priority.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Tasks:</p>
              <div className="space-y-2">
                {plan.tasks.map((task: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id={`task-${plan.id}-${index}`} 
                      className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-teal-600 dark:text-teal-500 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-600 focus:ring-offset-2 cursor-pointer mt-0.5"
                    />
                    <label
                      htmlFor={`task-${plan.id}-${index}`}
                      className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer leading-tight"
                    >
                      {task}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <button className="inline-flex items-center justify-center rounded-lg transition-all duration-200 px-3 py-1.5 text-sm border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex-1">
                View Details
              </button>
              <button className="inline-flex items-center justify-center rounded-lg transition-all duration-200 px-3 py-1.5 text-sm bg-teal-600 dark:bg-teal-700 text-white hover:bg-teal-700 dark:hover:bg-teal-600 flex-1">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      </div>
      </MagicCard>
    );
  };

  return (
    <div className="space-y-6">
      <GlobalCardSpotlight enabled={true} spotlightRadius={300} glowColor="132, 0, 255" />
      {/* Back Button */}
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
      >
        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back</span>
      </button>

      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-slate-900 dark:text-slate-100 mb-2">Doctor's Plans & Commitments</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Manage all your upcoming responsibilities in one place - hospital duties, clinic appointments, and community service
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-lg transition-all duration-200 px-4 py-2 bg-teal-600 dark:bg-teal-700 text-white hover:bg-teal-700 dark:hover:bg-teal-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Plan
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-6 pt-6">
            <div className="text-center">
              <div className="text-3xl text-teal-600 dark:text-teal-500 mb-1">{weekendVisits.length}</div>
              <div className="text-slate-600 dark:text-slate-400">Weekend Visits</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-6 pt-6">
            <div className="text-center">
              <div className="text-3xl text-blue-600 dark:text-blue-500 mb-1">{clinicVisits.length}</div>
              <div className="text-slate-600 dark:text-slate-400">Clinic Sessions</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-6 pt-6">
            <div className="text-center">
              <div className="text-3xl text-purple-600 dark:text-purple-500 mb-1">{volunteerServices.length}</div>
              <div className="text-slate-600 dark:text-slate-400">Volunteer Services</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-6 pt-6">
            <div className="text-center">
              <div className="text-3xl text-orange-600 dark:text-orange-500 mb-1">
                {weekendVisits.length + clinicVisits.length + volunteerServices.length}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Total Plans</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Different Plan Categories */}
      <Tabs defaultValue="weekend" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekend" className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Weekend Visit
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-slate-200 text-slate-700 ml-1">{weekendVisits.length}</span>
          </TabsTrigger>
          <TabsTrigger value="clinic" className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Clinic Visit
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-slate-200 text-slate-700 ml-1">{clinicVisits.length}</span>
          </TabsTrigger>
          <TabsTrigger value="volunteer" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Volunteer Service
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-slate-200 text-slate-700 ml-1">{volunteerServices.length}</span>
          </TabsTrigger>
        </TabsList>

        {/* Weekend Visit Tab */}
        <TabsContent value="weekend" className="space-y-6 mt-6">
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <h3 className="text-blue-900 dark:text-blue-100 mb-1">Weekend Visit Plans</h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Hospital weekend rounds, critical case checkups, family consultations, and lab report reviews to ensure continuous care.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {weekendVisits.map(plan => renderPlanCard(plan, Calendar))}
          </div>
        </TabsContent>

        {/* Clinic Visit Tab */}
        <TabsContent value="clinic" className="space-y-6 mt-6">
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-4">
            <h3 className="text-green-900 dark:text-green-100 mb-1">Clinic Visit Plans</h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Private OPD sessions, specialist consultations, follow-up appointments, and clinic management to balance hospital and private practice.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {clinicVisits.map(plan => renderPlanCard(plan, Stethoscope))}
          </div>
        </TabsContent>

        {/* Volunteer Service Tab */}
        <TabsContent value="volunteer" className="space-y-6 mt-6">
          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-900 rounded-lg p-4">
            <h3 className="text-purple-900 dark:text-purple-100 mb-1">Volunteer Service Plans</h3>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              Community medical camps, health awareness seminars, NGO events, and public health initiatives for social contribution and outreach.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {volunteerServices.map(plan => renderPlanCard(plan, Heart))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
