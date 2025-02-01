import { supabase } from '../lib/supabase';
import { Beer } from '../types/beer';

export async function getBeerById(id: number): Promise<Beer | null> {
  const { data, error } = await supabase
    .from('beers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
