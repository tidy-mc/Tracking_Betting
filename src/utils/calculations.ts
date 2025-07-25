import type { Bet, Statistics, ChartData, FilterOptions } from '../types';
import { format, startOfDay, endOfDay, isWithinInterval } from 'date-fns';

export const calculateProfitLoss = (stake: number, returnAmount: number): number => {
  return returnAmount - stake;
};

export const calculateStatistics = (bets: Bet[]): Statistics => {
  if (bets.length === 0) {
    return {
      totalBets: 0,
      totalStake: 0,
      totalReturn: 0,
      totalProfitLoss: 0,
      winRate: 0,
      averageStake: 0,
      averageReturn: 0,
      bestDay: { date: '', profitLoss: 0 },
      worstDay: { date: '', profitLoss: 0 }
    };
  }

  const totalBets = bets.length;
  const totalStake = bets.reduce((sum, bet) => sum + bet.stake, 0);
  const totalReturn = bets.reduce((sum, bet) => sum + bet.return, 0);
  const totalProfitLoss = bets.reduce((sum, bet) => sum + bet.profitLoss, 0);
  const winningBets = bets.filter(bet => bet.profitLoss > 0).length;
  const winRate = (winningBets / totalBets) * 100;
  const averageStake = totalStake / totalBets;
  const averageReturn = totalReturn / totalBets;

  // Calculate daily profit/loss
  const dailyProfitLoss = bets.reduce((acc, bet) => {
    const dateKey = format(bet.date, 'yyyy-MM-dd');
    acc[dateKey] = (acc[dateKey] || 0) + bet.profitLoss;
    return acc;
  }, {} as Record<string, number>);

  const dailyEntries = Object.entries(dailyProfitLoss);
  const bestDay = dailyEntries.reduce((best, [date, profitLoss]) => 
    profitLoss > best.profitLoss ? { date, profitLoss } : best, 
    { date: '', profitLoss: -Infinity }
  );
  const worstDay = dailyEntries.reduce((worst, [date, profitLoss]) => 
    profitLoss < worst.profitLoss ? { date, profitLoss } : worst, 
    { date: '', profitLoss: Infinity }
  );

  return {
    totalBets,
    totalStake,
    totalReturn,
    totalProfitLoss,
    winRate,
    averageStake,
    averageReturn,
    bestDay,
    worstDay
  };
};

export const filterBets = (bets: Bet[], filters: FilterOptions): Bet[] => {
  return bets.filter(bet => {
    // Sport filter
    if (filters.sport && bet.sport !== filters.sport) return false;
    
    // Platform filter
    if (filters.platform && bet.platform !== filters.platform) return false;
    
    // Race type filter
    if (filters.raceType && bet.raceType !== filters.raceType) return false;
    
    // State filter
    if (filters.state && bet.state !== filters.state) return false;
    
    // Track filter
    if (filters.track && bet.track !== filters.track) return false;
    
    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      const betDate = startOfDay(bet.date);
      const fromDate = filters.dateFrom ? startOfDay(new Date(filters.dateFrom)) : null;
      const toDate = filters.dateTo ? endOfDay(new Date(filters.dateTo)) : null;
      
      if (fromDate && toDate) {
        return isWithinInterval(betDate, { start: fromDate, end: toDate });
      } else if (fromDate) {
        return betDate >= fromDate;
      } else if (toDate) {
        return betDate <= toDate;
      }
    }
    
    return true;
  });
};

export const generateChartData = (bets: Bet[]): ChartData[] => {
  if (bets.length === 0) return [];

  // Sort bets by date
  const sortedBets = [...bets].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Group by date and calculate daily profit/loss
  const dailyData = sortedBets.reduce((acc, bet) => {
    const dateKey = format(bet.date, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = { date: dateKey, profitLoss: 0, cumulativeProfitLoss: 0 };
    }
    acc[dateKey].profitLoss += bet.profitLoss;
    return acc;
  }, {} as Record<string, ChartData>);

  // Calculate cumulative profit/loss
  let cumulative = 0;
  const chartData: ChartData[] = Object.values(dailyData).map(day => {
    cumulative += day.profitLoss;
    return {
      ...day,
      cumulativeProfitLoss: cumulative
    };
  });

  return chartData;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD'
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
}; 