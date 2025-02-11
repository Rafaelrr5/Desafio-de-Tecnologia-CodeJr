import { View, ActivityIndicator, Alert } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { handleLogout } from '@/services/auth';

export default function LogoutScreen() {
  useEffect(() => {
    const performLogout = async () => {
      const success = await handleLogout();
      if (success) {
        router.replace('../login');
      } else {
        Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
        router.back();
      }
    };
    
    performLogout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}