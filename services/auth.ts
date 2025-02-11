import { Alert } from 'react-native';
import { router } from 'expo-router';

export type AuthResponse = {
  success: boolean;
  error?: string;
  data?: any;
  session?: any;
};

const API_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Adicionar função para gerenciar o token
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getSession = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/v1/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY!,
      },
    });

    if (!response.ok) {
      return { success: false, session: null };
    }

    const data = await response.json();
    return { success: true, session: data };
  } catch (error) {
    return { success: false, session: null };
  }
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY!,
      },
      body: JSON.stringify({
        email,
        password,
        grant_type: 'password',
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error_description || data.message || 'Erro no login');
    }

    // Armazenar o token quando fizer login
    if (data.access_token) {
      setAccessToken(data.access_token);
    }

    return {
      success: true,
      data,
      session: data
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
};

export const signOut = async (): Promise<AuthResponse> => {
  try {
    if (!accessToken) {
      throw new Error('Não há sessão ativa');
    }

    const response = await fetch(`${API_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY!,
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao fazer logout');
    }

    // Limpar o token após logout
    setAccessToken(null);
    return { success: true };
  } catch (error: any) {
    console.error('Logout error details:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const handleLogout = async () => {
  try {
    // Adicione aqui sua lógica de logout com a API
    await Promise.resolve(); // Substitua com sua chamada real
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false;
  }
};

export const handleLogoutConfirmation = () => {
  Alert.alert(
    'Sair',
    'Tem certeza que deseja sair?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => router.push('/logout'),
        style: 'destructive'
      },
    ],
    { cancelable: true }
  );
};
