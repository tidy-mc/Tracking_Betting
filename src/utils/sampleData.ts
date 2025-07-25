import { Bet } from '../types';
import { BettingPlatform, RaceType } from '../types';

// Sample data generator based on the CSV structure
export const generateSampleData = (): Bet[] => {
  const sampleBets: Bet[] = [];
  
  // Sample tracks and states
  const tracks = {
    'NSW': ['Randwick', 'Rosehill', 'Warwick Farm', 'Canterbury', 'Hawkesbury'],
    'VIC': ['Flemington', 'Caulfield', 'Moonee Valley', 'Sandown', 'Geelong'],
    'QLD': ['Eagle Farm', 'Doomben', 'Gold Coast', 'Sunshine Coast'],
    'WA': ['Ascot', 'Belmont', 'Northam', 'Pinjarra'],
    'SA': ['Morphettville', 'Murray Bridge', 'Gawler', 'Oakbank']
  };

  // Sample sports and events
  const sports = [
    'Horse Racing',
    'Greyhound Racing',
    'Football',
    'Basketball',
    'Tennis',
    'Cricket',
    'Rugby',
    'AFL',
    'NRL'
  ];

  // Sample runners/teams for different sports
  const horseNames = [
    'Desert King', 'Lightning Strike', 'Golden Arrow', 'Silver Star', 'Thunder Bolt',
    'Royal Crown', 'Diamond Edge', 'Swift Wind', 'Iron Horse', 'Blue Moon',
    'Red Rocket', 'Green Machine', 'Black Beauty', 'White Knight', 'Purple Rain'
  ];

  const teamNames = {
    'Football': ['Sydney FC', 'Melbourne City', 'Brisbane Roar', 'Perth Glory', 'Adelaide United'],
    'Basketball': ['Sydney Kings', 'Melbourne United', 'Brisbane Bullets', 'Perth Wildcats', 'Adelaide 36ers'],
    'Tennis': ['Djokovic', 'Nadal', 'Federer', 'Medvedev', 'Zverev'],
    'Cricket': ['Australia', 'England', 'India', 'New Zealand', 'South Africa'],
    'Rugby': ['NSW Waratahs', 'QLD Reds', 'ACT Brumbies', 'WA Force', 'VIC Rebels'],
    'AFL': ['Sydney Swans', 'Melbourne Demons', 'Brisbane Lions', 'West Coast Eagles', 'Adelaide Crows'],
    'NRL': ['Sydney Roosters', 'Melbourne Storm', 'Brisbane Broncos', 'Penrith Panthers', 'Parramatta Eels']
  };

  // Generate 300+ sample bets
  for (let i = 0; i < 320; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // Last 90 days
    
    const sport = sports[Math.floor(Math.random() * sports.length)];
    const platform = Object.values(BettingPlatform)[Math.floor(Math.random() * Object.values(BettingPlatform).length)];
    const raceType = Object.values(RaceType)[Math.floor(Math.random() * Object.values(RaceType).length)];
    
    // Generate realistic stakes and returns
    const stake = Math.floor(Math.random() * 400) + 10; // $10-$410
    const winRate = sport === 'Horse Racing' ? 0.15 : 0.45; // Horse racing is harder to win
    const isWin = Math.random() < winRate;
    const returnAmount = isWin ? stake * (1.5 + Math.random() * 3) : 0; // 1.5x to 4.5x for wins
    
    // Generate track and state for racing sports
    let track = '';
    let state = '';
    if (sport === 'Horse Racing' || sport === 'Greyhound Racing') {
      const states = Object.keys(tracks);
      state = states[Math.floor(Math.random() * states.length)];
      const stateTracks = tracks[state as keyof typeof tracks];
      track = stateTracks[Math.floor(Math.random() * stateTracks.length)];
    } else {
      // For team sports, use team names as "track"
      const teams = teamNames[sport as keyof typeof teamNames] || ['Team A', 'Team B'];
      track = teams[Math.floor(Math.random() * teams.length)];
      state = 'NSW'; // Default for team sports
    }

    // Generate event details
    const eventDetails = sport === 'Horse Racing' 
      ? `Race ${Math.floor(Math.random() * 10) + 1} - ${horseNames[Math.floor(Math.random() * horseNames.length)]}`
      : `${track} vs ${teamNames[sport as keyof typeof teamNames]?.[Math.floor(Math.random() * 5)] || 'Opponent'}`;

    const bet: Bet = {
      id: `bet_${i + 1}`,
      date: date,
      sport: sport,
      platform: platform as BettingPlatform,
      stake: stake,
      return: returnAmount,
      profitLoss: returnAmount - stake,
      raceType: raceType as RaceType,
      state: state,
      track: track,
      notes: `${eventDetails} - ${isWin ? 'WIN' : 'LOSS'}`,
      createdAt: date,
      updatedAt: date
    };

    sampleBets.push(bet);
  }

  // Sort by date (newest first)
  return sampleBets.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Function to load sample data into localStorage
export const loadSampleData = (): void => {
  const sampleBets = generateSampleData();
  localStorage.setItem('betting-tracker-bets', JSON.stringify(sampleBets));
  window.location.reload(); // Refresh to show the new data
};

// Function to check if sample data is loaded
export const hasSampleData = (): boolean => {
  const storedBets = localStorage.getItem('betting-tracker-bets');
  if (!storedBets) return false;
  
  const bets = JSON.parse(storedBets);
  return bets.length > 0;
};

// Function to clear all data
export const clearAllData = (): void => {
  localStorage.removeItem('betting-tracker-bets');
  window.location.reload();
}; 