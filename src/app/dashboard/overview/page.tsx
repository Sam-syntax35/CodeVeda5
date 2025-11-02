'use client';

import { useRouter } from 'next/navigation';
import { DashboardOverview } from '../../../components/DashboardOverview';

export default function DashboardOverviewPage() {
  const router = useRouter();

  const handleModuleSelect = (moduleId: string) => {
    // Navigate to the main dashboard with the selected module
    router.push(`/dashboard?role=doctor&module=${moduleId}`);
  };

  return <DashboardOverview onModuleSelect={handleModuleSelect} />;
}
