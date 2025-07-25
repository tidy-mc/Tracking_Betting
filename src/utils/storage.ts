import { Bet } from '../types';
import { STORAGE_KEYS } from './constants';

export const saveBets = (bets: Bet[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.BETS, JSON.stringify(bets));
  } catch (error) {
    console.error('Error saving bets to localStorage:', error);
  }
};

export const loadBets = (): Bet[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.BETS);
    if (!stored) return [];
    
    const bets = JSON.parse(stored);
    // Convert date strings back to Date objects
    return bets.map((bet: any) => ({
      ...bet,
      date: new Date(bet.date),
      createdAt: new Date(bet.createdAt),
      updatedAt: new Date(bet.updatedAt)
    }));
  } catch (error) {
    console.error('Error loading bets from localStorage:', error);
    return [];
  }
};

export const saveSettings = (settings: any): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
  }
};

export const loadSettings = (): any => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading settings from localStorage:', error);
    return {};
  }
}; 