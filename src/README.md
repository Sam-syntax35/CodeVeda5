# MDR SmartTrace - Next.js Application

An AI-powered infection control platform for hospitals with a multi-role dashboard interface built with Next.js 15 and React 19.

## 🏥 About

MDR SmartTrace is a comprehensive healthcare infection control system that serves three user types:
- **Doctors**: Professional cockpit interface with six main modules
- **Patients**: Patient portal for health tracking
- **Family**: Family member access for patient monitoring

## 🚀 Getting Started

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with global styles
│   ├── page.tsx             # Landing page with role selection
│   └── dashboard/
│       └── page.tsx         # Dashboard page (role-based)
├── components/              # React components
│   ├── DashboardPage.tsx    # Main dashboard component
│   ├── PlansModule.tsx      # Plans module with tabs
│   ├── figma/              # Figma-related components
│   └── ui/                 # UI components (buttons, cards, etc.)
├── styles/
│   └── globals.css         # Global styles with Tailwind CSS v4
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎯 Features

### Landing Page
- Role selection dropdown (Doctor/Patient/Family)
- Medical-themed gradient background
- Live tracking indicators
- System status displays

### Doctor Dashboard
The doctor dashboard includes six main modules:

1. **Patients** - Patient management with infection status tracking
2. **Tracking** - Real-time IoT movement and contact tracing
3. **Reports** - Clinical and infection reports with AI-generated insights
4. **Plans** - Treatment planning and doctor task management
   - Weekend Visit (hospital rounds and critical cases)
   - Clinic Visit (OPD and private practice duties)
   - Volunteer Service (community outreach and medical camps)
5. **Schedule** - Appointment and visit management
6. **Community** - Internal medical collaboration

### Plans Module (Fully Implemented)
- Three tabbed categories for doctor responsibilities
- Task management with checkboxes
- Priority indicators (High/Medium/Low)
- Date, time, and location tracking
- Statistics overview
- Sample data for all plan types

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **React**: React 19
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 🔄 Migration from React to Next.js

This application has been converted from a standard React app to Next.js with the following changes:

1. **Routing**: Switched from state-based routing to Next.js App Router
   - Landing page: `/` (app/page.tsx)
   - Dashboard: `/dashboard?role=doctor` (app/dashboard/page.tsx)

2. **Client Components**: Added `'use client'` directive to interactive components
   - All components using hooks (useState, useEffect, etc.)
   - Components handling user interactions

3. **Server Components**: Root layout is a server component for optimal performance

4. **Image Optimization**: Configured for Unsplash images in next.config.js

## 📝 Environment Notes

- No backend/API keys required for the frontend demo
- Uses Unsplash for placeholder medical images
- Sample data included for all modules

## 🎨 Design System

The application uses a clean medical aesthetic with:
- Teal accent colors (#14b8a6)
- Slate gray backgrounds
- Gradient overlays for depth
- Consistent spacing and typography
- Responsive design for all screen sizes

## 📄 License

© 2025 MDR SmartTrace. All rights reserved.
