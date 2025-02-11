const API_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const headers = {
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal'
};

export const api = {
  async signIn(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async signUp(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/v1/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async signOut(token: string) {
    const response = await fetch(`${API_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: { ...headers, 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

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

  // Beer CRUD operations
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
    // Return true if successful, throw error otherwise
    if (response.ok) return true;
    throw new Error('Failed to delete beer');
  },

  // Promotion CRUD operations
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
    // Return true if successful, throw error otherwise
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

interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const getUserProfile = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/v1/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY!,
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
};