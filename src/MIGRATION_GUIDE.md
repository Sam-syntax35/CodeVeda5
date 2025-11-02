# Migration Guide: React to Next.js

This document explains the conversion of the MDR SmartTrace application from a standard React app to Next.js 15 with the App Router.

## 🔄 What Changed

### 1. File Structure

**Before (React):**
```
├── App.tsx                  # Main app with routing logic
├── components/
│   ├── DashboardPage.tsx
│   ├── PlansModule.tsx
│   └── ui/
└── styles/
    └── globals.css
```

**After (Next.js):**
```
├── app/
│   ├── layout.tsx          # Root layout (Server Component)
│   ├── page.tsx            # Landing page (Client Component)
│   └── dashboard/
│       └── page.tsx        # Dashboard page (Client Component)
├── components/
│   ├── DashboardPage.tsx   # Updated with 'use client'
│   ├── PlansModule.tsx     # Updated with 'use client'
│   └── ui/
├── styles/
│   └── globals.css
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript config
└── package.json            # Updated dependencies
```

### 2. Routing Changes

**Before (State-based routing):**
```tsx
const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

if (currentView === 'dashboard') {
  return <DashboardPage userRole={userRole} onLogout={() => setCurrentView('landing')} />;
}
```

**After (Next.js App Router):**
```tsx
// Landing page: /app/page.tsx
router.push(`/dashboard?role=${selectedRole}`);

// Dashboard: /app/dashboard/page.tsx
const role = searchParams.get('role');
```

### 3. Component Updates

#### DashboardPage.tsx
- Added `'use client'` directive at the top
- Component logic remains unchanged
- Uses client-side hooks (useState)

#### PlansModule.tsx
- Added `'use client'` directive at the top
- Component logic remains unchanged
- All functionality preserved

#### Landing Page (app/page.tsx)
- Extracted from App.tsx
- Added Next.js router import: `import { useRouter } from 'next/navigation'`
- Changed navigation from state updates to `router.push()`

### 4. New Files Created

#### `/app/layout.tsx`
- Root layout for the entire application
- Server Component (no 'use client' needed)
- Imports global CSS
- Sets metadata (title, description)

#### `/app/dashboard/page.tsx`
- Wrapper component for dashboard
- Handles role from URL query parameters
- Redirects to landing if no role provided

#### `/next.config.js`
- Configures image optimization for Unsplash
- Sets up remote patterns for external images

#### `/tsconfig.json`
- TypeScript configuration for Next.js
- Enables strict mode
- Configures path aliases

#### `/package.json`
- Updated to include Next.js dependencies
- Added Next.js scripts (dev, build, start)

## 📦 Dependencies

### Added
- `next`: ^15.0.0
- Next.js is now the framework

### Updated
- `react`: ^19.0.0
- `react-dom`: ^19.0.0

### Unchanged
- All UI components (Radix UI)
- Lucide React icons
- Tailwind CSS v4
- Class Variance Authority

## 🚀 Running the Application

### Development
```bash
npm run dev
```
Visit: http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

## 🔑 Key Differences

### 1. Server vs Client Components

**Server Components (default in Next.js App Router):**
- Used for layouts and static content
- Better performance
- Cannot use hooks or browser APIs

**Client Components (need 'use client'):**
- Used for interactive features
- Can use React hooks (useState, useEffect, etc.)
- All our existing components are client components

### 2. Routing

**File-based routing:**
- `/app/page.tsx` → `/`
- `/app/dashboard/page.tsx` → `/dashboard`
- No need for react-router-dom

**Navigation:**
```tsx
// Old (React)
setCurrentView('dashboard');

// New (Next.js)
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/dashboard?role=doctor');
```

### 3. Metadata

**Old (React):**
```html
<!-- In public/index.html -->
<title>App Title</title>
```

**New (Next.js):**
```tsx
// In app/layout.tsx
export const metadata: Metadata = {
  title: 'MDR SmartTrace - Healthcare Infection Control System',
  description: '...',
};
```

## ✅ What's Preserved

1. **All functionality** - The app works exactly the same
2. **Component structure** - All components remain in `/components`
3. **Styling** - Tailwind CSS v4 and globals.css unchanged
4. **UI components** - All Radix UI components work as-is
5. **Data and logic** - All sample data and business logic preserved

## 🎯 Benefits of Next.js

1. **File-based routing** - Simpler navigation
2. **Performance** - Server components for better initial load
3. **SEO** - Better search engine optimization
4. **Image optimization** - Automatic image optimization
5. **API routes** - Easy to add backend functionality later
6. **Production ready** - Built-in optimization for production

## 🔧 Future Enhancements

With Next.js, you can now easily add:

1. **API Routes** - Create backend endpoints in `/app/api`
2. **Server-side data fetching** - Fetch data before rendering
3. **Middleware** - Add authentication and authorization
4. **Static generation** - Pre-render pages at build time
5. **Incremental Static Regeneration** - Update static pages without rebuilding

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering)
- [Routing](https://nextjs.org/docs/app/building-your-application/routing)
