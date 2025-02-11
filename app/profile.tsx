import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { profileStyles as styles } from '@/styles/profileStyles';

export default function ProfileScreen() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUserEmail(userData.user?.email || userData.email);
        }
      } catch (error) {
        console.error('Error loading profile from storage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Perfil" />
      <ThemedView style={styles.content}>
        {loading ? (
          <ThemedText>Carregando...</ThemedText>
        ) : (
          <View style={styles.infoContainer}>
            <ThemedText style={styles.label}>Email:</ThemedText>
            <ThemedText style={styles.email}>{userEmail}</ThemedText>
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}
