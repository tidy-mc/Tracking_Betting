import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Bet, BetFormData, FilterOptions } from '../types';
import { loadBets, saveBets } from '../utils/storage';
import { calculateProfitLoss } from '../utils/calculations';

interface BetState {
  bets: Bet[];
  filters: FilterOptions;
  loading: boolean;
}

type BetAction =
  | { type: 'ADD_BET'; payload: BetFormData }
  | { type: 'UPDATE_BET'; payload: { id: string; data: BetFormData } }
  | { type: 'DELETE_BET'; payload: string }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'LOAD_BETS'; payload: Bet[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: BetState = {
  bets: [],
  filters: {},
  loading: false
};

function betReducer(state: BetState, action: BetAction): BetState {
  switch (action.type) {
    case 'ADD_BET': {
      const newBet: Bet = {
        id: crypto.randomUUID(),
        date: new Date(action.payload.date),
        sport: action.payload.sport,
        platform: action.payload.platform,
        stake: action.payload.stake,
        return: action.payload.return,
        profitLoss: calculateProfitLoss(action.payload.stake, action.payload.return),
        raceType: action.payload.raceType,
        state: action.payload.state,
        track: action.payload.track,
        notes: action.payload.notes,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const updatedBets = [...state.bets, newBet];
      saveBets(updatedBets);
      
      return {
        ...state,
        bets: updatedBets
      };
    }
    
    case 'UPDATE_BET': {
      const updatedBets = state.bets.map(bet => 
        bet.id === action.payload.id 
          ? {
              ...bet,
              date: new Date(action.payload.data.date),
              sport: action.payload.data.sport,
              platform: action.payload.data.platform,
              stake: action.payload.data.stake,
              return: action.payload.data.return,
              profitLoss: calculateProfitLoss(action.payload.data.stake, action.payload.data.return),
              raceType: action.payload.data.raceType,
              state: action.payload.data.state,
              track: action.payload.data.track,
              notes: action.payload.data.notes,
              updatedAt: new Date()
            }
          : bet
      );
      
      saveBets(updatedBets);
      
      return {
        ...state,
        bets: updatedBets
      };
    }
    
    case 'DELETE_BET': {
      const updatedBets = state.bets.filter(bet => bet.id !== action.payload);
      saveBets(updatedBets);
      
      return {
        ...state,
        bets: updatedBets
      };
    }
    
    case 'SET_FILTERS': {
      return {
        ...state,
        filters: action.payload
      };
    }
    
    case 'LOAD_BETS': {
      return {
        ...state,
        bets: action.payload
      };
    }
    
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload
      };
    }
    
    default:
      return state;
  }
}

interface BetContextType {
  state: BetState;
  addBet: (betData: BetFormData) => void;
  updateBet: (id: string, betData: BetFormData) => void;
  deleteBet: (id: string) => void;
  setFilters: (filters: FilterOptions) => void;
}

const BetContext = createContext<BetContextType | undefined>(undefined);

export const useBetContext = () => {
  const context = useContext(BetContext);
  if (context === undefined) {
    throw new Error('useBetContext must be used within a BetProvider');
  }
  return context;
};

interface BetProviderProps {
  children: ReactNode;
}

export const BetProvider: React.FC<BetProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(betReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    const loadStoredBets = async () => {
      try {
        const bets = loadBets();
        dispatch({ type: 'LOAD_BETS', payload: bets });
      } catch (error) {
        console.error('Error loading bets:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadStoredBets();
  }, []);

  const addBet = (betData: BetFormData) => {
    dispatch({ type: 'ADD_BET', payload: betData });
  };

  const updateBet = (id: string, betData: BetFormData) => {
    dispatch({ type: 'UPDATE_BET', payload: { id, data: betData } });
  };

  const deleteBet = (id: string) => {
    dispatch({ type: 'DELETE_BET', payload: id });
  };

  const setFilters = (filters: FilterOptions) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const value: BetContextType = {
    state,
    addBet,
    updateBet,
    deleteBet,
    setFilters
  };

  return (
    <BetContext.Provider value={value}>
      {children}
    </BetContext.Provider>
  );
}; 