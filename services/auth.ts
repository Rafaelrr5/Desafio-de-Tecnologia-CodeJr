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
    // Tenta fazer logout no servidor se houver token
    if (accessToken) {
      await fetch(`${API_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': API_KEY!,
          'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      });
    }

    // Limpa o token local independente da resposta do servidor
    setAccessToken(null);
    
    // Força limpeza do cache de autenticação
    await Promise.all([
      fetch(`${API_URL}/auth/v1/user`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }),
      // Invalida a sessão atual
      fetch(`${API_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': API_KEY!,
        },
      })
    ]);

    return { success: true };
  } catch (error: any) {
    console.error('Logout error details:', error);
    // Retorna sucesso mesmo se houver erro, já que limpamos localmente
    return { success: true };
  }
};

export const handleLogout = async () => {
  try {
    const result = await signOut();
    if (result.success) {
      return true;
    }
    console.error('Erro ao fazer logout:', result.error);
    return false;
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
