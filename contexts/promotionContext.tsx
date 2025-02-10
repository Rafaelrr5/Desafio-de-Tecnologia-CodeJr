import { createContext, useContext, useState } from 'react';
import { PromotionError } from '@/utils/errors';

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at?: string;
}

interface PromotionContextType {
  promotions: Promotion[];
  loading: boolean;
  error: string | null;
  fetchPromotions: () => Promise<void>;
  createPromotion: (promotion: Omit<Promotion, 'id'>) => Promise<void>;
  updatePromotion: (id: string, promotion: Partial<Promotion>) => Promise<void>;
  deletePromotion: (id: string) => Promise<void>;
  togglePromotionStatus: (id: string) => Promise<void>;
  getActivePromotions: () => Promotion[];
}

export const PromotionContext = createContext<PromotionContextType | undefined>(undefined);

export const usePromotionContext = () => useContext(PromotionContext);

export function PromotionProvider({ children }) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/promotions?select=*`,
        {
          headers: {
            'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new PromotionError('Falha ao carregar promoções', 'FETCH_ERROR', response.status);
      }
      
      const data = await response.json();
      setPromotions(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar promoções');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createPromotion = async (promotion: Omit<Promotion, 'id' | 'created_at'>) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/promotions`,
        {
          method: 'POST',
          headers: {
            'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            ...promotion,
            is_active: promotion.is_active ?? true,
            start_date: new Date(promotion.start_date).toISOString(),
            end_date: new Date(promotion.end_date).toISOString()
          })
        }
      );

      if (!response.ok) {
        throw new PromotionError('Falha ao criar promoção', 'CREATE_ERROR', response.status);
      }

      await fetchPromotions();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar promoção');
      throw err;
    }
  };

  const updatePromotion = async (id: string, promotion: Partial<Promotion>) => {
    try {
      if (!id) throw new PromotionError('ID da promoção é necessário', 'UPDATE_ERROR');

      const apiData = {
        ...(promotion.title && { title: promotion.title }),
        ...(promotion.description && { description: promotion.description }),
        ...(promotion.discount && { discount: promotion.discount }),
        ...(promotion.start_date && { start_date: new Date(promotion.start_date).toISOString() }),
        ...(promotion.end_date && { end_date: new Date(promotion.end_date).toISOString() }),
        ...(typeof promotion.is_active !== 'undefined' && { is_active: promotion.is_active })
      };

      console.log('Updating promotion:', { id, data: apiData });

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/promotions?id=eq.${id}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(apiData)
        }
      );

      const responseData = await response.text();
      console.log('API Response:', response.status, responseData);

      if (!response.ok) {
        throw new PromotionError(
          `Falha ao atualizar promoção: ${responseData}`,
          'UPDATE_ERROR',
          response.status
        );
      }

      const updatedData = responseData ? JSON.parse(responseData) : null;
      if (updatedData && updatedData[0]) {
        setPromotions(current => 
          current.map(p => p.id === id ? { ...p, ...updatedData[0] } : p)
        );
      }

      await fetchPromotions();
      setError(null);
    } catch (err) {
      console.error('Update error details:', err);
      if (err instanceof PromotionError) {
        setError(err.message);
      } else {
        setError('Erro inesperado ao atualizar promoção. Tente novamente.');
      }
      throw err;
    }
  };

  const deletePromotion = async (id: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/promotions?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        }
      });

      if (!response.ok) throw new Error('Failed to delete promotion');
      await fetchPromotions();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const togglePromotionStatus = async (id: string) => {
    try {
      const promotion = promotions.find(p => p.id === id);
      if (!promotion) {
        throw new PromotionError('Promoção não encontrada', 'UPDATE_ERROR');
      }

      const updatedPromotion = {
        ...promotion,
        is_active: !promotion.is_active,
      };

      await updatePromotion(id, updatedPromotion);
    } catch (err) {
      console.error('Toggle status error:', err);
      throw err;
    }
  };

  const getActivePromotions = () => {
    return promotions.filter(promotion => promotion.is_active);
  };

  return (
    <PromotionContext.Provider value={{
      promotions,
      loading,
      error,
      fetchPromotions,
      createPromotion,
      updatePromotion,
      deletePromotion,
      togglePromotionStatus,
      getActivePromotions
    }}>
      {children}
    </PromotionContext.Provider>
  );
}

export const usePromotions = () => {
  const context = useContext(PromotionContext);
  if (!context) throw new Error('usePromotions must be used within a PromotionProvider');
  return context;
};
