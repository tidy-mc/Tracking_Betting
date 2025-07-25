import { BettingPlatform, RaceType } from '../types';

export const BETTING_PLATFORMS = Object.values(BettingPlatform);
export const RACE_TYPES = Object.values(RaceType);

export const SPORTS = [
  'Horse Racing',
  'Greyhound Racing',
  'Football',
  'Basketball',
  'Tennis',
  'Cricket',
  'Rugby',
  'AFL',
  'NRL',
  'Other'
];

export const AUSTRALIAN_STATES = [
  'NSW',
  'VIC',
  'QLD',
  'WA',
  'SA',
  'TAS',
  'NT',
  'ACT'
];

export const TRACKS = {
  'NSW': ['Randwick', 'Rosehill', 'Warwick Farm', 'Canterbury', 'Hawkesbury', 'Kembla Grange'],
  'VIC': ['Flemington', 'Caulfield', 'Moonee Valley', 'Sandown', 'Geelong', 'Ballarat'],
  'QLD': ['Eagle Farm', 'Doomben', 'Gold Coast', 'Sunshine Coast', 'Toowoomba'],
  'WA': ['Ascot', 'Belmont', 'Northam', 'Pinjarra'],
  'SA': ['Morphettville', 'Murray Bridge', 'Gawler', 'Oakbank'],
  'TAS': ['Elwick', 'Launceston', 'Devonport'],
  'NT': ['Fannie Bay'],
  'ACT': ['Canberra']
};

export const STORAGE_KEYS = {
  BETS: 'betting-tracker-bets',
  SETTINGS: 'betting-tracker-settings'
}; 