import React from 'react';
import { BarChart3 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="hidden md:block bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Betting Tracker</h1>
              <p className="text-sm text-gray-500">Profit & Loss Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Track your betting performance
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 