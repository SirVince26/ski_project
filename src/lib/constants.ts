import { Region, DifficultyLevel } from './types';

export const REGIONS: { label: string; value: Region }[] = [
  { label: 'New England', value: 'new-england' },
  { label: 'Mid-Atlantic', value: 'mid-atlantic' },
  { label: 'Southeast', value: 'southeast' },
];

export const DIFFICULTY_LEVELS: { label: string; value: DifficultyLevel }[] = [
  { label: 'All Levels', value: 'all-levels' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];
