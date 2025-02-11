import { Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse } from '@/types/auth';

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
    // First, clear local storage to ensure user data is removed
    await AsyncStorage.multiRemove(['@user', '@userToken']);
    
    // Only attempt server logout if we have a token
    if (accessToken) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        await fetch(`${API_URL}/auth/v1/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': API_KEY!,
            'Authorization': `Bearer ${accessToken}`,
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);
      } catch (serverError) {
        // Log but don't throw - we want to continue with local cleanup
        console.warn('Server logout failed:', serverError);
      }
    }

    // Clear access token last
    setAccessToken(null);

    return { success: true };
  } catch (error: any) {
    console.error('Logout error:', error);
    // Even if there's an error, we want to clear local state
    try {
      await AsyncStorage.clear();
      setAccessToken(null);
    } catch (clearError) {
      console.error('Failed to clear local storage:', clearError);
    }
    return { success: true };
  }
};

export const handleLogout = async () => {
  try {
    const result = await signOut();
    if (result.success) {
      router.replace('/login');
      return true;
    }
    Alert.alert('Erro', 'Houve um problema ao fazer logout. Tente novamente.');
    return false;
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
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
        onPress: async () => {
          await handleLogout();
        },
        style: 'destructive'
      },
    ],
    { cancelable: true }
  );
};

export const checkStoredUser = async (): Promise<boolean> => {
  try {
    const storedUser = await AsyncStorage.getItem('@user');
    if (storedUser) {
      router.replace('/(tabs)');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking stored user:', error);
    return false;
  }
};

export const handleSuccessfulLogin = async (session: any) => {
  try {
    await AsyncStorage.setItem('@user', JSON.stringify(session));
    router.replace('/(tabs)');
    return true;
  } catch (error) {
    console.error('Error storing user data:', error);
    return false;
  }
};