import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Moon,
  Sun,
  Shield,
  Eye,
  Wallet,
  ChevronUp,
  MessageCircle,
  Download,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import { useStore, type Role } from '@/store/useStore';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
import AIChart from '@/components/dashboard/AIChart';

const mainNav = [
  { title: 'Overview', url: '/', icon: LayoutDashboard },
  { title: 'Transactions', url: '/transactions', icon: ArrowLeftRight },
  { title: 'Insights', url: '/insights', icon: Lightbulb },
];

const secondaryNav = [
  { title: 'Profile Settings', url: '/profile-settings', icon: Shield },
  { title: 'Add Account', url: '/account-settings', icon: Eye },
  { title: 'Privacy Settings', url: '/privacy-settings', icon: Sun },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { role, transactions, darkMode, toggleDarkMode, setRole } = useStore();
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === '/') return location.pathname === '/';
    return location.pathname.startsWith(url);
  };

  const exportCSV = () => {
    const csvContent = [
      ['ID', 'Date', 'Description', 'Amount', 'Type', 'Category'],
      ...transactions.map((t) => [t.id, t.date, t.description, t.amount, t.type, t.category]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'transactions.csv');
  };

  return (
    <Sidebar collapsible="icon">
      {/* Brand */}
      <SidebarHeader className="p-6 pb-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-md">
            <Wallet className="h-6 w-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-gradient">FinDash</span>
              <span className="text-xs text-muted-foreground leading-none">Finance Dashboard</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} className={isActive(item.url) ? 'active-class' : ''}>
                    <item.icon className="w-6 h-6" />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="opacity-50" />

        {/* Export CSV Option for Admins */}
        {role === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">
              Admin Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-gray-200"
                  >
                    <Download className="w-6 h-6" />
                    <span>Export CSV</span>
                  </button>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <AIChart />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3 space-y-3 border-t border-border/40">
        {!collapsed ? (
          <>
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground h-8"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 mx-auto"
              onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
            >
              {role === 'admin' ? <Shield size={15} className="text-primary" /> : <Eye size={15} />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 mx-auto" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </Button>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
