import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useStore } from '@/store/useStore';

const COLORS = [
  'hsl(160,84%,39%)', 'hsl(200,80%,55%)', 'hsl(40,90%,55%)',
  'hsl(280,65%,60%)', 'hsl(0,72%,51%)', 'hsl(320,70%,55%)',
  'hsl(180,70%,35%)', 'hsl(100,60%,45%)', 'hsl(30,80%,50%)', 'hsl(250,50%,55%)',
];

export default function SpendingBreakdown() {
  const transactions = useStore((s) => s.transactions);

  const data = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.filter((t) => t.type === 'expense').forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card rounded-xl p-5 lg:p-6">
      <h3 className="text-sm font-semibold mb-4">Spending Breakdown</h3>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="h-[200px] w-[200px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={2} strokeWidth={0}>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(224,25%,11%)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13 }} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {data.slice(0, 5).map((d, i) => (
            <div key={d.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-muted-foreground">{d.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">${d.value.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground w-10 text-right">{((d.value / total) * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
