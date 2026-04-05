import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">Profile Settings</h2>
          <p>Manage your profile information and preferences.</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => navigate('/profile-settings')}>
            Open Profile Settings
          </button>
        </div>
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">Account Settings</h2>
          <p>Update your account details and security settings.</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => navigate('/account-settings')}>
            Open Account Settings
          </button>
          <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md" onClick={() => alert('Add Account feature coming soon!')}>
            Add Account
          </button>
        </div>
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">Privacy Settings</h2>
          <p>Control your privacy preferences and data sharing options.</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => navigate('/privacy-settings')}>
            Open Privacy Settings
          </button>
        </div>
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">Help Center</h2>
          <p>Access the help center for FAQs and support.</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => navigate('/help-center')}>
            Open Help Center
          </button>
        </div>
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">FAQs</h2>
          <p>Find answers to frequently asked questions.</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => navigate('/faqs')}>
            Open FAQs
          </button>
        </div>
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">Contact Support</h2>
          <p>Contact our support team for assistance.</p>
          <p>Contact Number: +1-800-123-4567</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => navigate('/contact-support')}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}