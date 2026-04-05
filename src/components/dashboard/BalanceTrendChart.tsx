import { useMemo, useRef, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '@/store/useStore';

export default function BalanceTrendChart() {
  const transactions = useStore((s) => s.transactions);
  const chartRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const { offsetWidth, offsetHeight } = chartRef.current;
        setDimensions({
          width: offsetWidth > 0 ? offsetWidth : 300,
          height: offsetHeight > 0 ? offsetHeight : 300,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const data = useMemo(() => {
    const months: Record<string, { income: number; expense: number }> = {};
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    sorted.forEach((t) => {
      const month = t.date.slice(0, 7);
      if (!months[month]) months[month] = { income: 0, expense: 0 };
      if (t.type === 'income') months[month].income += t.amount;
      else months[month].expense += t.amount;
    });
    let balance = 0;
    return Object.entries(months).map(([month, v]) => {
      balance += v.income - v.expense;
      const label = new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      return { month: label, income: v.income, expense: v.expense, balance };
    });
  }, [transactions]);

  return (
    <div ref={chartRef} className="glass-card rounded-xl p-5 lg:p-6" style={{ minWidth: '300px', minHeight: '300px', width: '100%', height: '100%' }}>
      <h3 className="text-sm font-semibold mb-4">Balance Trend</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width={dimensions.width} height={dimensions.height}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,90%)" strokeOpacity={0.3} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220,10%,46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220,10%,46%)" tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: 'hsl(224,25%,11%)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
            />
            <Area type="monotone" dataKey="balance" stroke="hsl(160,84%,39%)" fill="url(#balGrad)" strokeWidth={2.5} name="Balance" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
