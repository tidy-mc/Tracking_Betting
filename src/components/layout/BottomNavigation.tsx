import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, List, Settings, Home } from 'lucide-react';
import { cn } from '../../utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Bets', href: '/bets', icon: List },
  { name: 'Statistics', href: '/statistics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex flex-col items-center py-2 px-3 min-w-0 flex-1',
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <item.icon
                className={cn(
                  'w-6 h-6 mb-1',
                  isActive ? 'text-primary-600' : 'text-gray-400'
                )}
                aria-hidden="true"
              />
              <span className="text-xs font-medium truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}; 