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
  }
};
