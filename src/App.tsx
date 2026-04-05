import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";
import ProfileSettings from "./pages/ProfileSettings";
import AccountSettings from "./pages/AccountSettings";
import PrivacySettings from "./pages/PrivacySettings";
import HelpCenter from "./pages/HelpCenter";
import FAQs from "./pages/FAQs";
import ContactSupport from "./pages/ContactSupport";
import AIAssistant from "./pages/AIAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/privacy-settings" element={<PrivacySettings />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact-support" element={<ContactSupport />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/settings" element={<Navigate to="/profile-settings" replace />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
