import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Slot, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '@/lib/supabase';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { CartProvider } from '@/contexts/cartContext';
import { getSession } from '@/services/auth';
import { layoutStyles } from '@/styles/layout.styles';
import { PromotionProvider } from '@/contexts/promotionContext';

// Impede que a tela de splash seja escondida automaticamente
SplashScreen.preventAutoHideAsync();

// Layout raiz da aplicação que gerencia autenticação e navegação
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setHasSession(true);
        if (isMounted) {
          router.replace('/(tabs)');
        }
      } else {
        setHasSession(false);
        if (isMounted) {
          // Força redirecionamento para login e reseta a navegação
          router.reset({
            index: 0,
            routes: [{ name: 'login' }],
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [isMounted]);

  const checkSession = async () => {
    try {
      const { success, session } = await getSession();
      setHasSession(success && !!session);
    } catch (error) {
      console.error('Session check error:', error);
      setHasSession(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!loaded || loading) {
    return (
      <View style={layoutStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={layoutStyles.container}>
      <PromotionProvider>
        <SessionContextProvider supabaseClient={supabase}>
          <CartProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <SafeAreaProvider>
                <Stack 
                  screenOptions={{ headerShown: false }}
                  initialRouteName={hasSession ? '(tabs)' : 'login'}
                >
                  <Stack.Screen
                    name="(tabs)"
                    options={{
                      // Prevent going back to login
                      gestureEnabled: false
                    }}
                  />
                  <Stack.Screen 
                    name="login"
                    options={{ 
                      headerShown: false,
                      presentation: 'modal',
                      // Prevent going back if not logged in
                      gestureEnabled: hasSession
                    }} 
                  />
                  <Stack.Screen 
                    name="register"
                    options={{ 
                      headerShown: false,
                      presentation: 'modal'
                    }} 
                  />
                  <Stack.Screen 
                    name="BeerDetailsModal"
                    options={{ presentation: 'modal' }} 
                  />
                  <Stack.Screen name="forgotpass" />
                  <Stack.Screen name="notifications" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="security" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="payment" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="help" options={{ presentation: 'modal' }} />
                </Stack>
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              </SafeAreaProvider>
            </ThemeProvider>
          </CartProvider>
        </SessionContextProvider>
      </PromotionProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
