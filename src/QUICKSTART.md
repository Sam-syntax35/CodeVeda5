# Quick Start Guide

Get your MDR SmartTrace Next.js application up and running in minutes!

## 🚀 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

or if you prefer yarn:

```bash
yarn install
```

or pnpm:

```bash
pnpm install
```

### Step 2: Run Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## 🎮 Using the Application

### Landing Page (/)

1. You'll see the MDR SmartTrace landing page
2. Click the dropdown under "What brings you here?"
3. Select your role:
   - 👨‍⚕️ **Doctor** - Access the full medical dashboard
   - ❤️ **Patient** - Patient portal (coming soon)
   - 👥 **Family** - Family member access (coming soon)
4. Click **Continue** to proceed

### Doctor Dashboard (/dashboard)

Once logged in as a Doctor, you'll see:

#### Sidebar Modules
- **Patients** - Patient management & infection tracking
- **Tracking** - Real-time IoT movement monitoring
- **Reports** - Clinical reports with AI insights
- **Plans** - Treatment planning (fully functional ✅)
- **Schedule** - Appointment management
- **Community** - Medical collaboration

#### Plans Module (Fully Implemented)

Click on **Plans** in the sidebar to access:

1. **Weekend Visit Tab**
   - Hospital rounds
   - Critical case checkups
   - Family consultations
   - Lab report reviews

2. **Clinic Visit Tab**
   - OPD sessions
   - Specialist consultations
   - Follow-up appointments
   - Private practice duties

3. **Volunteer Service Tab**
   - Medical camps
   - Health awareness seminars
   - Blood donation camps
   - NGO health checkups

Each plan includes:
- ✅ Checkable task lists
- 📅 Date and time
- 📍 Location
- 🎯 Priority indicators (High/Medium/Low)
- 🔘 Action buttons (View Details, Mark Complete)

## 📁 Key Files to Know

```
├── app/
│   ├── page.tsx              # Landing page - START HERE
│   └── dashboard/page.tsx    # Dashboard wrapper
├── components/
│   ├── DashboardPage.tsx     # Main dashboard UI
│   └── PlansModule.tsx       # Plans module with tabs
```

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎨 Customization Tips

### Change Theme Colors

Edit `/styles/globals.css`:
```css
:root {
  --color-primary: #your-color;
  /* Teal accent is currently #14b8a6 */
}
```

### Add New Module

1. Create component in `/components/YourModule.tsx`
2. Add to menu items in `/components/DashboardPage.tsx`
3. Add conditional rendering in the main content area

### Modify Plans Data

Edit sample data in `/components/PlansModule.tsx`:
- `weekendVisits` array
- `clinicVisits` array
- `volunteerServices` array

## 🔍 Project Structure Overview

```
mdr-smartrace-nextjs/
│
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout (loads CSS)
│   ├── page.tsx           # Landing page
│   └── dashboard/
│       └── page.tsx       # Dashboard route
│
├── components/            # React Components
│   ├── DashboardPage.tsx # Main dashboard
│   ├── PlansModule.tsx   # Plans implementation
│   ├── figma/           # Image components
│   └── ui/              # UI primitives
│
├── styles/
│   └── globals.css      # Global styles + Tailwind
│
├── next.config.js       # Next.js config
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies
```

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill

# Or use a different port
PORT=3001 npm run dev
```

### TypeScript Errors

```bash
# Delete .next folder and reinstall
rm -rf .next
npm install
npm run dev
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📖 Next Steps

1. ✅ Run the application
2. ✅ Explore the Plans module
3. 📝 Add your own data to Plans module
4. 🎨 Customize the theme colors
5. 🔧 Implement other modules (Patients, Tracking, etc.)
6. 🌐 Add API routes for backend functionality
7. 🔐 Implement authentication with NextAuth.js

## 💡 Pro Tips

- **Hot Reload**: Changes auto-refresh in dev mode
- **Console**: Check browser console for any errors
- **Mobile**: Responsive design works on all devices
- **Sidebar**: Click collapse button to save space

## 🆘 Need Help?

Check these resources:
- README.md - Full documentation
- MIGRATION_GUIDE.md - React to Next.js changes
- Next.js Docs - https://nextjs.org/docs

---

Happy coding! 🎉
