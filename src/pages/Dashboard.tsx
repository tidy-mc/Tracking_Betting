import React from 'react';
import { useBetContext } from '../context/BetContext';
import { ProfitLossChart } from '../components/charts/ProfitLossChart';
import { calculateStatistics, generateChartData, formatCurrency, formatPercentage } from '../utils/calculations';
import { Database, TrendingUp, Target, DollarSign, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { loadSampleData } from '../utils/sampleData';

export const Dashboard: React.FC = () => {
  const { state } = useBetContext();
  const { bets } = state;
  
  const stats = calculateStatistics(bets);
  const chartData = generateChartData(bets);

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'text-gray-900' }: {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    color?: string;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color} mt-2`}>{value}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="p-3 bg-primary-100 rounded-full">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
      </div>
    </div>
  );

  // Empty state when no bets exist
  if (bets.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your betting performance and profits</p>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Database className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Betting Tracker</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start tracking your betting performance by adding your first bet or loading sample data to explore all features.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                onClick={loadSampleData}
                className="flex items-center space-x-2"
              >
                <Database className="w-4 h-4" />
                <span>Load Sample Data (320 bets)</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.location.href = '/bets'}
                className="flex items-center space-x-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Add Your First Bet</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Track Performance</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Monitor your profit/loss over time with detailed charts and analytics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Analyze Patterns</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Identify your best performing sports, platforms, and betting strategies.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Detailed Statistics</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Get comprehensive insights with win rates, averages, and breakdowns.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Normal dashboard with data
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your betting performance and profits</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Profit/Loss"
          value={formatCurrency(stats.totalProfitLoss)}
          subtitle={`${stats.totalBets} bets`}
          icon={TrendingUp}
          color={stats.totalProfitLoss >= 0 ? 'text-success-600' : 'text-danger-600'}
        />
        
        <StatCard
          title="Win Rate"
          value={formatPercentage(stats.winRate)}
          subtitle={`${stats.totalBets} total bets`}
          icon={Target}
        />
        
        <StatCard
          title="Average Stake"
          value={formatCurrency(stats.averageStake)}
          subtitle="Per bet"
          icon={DollarSign}
        />
        
        <StatCard
          title="Total Staked"
          value={formatCurrency(stats.totalStake)}
          subtitle="Total amount wagered"
          icon={BarChart3}
        />
      </div>

      {/* Chart */}
      <ProfitLossChart data={chartData} height={400} />

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        
        <div className="p-6">
          {bets.slice(0, 5).map((bet) => (
            <div key={bet.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900">{bet.sport}</h4>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{bet.platform}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {bet.track}, {bet.state} • {bet.date.toLocaleDateString()}
                </p>
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 