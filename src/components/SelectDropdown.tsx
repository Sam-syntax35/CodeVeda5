'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface SelectDropdownProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  children: ReactNode;
}

export function SelectDropdown({ value, onValueChange, placeholder, className = '', children }: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(placeholder || 'Select...');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (itemValue: string, label: string) => {
    setSelectedLabel(label);
    onValueChange?.(itemValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={value ? 'text-slate-900' : 'text-slate-500'}>{selectedLabel}</span>
        <svg 
          className={`h-4 w-4 opacity-50 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="p-1 max-h-60 overflow-auto">
            {Array.isArray(children) 
              ? children.map((child: any) => {
                  if (!child?.props) return null;
                  return (
                    <div
                      key={child.props.value}
                      onClick={() => handleSelect(child.props.value, child.props.label)}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-slate-100 transition-colors"
                    >
                      {child.props.children}
                    </div>
                  );
                })
              : children}
          </div>
        </div>
      )}
    </div>
  );
}

interface SelectItemProps {
  value: string;
  label: string;
  children: ReactNode;
}

export function SelectItem({ children }: SelectItemProps) {
  return <>{children}</>;
}
