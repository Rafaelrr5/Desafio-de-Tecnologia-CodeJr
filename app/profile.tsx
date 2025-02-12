import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '@/components/Header';
import { profileStyles as styles } from '@/styles/profileStyles';
import { router } from 'expo-router';

interface UserData {
  email: string;
  name?: string;
}

export default function ProfileScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUserData({
          email: parsed.user?.email || parsed.email,
          name: parsed.user?.name || 'Usuário',
        });
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Perfil" showBack />
        <View style={styles.content}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Perfil" showBack />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.header}>Informações Pessoais</Text>
          
          <View style={styles.section}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{userData?.name}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userData?.email}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
