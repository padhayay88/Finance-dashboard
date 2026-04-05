import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ProfileSettings from './pages/ProfileSettings';
import AccountSettings from './pages/AccountSettings';
import PrivacySettings from './pages/PrivacySettings';
import HelpCenter from './pages/HelpCenter';
import FAQs from './pages/FAQs';
import ContactSupport from './pages/ContactSupport';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

createRoot(document.getElementById("root")!).render(<App />);
