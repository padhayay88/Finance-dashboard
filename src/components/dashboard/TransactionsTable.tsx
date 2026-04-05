import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpDown, Plus, Pencil, Trash2 } from 'lucide-react';
import { useStore, type Transaction, type Category, type TransactionType } from '@/store/useStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TransactionModal from './TransactionModal';

const CATEGORIES: Category[] = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Salary', 'Freelance', 'Investment', 'Health', 'Education'];

export default function TransactionsTable() {
  const { transactions, filters, setFilters, role, deleteTransaction } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((t) => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    if (filters.type !== 'all') list = list.filter((t) => t.type === filters.type);
    if (filters.category !== 'all') list = list.filter((t) => t.category === filters.category);
    list.sort((a, b) => {
      const mul = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'date') return mul * a.date.localeCompare(b.date);
      return mul * (a.amount - b.amount);
    });
    return list;
  }, [transactions, filters]);

  const toggleSort = (key: 'date' | 'amount') => {
    if (filters.sortBy === key) setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    else setFilters({ sortBy: key, sortOrder: 'desc' });
  };

  return (
    <div className="glass-card rounded-xl p-5 lg:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-semibold">Transactions</h3>
        {role === 'admin' && (
          <Button size="sm" onClick={() => { setEditTx(null); setModalOpen(true); }} className="gradient-primary text-primary-foreground gap-1.5">
            <Plus size={14} /> Add
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search transactions..." value={filters.search} onChange={(e) => setFilters({ search: e.target.value })} className="pl-9 h-9 text-sm bg-secondary/50" />
        </div>
        <Select value={filters.type} onValueChange={(v) => setFilters({ type: v as TransactionType | 'all' })}>
          <SelectTrigger className="w-[130px] h-9 text-sm bg-secondary/50"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.category} onValueChange={(v) => setFilters({ category: v as Category | 'all' })}>
          <SelectTrigger className="w-[150px] h-9 text-sm bg-secondary/50"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="text-left py-2.5 font-medium cursor-pointer select-none" onClick={() => toggleSort('date')}>
                <span className="flex items-center gap-1">Date <ArrowUpDown size={12} /></span>
              </th>
              <th className="text-left py-2.5 font-medium">Description</th>
              <th className="text-left py-2.5 font-medium">Category</th>
              <th className="text-right py-2.5 font-medium cursor-pointer select-none" onClick={() => toggleSort('amount')}>
                <span className="flex items-center justify-end gap-1">Amount <ArrowUpDown size={12} /></span>
              </th>
              {role === 'admin' && <th className="text-right py-2.5 font-medium w-20">Actions</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.length === 0 ? (
                <tr><td colSpan={role === 'admin' ? 5 : 4} className="text-center py-10 text-muted-foreground">No transactions found</td></tr>
              ) : (
                filtered.map((t) => (
                  <motion.tr key={t.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 text-muted-foreground">{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    <td className="py-3 font-medium">{t.description}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">{t.category}</span>
                    </td>
                    <td className={`py-3 text-right font-mono font-medium ${t.type === 'income' ? 'text-chart-income' : 'text-chart-expense'}`}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                    </td>
                    {role === 'admin' && (
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => { setEditTx(t); setModalOpen(true); }} className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                            <Pencil size={13} />
                          </button>
                          <button onClick={() => deleteTransaction(t.id)} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} editTransaction={editTx} />
    </div>
  );
}
