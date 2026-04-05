import React from 'react';

export default function AccountSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">Add Account</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="accountName">Account Name</label>
              <input
                type="text"
                id="accountName"
                className="w-full p-2 border rounded-md"
                placeholder="Enter account name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="accountType">Account Type</label>
              <select id="accountType" className="w-full p-2 border rounded-md">
                <option value="savings">Savings</option>
                <option value="checking">Checking</option>
                <option value="credit">Credit</option>
              </select>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Add Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}