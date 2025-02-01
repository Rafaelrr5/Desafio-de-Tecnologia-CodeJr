import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '@/lib/supabase';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="forgotpass" />
            <Stack.Screen name="register" />
            <Stack.Screen name="Settings" />
            <Stack.Screen name="PromotionManagement" />
            <Stack.Screen name="BeerManagement" />
            <Stack.Screen 
              name="BeerDetailsModal" 
              options={{
                presentation: 'modal',
                headerShown: false,
                animation: 'slide_from_bottom',
              }} 
            />
          </Stack>
        </SafeAreaProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SessionContextProvider>
  );
}
