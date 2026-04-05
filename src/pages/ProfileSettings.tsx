import React from 'react';

export default function ProfileSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">User Profile</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Phone:</strong> +1-800-555-1234</p>
        </div>
      </div>
    </div>
  );
}