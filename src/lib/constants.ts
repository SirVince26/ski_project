import { Region, DifficultyLevel } from './types';

export const REGIONS: { label: string; value: Region }[] = [
  { label: 'New England', value: 'new-england' },
  { label: 'Mid-Atlantic', value: 'mid-atlantic' },
  { label: 'Southeast', value: 'southeast' },
  { label: 'Rockies', value: 'rockies' },
  { label: 'West Coast', value: 'west-coast' },
  { label: 'Midwest', value: 'midwest' },
];

export const DIFFICULTY_LEVELS: { label: string; value: DifficultyLevel }[] = [
  { label: 'All Levels', value: 'all-levels' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];
