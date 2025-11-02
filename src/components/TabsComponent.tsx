'use client';

import { ReactNode, createContext, useContext, useState, ButtonHTMLAttributes } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: ReactNode;
}

export function Tabs({ defaultValue, className = '', children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-500 ${className}`}>
      {children}
    </div>
  );
}

interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
}

export function TabsTrigger({ value, className = '', children, ...props }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) return null;

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-50 ${
        isActive ? 'bg-white text-slate-950 shadow-sm' : 'hover:bg-slate-200'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export function TabsContent({ value, className = '', children }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) return null;

  const { activeTab } = context;
  
  if (activeTab !== value) return null;

  return (
    <div className={`mt-2 ${className}`}>
      {children}
    </div>
  );
}
