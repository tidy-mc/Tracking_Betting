import React, { useState } from 'react';
import { useBetContext } from '../context/BetContext';
import { Button } from '../components/ui/Button';
import { Download, Upload, Database, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import { loadSampleData, hasSampleData, clearAllData } from '../utils/sampleData';

export const Settings: React.FC = () => {
  const { state } = useBetContext();
  const { bets } = state;
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showConfirmLoad, setShowConfirmLoad] = useState(false);

  const exportData = () => {
    const data = {
      bets: bets,
      exportDate: new Date().toISOString(),
      totalBets: bets.length,
      totalProfitLoss: bets.reduce((sum, bet) => sum + bet.profitLoss, 0)
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `betting-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.bets && Array.isArray(data.bets)) {
              // Convert date strings back to Date objects
              const processedBets = data.bets.map((bet: any) => ({
                ...bet,
                date: new Date(bet.date),
                createdAt: new Date(bet.createdAt),
                updatedAt: new Date(bet.updatedAt)
              }));
              localStorage.setItem('betting-tracker-bets', JSON.stringify(processedBets));
              window.location.reload();
            } else {
              alert('Invalid file format. Please select a valid betting tracker export file.');
            }
          } catch (error) {
            alert('Error reading file. Please make sure it\'s a valid JSON file.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleLoadSampleData = () => {
    setShowConfirmLoad(true);
  };

  const confirmLoadSampleData = () => {
    loadSampleData();
    setShowConfirmLoad(false);
  };

  const handleClearAllData = () => {
    setShowConfirmClear(true);
  };

  const confirmClearAllData = () => {
    clearAllData();
    setShowConfirmClear(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your data and application settings</p>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
          <p className="text-gray-600 mt-1">Export, import, and manage your betting data</p>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Current Data Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Current Data</h3>
                <p className="text-sm text-gray-600">
                  {bets.length} bets • Total P/L: ${bets.reduce((sum, bet) => sum + bet.profitLoss, 0).toFixed(2)}
                </p>
              </div>
              {hasSampleData() && (
                <div className="flex items-center text-success-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Sample data loaded</span>
                </div>
              )}
            </div>
          </div>

          {/* Sample Data */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Sample Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Load sample data to test all features with realistic betting scenarios.
            </p>
            <Button
              variant="primary"
              onClick={handleLoadSampleData}
              className="flex items-center space-x-2"
            >
              <Database className="w-4 h-4" />
              <span>Load Sample Data (320 bets)</span>
            </Button>
          </div>

          {/* Export/Import */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Export Data</h3>
              <p className="text-sm text-gray-600 mb-4">
                Download all your betting data as a JSON file.
              </p>
              <Button
                variant="secondary"
                onClick={exportData}
                disabled={bets.length === 0}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Import Data</h3>
              <p className="text-sm text-gray-600 mb-4">
                Import betting data from a JSON file.
              </p>
              <Button
                variant="secondary"
                onClick={importData}
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Import Data</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Danger Zone</h2>
          <p className="text-gray-600 mt-1">Irreversible actions</p>
        </div>
        
        <div className="p-6">
          <div className="border border-danger-200 bg-danger-50 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-danger-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-danger-900">Clear All Data</h3>
                <p className="text-sm text-danger-700 mt-1">
                  This will permanently delete all your betting data. This action cannot be undone.
                </p>
                <div className="mt-3">
                  <Button
                    variant="danger"
                    onClick={handleClearAllData}
                    disabled={bets.length === 0}
                    className="flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All Data</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      {showConfirmLoad && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Load Sample Data</h3>
            <p className="text-gray-600 mb-4">
              This will load 320 sample betting records. Any existing data will be replaced. Continue?
            </p>
            <div className="flex space-x-3">
              <Button variant="secondary" onClick={() => setShowConfirmLoad(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={confirmLoadSampleData}>
                Load Sample Data
              </Button>
            </div>
          </div>
        </div>
      )}

      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear All Data</h3>
            <p className="text-gray-600 mb-4">
              This will permanently delete all your betting data. This action cannot be undone. Are you sure?
            </p>
            <div className="flex space-x-3">
              <Button variant="secondary" onClick={() => setShowConfirmClear(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmClearAllData}>
                Clear All Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 