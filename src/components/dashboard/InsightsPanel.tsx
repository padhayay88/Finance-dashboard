import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, PiggyBank, BarChart3, Target, Zap } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function InsightsPanel() {
  const transactions = useStore((s) => s.transactions);

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const catMap: Record<string, number> = {};
    expenses.forEach((t) => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
    const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const highestCat = sorted[0];
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
    const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    const months: Record<string, number> = {};
    expenses.forEach((t) => { const m = t.date.slice(0, 7); months[m] = (months[m] || 0) + t.amount; });
    const monthKeys = Object.keys(months).sort();
    const currentMonth = monthKeys[monthKeys.length - 1];
    const prevMonth = monthKeys[monthKeys.length - 2];
    const monthChange = prevMonth && months[currentMonth] && months[prevMonth]
      ? ((months[currentMonth] - months[prevMonth]) / months[prevMonth]) * 100 : 0;

    return [
      {
        icon: AlertTriangle,
        title: 'Highest Spending',
        value: highestCat ? `${highestCat[0]}` : 'N/A',
        subValue: highestCat ? `$${highestCat[1].toLocaleString()}` : '',
        description: highestCat ? `${((highestCat[1] / totalExpense) * 100).toFixed(0)}% of total expenses` : '',
        color: 'from-orange-500/20 to-orange-500/5',
        iconColor: 'text-orange-500 bg-orange-500/15',
      },
      {
        icon: BarChart3,
        title: 'Monthly Change',
        value: `${monthChange >= 0 ? '+' : ''}${monthChange.toFixed(1)}%`,
        subValue: '',
        description: monthChange >= 0 ? 'Spending increased vs last month' : 'Spending decreased vs last month',
        color: monthChange >= 0 ? 'from-destructive/15 to-destructive/5' : 'from-emerald-500/15 to-emerald-500/5',
        iconColor: monthChange >= 0 ? 'text-destructive bg-destructive/15' : 'text-emerald-500 bg-emerald-500/15',
      },
      {
        icon: PiggyBank,
        title: 'Savings Rate',
        value: `${savingsRate.toFixed(1)}%`,
        subValue: '',
        description: savingsRate >= 20 ? 'Great! You\'re saving well' : 'Try to save at least 20%',
        color: 'from-primary/15 to-primary/5',
        iconColor: 'text-primary bg-primary/15',
      },
      {
        icon: Zap,
        title: 'Avg. Daily Spend',
        value: `$${(totalExpense / 30).toFixed(0)}`,
        subValue: '',
        description: `Based on $${totalExpense.toLocaleString()} total expenses`,
        color: 'from-violet-500/15 to-violet-500/5',
        iconColor: 'text-violet-500 bg-violet-500/15',
      },
    ];
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {insights.map((insight, i) => (
        <motion.div
          key={insight.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 24 }}
          className={`glass-card rounded-2xl p-5 bg-gradient-to-br ${insight.color} group hover:shadow-lg transition-all duration-300`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-xl ${insight.iconColor} shrink-0 transition-transform group-hover:scale-110`}>
              <insight.icon size={18} strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{insight.title}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="font-bold text-lg">{insight.value}</p>
                {insight.subValue && (
                  <p className="text-sm font-semibold text-muted-foreground">{insight.subValue}</p>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{insight.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
