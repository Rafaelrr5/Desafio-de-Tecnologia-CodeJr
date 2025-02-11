const API_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const headers = {
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal'
};

export const api = {

  async getBeers() {
    const response = await fetch(`${API_URL}/rest/v1/beers?select=*`, {
      headers,
    });
    return response.json();
  },

  async getBeerById(id: string) {
    const response = await fetch(`${API_URL}/rest/v1/beers?id=eq.${id}&select=*`, {
      headers,
    });
    const data = await response.json();
    return data[0];
  },

  async getCartItems(userId: string) {
    const response = await fetch(
      `${API_URL}/rest/v1/cart_items?user_id=eq.${userId}&select=*,beers(*)`, 
      { headers }
    );
    return response.json();
  },

  async removeCartItem(id: string) {
    const response = await fetch(`${API_URL}/rest/v1/cart_items?id=eq.${id}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  },

  // Crud da cerveja
  async createBeer(beer: Beer) {
    const response = await fetch(`${API_URL}/rest/v1/beers`, {
      method: 'POST',
      headers: {
        ...headers,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(beer),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error:', errorData);
      throw new Error(errorData.message || 'Failed to create beer');
    }

    return response.json();
  },

  async updateBeer(id: string, beer: Partial<Beer>) {
    const response = await fetch(`${API_URL}/rest/v1/beers?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        ...headers,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(beer)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update beer');
    }

    return response.json();
  },

  async deleteBeer(id: string) {
    const response = await fetch(`${API_URL}/rest/v1/beers?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Prefer': 'return=minimal',
      },
    });
    if (response.ok) return true;
    throw new Error('Failed to delete beer');
  },

  // Operações CRUD para promoções
  async createPromotion(promotion: Promotion) {
    const response = await fetch(`${API_URL}/rest/v1/promotions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(promotion),
    });
    return response.json();
  },

  async updatePromotion(id: string, promotion: Partial<Promotion>) {
    const response = await fetch(`${API_URL}/rest/v1/promotions?id=eq.${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(promotion),
    });
    return response.json();
  },

  async deletePromotion(id: string) {
    const response = await fetch(`${API_URL}/rest/v1/promotions?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Prefer': 'return=minimal',
      },
    });
    if (response.ok) return true;
    throw new Error('Failed to delete promotion');
  },

  async getPromotions() {
    const response = await fetch(`${API_URL}/rest/v1/promotions?select=*`, {
      headers,
    });
    return response.json();
  }
};