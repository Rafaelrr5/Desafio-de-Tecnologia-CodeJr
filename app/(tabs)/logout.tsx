import { View, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { handleLogout } from '@/services/auth';

export default function LogoutScreen() {
  useEffect(() => {
    const performLogout = async () => {
      await handleLogout();
      router.replace('../login');
    };
    
    performLogout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}