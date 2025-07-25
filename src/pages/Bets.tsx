import React, { useState } from 'react';
import { useBetContext } from '../context/BetContext';
import { BetForm } from '../components/forms/BetForm';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { filterBets, formatCurrency } from '../utils/calculations';
import { SPORTS, BETTING_PLATFORMS, RACE_TYPES, AUSTRALIAN_STATES } from '../utils/constants';
import { format } from 'date-fns';
import { Plus, Search, Filter, Edit, Trash2, X } from 'lucide-react';
import type { Bet, BetFormData, FilterOptions } from '../types';

export const Bets: React.FC = () => {
  const { state, addBet, updateBet, deleteBet, setFilters } = useBetContext();
  const { bets, filters } = state;
  
  const [showForm, setShowForm] = useState(false);
  const [editingBet, setEditingBet] = useState<Bet | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const filteredBets = filterBets(bets, localFilters);

  const handleAddBet = (betData: BetFormData) => {
    addBet(betData);
    setShowForm(false);
  };

  const handleUpdateBet = (betData: BetFormData) => {
    if (editingBet) {
      updateBet(editingBet.id, betData);
      setEditingBet(null);
      setShowForm(false);
    }
  };

  const handleDeleteBet = (betId: string) => {
    if (confirm('Are you sure you want to delete this bet?')) {
      deleteBet(betId);
    }
  };

  const handleEditBet = (bet: Bet) => {
    setEditingBet(bet);
    setShowForm(true);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...localFilters };
    if (value) {
      newFilters[key] = value as any;
    } else {
      delete newFilters[key];
    }
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    setFilters(localFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const emptyFilters: FilterOptions = {};
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bets</h1>
          <p className="text-gray-600 mt-2">Manage your betting history</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Bet</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowFilters(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Sport"
              options={SPORTS.map(sport => ({ value: sport, label: sport }))}
              placeholder="All sports"
              value={localFilters.sport || ''}
              onChange={(value) => handleFilterChange('sport', value)}
            />
            <Select
              label="Platform"
              options={BETTING_PLATFORMS.map(platform => ({ value: platform, label: platform }))}
              placeholder="All platforms"
              value={localFilters.platform || ''}
              onChange={(value) => handleFilterChange('platform', value)}
            />
            <Select
              label="Race Type"
              options={RACE_TYPES.map(type => ({ value: type, label: type }))}
              placeholder="All race types"
              value={localFilters.raceType || ''}
              onChange={(value) => handleFilterChange('raceType', value)}
            />
            <Select
              label="State"
              options={AUSTRALIAN_STATES.map(state => ({ value: state, label: state }))}
              placeholder="All states"
              value={localFilters.state || ''}
              onChange={(value) => handleFilterChange('state', value)}
            />
            <Input
              label="Date From"
              type="date"
              value={localFilters.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
            <Input
              label="Date To"
              type="date"
              value={localFilters.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="secondary" onClick={clearFilters}>
              Clear All
            </Button>
            <Button variant="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingBet ? 'Edit Bet' : 'Add New Bet'}
            </h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setShowForm(false);
                setEditingBet(null);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <BetForm
            bet={editingBet || undefined}
            onSubmit={editingBet ? handleUpdateBet : handleAddBet}
            onCancel={() => {
              setShowForm(false);
              setEditingBet(null);
            }}
          />
        </div>
      )}

      {/* Bets List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Betting History ({filteredBets.length} bets)
            </h3>
            {filteredBets.length > 0 && (
              <div className="text-sm text-gray-500">
                Total: {formatCurrency(filteredBets.reduce((sum, bet) => sum + bet.profitLoss, 0))}
              </div>
            )}
          </div>
        </div>
        
        {filteredBets.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bets found</h3>
            <p className="text-gray-500">
              {bets.length === 0 
                ? "Start by adding your first bet using the 'Add Bet' button above."
                : "Try adjusting your filters to see more results."
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredBets
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((bet) => (
                <div key={bet.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-medium text-gray-900">
                              {bet.sport}
                            </h4>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-sm text-gray-600">{bet.platform}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-sm text-gray-600">{bet.raceType}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {format(bet.date, 'MMM dd, yyyy')} • {bet.track}, {bet.state}
                          </p>
                          {bet.notes && (
                            <p className="text-sm text-gray-600 mt-1 italic">"{bet.notes}"</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${
                          bet.profitLoss >= 0 ? 'text-success-600' : 'text-danger-600'
                        }`}>
                          {formatCurrency(bet.profitLoss)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Stake: {formatCurrency(bet.stake)}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBet(bet)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBet(bet.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}; 