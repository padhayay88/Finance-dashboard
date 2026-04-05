import TransactionsTable from '@/components/dashboard/TransactionsTable';

export default function Transactions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Transactions
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          View, filter, and manage all your transactions
        </p>
      </div>
      <TransactionsTable />
    </div>
  );
}
