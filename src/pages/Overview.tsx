import SummaryCards from '@/components/dashboard/SummaryCards';
import BalanceTrendChart from '@/components/dashboard/BalanceTrendChart';
import SpendingBreakdown from '@/components/dashboard/SpendingBreakdown';

export default function Overview() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your financial summary at a glance
        </p>
      </div>
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6">
        <BalanceTrendChart />
        <SpendingBreakdown />
      </div>
    </div>
  );
}
