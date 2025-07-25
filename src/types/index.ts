export const BettingPlatform = {
  TAB: 'TAB',
  LADBROKES: 'Ladbrokes',
  BETFAIR: 'Betfair',
  SPORTSBET: 'Sportsbet',
  TABTOUCH: 'Tabtouch',
  PICKLEBET: 'Picklebet'
} as const;

export const RaceType = {
  HARNESS: 'Harness',
  GALLOPS: 'Gallops',
  GREYHOUNDS: 'Greyhounds'
} as const;

export type BettingPlatform = typeof BettingPlatform[keyof typeof BettingPlatform];
export type RaceType = typeof RaceType[keyof typeof RaceType];

export interface Bet {
  id: string;
  date: Date;
  sport: string;
  platform: BettingPlatform;
  stake: number;
  return: number;
  profitLoss: number;
  raceType: RaceType;
  state: string;
  track: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BetFormData {
  date: string;
  sport: string;
  platform: BettingPlatform;
  stake: number;
  return: number;
  raceType: RaceType;
  state: string;
  track: string;
  notes?: string;
}

export interface FilterOptions {
  sport?: string;
  platform?: BettingPlatform;
  raceType?: RaceType;
  state?: string;
  track?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface Statistics {
  totalBets: number;
  totalStake: number;
  totalReturn: number;
  totalProfitLoss: number;
  winRate: number;
  averageStake: number;
  averageReturn: number;
  bestDay: { date: string; profitLoss: number };
  worstDay: { date: string; profitLoss: number };
}

export interface ChartData {
  date: string;
  profitLoss: number;
  cumulativeProfitLoss: number;
} 