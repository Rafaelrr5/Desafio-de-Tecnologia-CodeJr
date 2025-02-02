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

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'/(tabs)' | '/login'>('/login');

  useEffect(() => {
    checkSession();

    // Add auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setInitialRoute('/(tabs)');
        router.replace('/(tabs)');
      } else {
        setInitialRoute('/login');
        router.replace('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setInitialRoute('/(tabs)');
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SessionContextProvider supabaseClient={supabase}>
        <CartProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen 
                  name="login"
                  options={{ 
                    headerShown: false,
                    presentation: 'modal'
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
              </Stack>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            </SafeAreaProvider>
          </ThemeProvider>
        </CartProvider>
      </SessionContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
