import { Moon, Sun, Shield, Eye } from 'lucide-react';
import { useStore, type Role } from '@/store/useStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { role, setRole, darkMode, toggleDarkMode } = useStore();

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Finance <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Track your income, expenses, and spending patterns</p>
      </div>
      <div className="flex items-center gap-3">
        <Select value={role} onValueChange={(v) => setRole(v as Role)}>
          <SelectTrigger className="w-[140px] h-9 text-sm bg-secondary/50">
            <div className="flex items-center gap-2">
              {role === 'admin' ? <Shield size={14} /> : <Eye size={14} />}
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="h-9 w-9" onClick={toggleDarkMode}>
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
      </div>
    </header>
  );
}
