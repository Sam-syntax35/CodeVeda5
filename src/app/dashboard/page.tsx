'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardPage } from '../../components/DashboardPage';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userRole, setUserRole] = useState<string>('');
  const [initialModule, setInitialModule] = useState<string>('patients');

  useEffect(() => {
    const role = searchParams.get('role');
    const module = searchParams.get('module');
    
    if (!role) {
      router.push('/');
    } else {
      setUserRole(role);
      if (module) {
        setInitialModule(module);
      }
    }
  }, [searchParams, router]);

  const handleLogout = () => {
    router.push('/');
  };

  if (!userRole) {
    return null;
  }

  return <DashboardPage userRole={userRole} onLogout={handleLogout} initialModule={initialModule} />;
}
