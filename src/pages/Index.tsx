// This file is kept for compatibility but the app now uses separate page routes.
// See Overview.tsx, Transactions.tsx, and Insights.tsx
import { Navigate } from 'react-router-dom';

export default function Index() {
  return <Navigate to="/" replace />;
}
