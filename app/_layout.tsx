import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Slot, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setIsMounted(true);
    if (loaded && isMounted) {
      router.replace('/login');
    }
  }, [loaded, isMounted]);

  if (!loaded || !isMounted) {
    return (
      <View style={layoutStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={layoutStyles.container}>
      <PromotionProvider>
          <CartProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <SafeAreaProvider>
                <Stack 
                  screenOptions={{ headerShown: false }}
                  initialRouteName="login" 
                >
                  <Stack.Screen
                    name="login"
                    options={{ 
                      headerShown: false,
                      gestureEnabled: false
                    }} 
                  />
                  <Stack.Screen
                    name="(tabs)"
                    options={{
                      gestureEnabled: false
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
                  <Stack.Screen 
                    name="notifications"
                    options={{ 
                      headerShown: false,
                    }} 
                  />
                  <Stack.Screen 
                    name="payment"
                    options={{ 
                      headerShown: false,
                    }} 
                  />                  
                  <Stack.Screen name="forgotpass" />
                </Stack>
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              </SafeAreaProvider>
            </ThemeProvider>
          </CartProvider>
      </PromotionProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
