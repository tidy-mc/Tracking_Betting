import React, { useState } from 'react';
import { BarChart3, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface MobileHeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <header className="md:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Betting Tracker</h1>
              <p className="text-xs text-gray-500">P&L Management</p>
            </div>
          </div>
          
          {/* Menu Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onMenuToggle}
            className="p-2"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}; 