import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'admin' | 'viewer';
export type TransactionType = 'income' | 'expense';
export type Category = 'Food' | 'Transport' | 'Shopping' | 'Entertainment' | 'Bills' | 'Salary' | 'Freelance' | 'Investment' | 'Health' | 'Education';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

interface Filters {
  search: string;
  type: TransactionType | 'all';
  category: Category | 'all';
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
}

interface AppState {
  role: Role;
  transactions: Transaction[];
  filters: Filters;
  darkMode: boolean;
  setRole: (role: Role) => void;
  setFilters: (filters: Partial<Filters>) => void;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  toggleDarkMode: () => void;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2026-04-01', description: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary' },
  { id: '2', date: '2026-04-01', description: 'Rent Payment', amount: 1500, type: 'expense', category: 'Bills' },
  { id: '3', date: '2026-04-02', description: 'Grocery Shopping', amount: 120, type: 'expense', category: 'Food' },
  { id: '4', date: '2026-04-02', description: 'Freelance Project', amount: 800, type: 'income', category: 'Freelance' },
  { id: '5', date: '2026-04-03', description: 'Uber Ride', amount: 25, type: 'expense', category: 'Transport' },
  { id: '6', date: '2026-04-03', description: 'Netflix Subscription', amount: 15, type: 'expense', category: 'Entertainment' },
  { id: '7', date: '2026-04-04', description: 'New Shoes', amount: 90, type: 'expense', category: 'Shopping' },
  { id: '8', date: '2026-04-04', description: 'Stock Dividend', amount: 150, type: 'income', category: 'Investment' },
  { id: '9', date: '2026-03-28', description: 'Electricity Bill', amount: 85, type: 'expense', category: 'Bills' },
  { id: '10', date: '2026-03-27', description: 'Restaurant Dinner', amount: 65, type: 'expense', category: 'Food' },
  { id: '11', date: '2026-03-25', description: 'Gym Membership', amount: 50, type: 'expense', category: 'Health' },
  { id: '12', date: '2026-03-24', description: 'Online Course', amount: 30, type: 'expense', category: 'Education' },
  { id: '13', date: '2026-03-20', description: 'Freelance Bonus', amount: 400, type: 'income', category: 'Freelance' },
  { id: '14', date: '2026-03-15', description: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary' },
  { id: '15', date: '2026-03-14', description: 'Phone Bill', amount: 45, type: 'expense', category: 'Bills' },
  { id: '16', date: '2026-03-10', description: 'Gas Station', amount: 55, type: 'expense', category: 'Transport' },
  { id: '17', date: '2026-03-08', description: 'Concert Tickets', amount: 120, type: 'expense', category: 'Entertainment' },
  { id: '18', date: '2026-03-05', description: 'Clothing', amount: 200, type: 'expense', category: 'Shopping' },
  { id: '19', date: '2026-02-28', description: 'Monthly Salary', amount: 5200, type: 'income', category: 'Salary' },
  { id: '20', date: '2026-02-25', description: 'Investment Return', amount: 320, type: 'income', category: 'Investment' },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      role: 'admin',
      transactions: INITIAL_TRANSACTIONS,
      filters: { search: '', type: 'all', category: 'all', sortBy: 'date', sortOrder: 'desc' },
      darkMode: true,
      setRole: (role) => set({ role }),
      setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters } })),
      addTransaction: (t) => set((s) => ({
        transactions: [{ ...t, id: crypto.randomUUID() }, ...s.transactions],
      })),
      editTransaction: (id, updates) => set((s) => ({
        transactions: s.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      })),
      deleteTransaction: (id) => set((s) => ({
        transactions: s.transactions.filter((t) => t.id !== id),
      })),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
    }),
    { name: 'finance-dashboard-store' }
  )
);
