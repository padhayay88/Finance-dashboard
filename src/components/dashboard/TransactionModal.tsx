import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useStore, type Transaction, type Category, type TransactionType } from '@/store/useStore';

const CATEGORIES: Category[] = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Salary', 'Freelance', 'Investment', 'Health', 'Education'];

interface Props {
  open: boolean;
  onClose: () => void;
  editTransaction: Transaction | null;
}

export default function TransactionModal({ open, onClose, editTransaction }: Props) {
  const { addTransaction, editTransaction: updateTx } = useStore();
  const [form, setForm] = useState({ description: '', amount: '', date: '', type: 'expense' as TransactionType, category: 'Food' as Category });

  useEffect(() => {
    if (editTransaction) {
      setForm({ description: editTransaction.description, amount: String(editTransaction.amount), date: editTransaction.date, type: editTransaction.type, category: editTransaction.category });
    } else {
      setForm({ description: '', amount: '', date: new Date().toISOString().slice(0, 10), type: 'expense', category: 'Food' });
    }
  }, [editTransaction, open]);

  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.date) return;
    const data = { description: form.description, amount: parseFloat(form.amount), date: form.date, type: form.type, category: form.category };
    if (editTransaction) updateTx(editTransaction.id, data);
    else addTransaction(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editTransaction ? 'Edit' : 'Add'} Transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label className="text-xs">Description</Label>
            <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g. Grocery Shopping" className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Amount ($)</Label>
              <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as TransactionType })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Category })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full gradient-primary text-primary-foreground">
            {editTransaction ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
