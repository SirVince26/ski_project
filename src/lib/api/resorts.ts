import { createClient } from '@/lib/supabase/server';
import { Resort } from '@/lib/types';

export async function getResorts(): Promise<Resort[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('resorts')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching resorts:', error);
    return [];
  }
  
  return data as Resort[];
}

export async function getResortBySlug(slug: string): Promise<Resort | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('resorts')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (error) {
    console.error(`Error fetching resort ${slug}:`, error);
    return null;
  }
  
  return data as Resort;
}
