import React from 'react';
import { useBetContext } from '../context/BetContext';
import { calculateStatistics, formatCurrency, formatPercentage } from '../utils/calculations';
import { SPORTS, BETTING_PLATFORMS, RACE_TYPES } from '../utils/constants';

export const Statistics: React.FC = () => {
  const { state } = useBetContext();
  const { bets } = state;
  
  const stats = calculateStatistics(bets);

  // Calculate breakdowns
  const sportBreakdown = SPORTS.map(sport => {
    const sportBets = bets.filter(bet => bet.sport === sport);
    const sportStats = calculateStatistics(sportBets);
    return { sport, ...sportStats };
  }).filter(item => item.totalBets > 0);

  const platformBreakdown = BETTING_PLATFORMS.map(platform => {
    const platformBets = bets.filter(bet => bet.platform === platform);
    const platformStats = calculateStatistics(platformBets);
    return { platform, ...platformStats };
  }).filter(item => item.totalBets > 0);

  const raceTypeBreakdown = RACE_TYPES.map(raceType => {
    const raceTypeBets = bets.filter(bet => bet.raceType === raceType);
    const raceTypeStats = calculateStatistics(raceTypeBets);
    return { raceType, ...raceTypeStats };
  }).filter(item => item.totalBets > 0);

  const BreakdownCard = ({ title, data, valueKey, formatFn }: any) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{item.name}</span>
            <span className="text-sm font-medium text-gray-900">
              {formatFn ? formatFn(item[valueKey]) : item[valueKey]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
        <p className="text-gray-600 mt-2">Detailed analysis of your betting performance</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Bets</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalBets}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Profit/Loss</h3>
          <p className={`text-2xl font-bold mt-2 ${
            stats.totalProfitLoss >= 0 ? 'text-success-600' : 'text-danger-600'
          }`}>
            {formatCurrency(stats.totalProfitLoss)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Win Rate</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{formatPercentage(stats.winRate)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Average Stake</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(stats.averageStake)}</p>
        </div>
      </div>

      {/* Best/Worst Days */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Day</h3>
          {stats.bestDay.date ? (
            <div>
              <p className="text-2xl font-bold text-success-600">
                {formatCurrency(stats.bestDay.profitLoss)}
              </p>
              <p className="text-sm text-gray-600 mt-1">{stats.bestDay.date}</p>
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Worst Day</h3>
          {stats.worstDay.date ? (
            <div>
              <p className="text-2xl font-bold text-danger-600">
                {formatCurrency(stats.worstDay.profitLoss)}
              </p>
              <p className="text-sm text-gray-600 mt-1">{stats.worstDay.date}</p>
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BreakdownCard
          title="By Sport"
          data={sportBreakdown.map(item => ({
            name: item.sport,
            profitLoss: item.totalProfitLoss,
            totalBets: item.totalBets
          }))}
          valueKey="profitLoss"
          formatFn={formatCurrency}
        />
        
        <BreakdownCard
          title="By Platform"
          data={platformBreakdown.map(item => ({
            name: item.platform,
            profitLoss: item.totalProfitLoss,
            totalBets: item.totalBets
          }))}
          valueKey="profitLoss"
          formatFn={formatCurrency}
        />
        
        <BreakdownCard
          title="By Race Type"
          data={raceTypeBreakdown.map(item => ({
            name: item.raceType,
            profitLoss: item.totalProfitLoss,
            totalBets: item.totalBets
          }))}
          valueKey="profitLoss"
          formatFn={formatCurrency}
        />
      </div>
    </div>
  );
}; 