import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useMemo } from 'react';

export default function SummaryCards() {
  const transactions = useStore((s) => s.transactions);

  const { totalBalance, totalIncome, totalExpenses, incomeChange, expenseChange } = useMemo(() => {
    const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
      incomeChange: 12.5,
      expenseChange: -3.2,
    };
  }, [transactions]);

  const cards = [
    {
      label: 'Total Balance',
      value: totalBalance,
      icon: Wallet,
      change: 8.2,
      gradient: 'from-primary/20 to-primary/5',
      iconBg: 'bg-primary/15',
      iconColor: 'text-primary',
    },
    {
      label: 'Total Income',
      value: totalIncome,
      icon: TrendingUp,
      change: incomeChange,
      gradient: 'from-emerald-500/15 to-emerald-500/5',
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-500',
    },
    {
      label: 'Total Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      change: expenseChange,
      gradient: 'from-destructive/15 to-destructive/5',
      iconBg: 'bg-destructive/15',
      iconColor: 'text-destructive',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
          className={`relative overflow-hidden glass-card rounded-2xl p-5 lg:p-6 hover:shadow-lg transition-all duration-300 group bg-gradient-to-br ${card.gradient}`}
        >
          {/* Decorative circle */}
          <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/5 group-hover:scale-150 transition-transform duration-500" />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
              <div className={`p-2.5 rounded-xl ${card.iconBg} ${card.iconColor} transition-transform group-hover:scale-110`}>
                <card.icon size={18} strokeWidth={2} />
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-bold tracking-tight">
              ${card.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <div className="flex items-center gap-1.5 mt-3">
              <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-xs font-medium ${
                card.change >= 0 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-destructive/10 text-destructive'
              }`}>
                {card.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {Math.abs(card.change)}%
              </div>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
