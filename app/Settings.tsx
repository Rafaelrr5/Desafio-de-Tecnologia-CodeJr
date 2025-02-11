import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/styles/Settings.styles';

const Settings = () => {
  const settingsOptions = [
    {
      title: 'Perfil',
      icon: 'person-outline',
      path: '/profile'
    },
    {
      title: 'Notificações',
      icon: 'notifications-outline',
      path: '/notifications'
    },
    {
      title: 'Pagamento',
      icon: 'card-outline',
      path: '/payment'
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#6A3805" />
          </TouchableOpacity>
          <Text style={styles.title}>Configurações</Text>
        </View>

        {settingsOptions.map((option, index) => (
          option.path ? (
            <Link key={index} href={option.path as any} asChild>
              <TouchableOpacity>
                <Card style={styles.card}>
                  <Card.Content style={styles.cardContent}>
                    <Ionicons name={option.icon as keyof typeof Ionicons.glyphMap} size={24} color="#de9606" />
                    <Text style={styles.optionText}>{option.title}</Text>
                    <Ionicons name="chevron-forward" size={24} color="#6d5d58" />
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </Link>
          ) : (
            <TouchableOpacity key={index} onPress={option.action}>
              <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Ionicons name={option.icon as keyof typeof Ionicons.glyphMap} size={24} color="#de9606" />
                  <Text style={styles.optionText}>{option.title}</Text>
                  <Ionicons name="chevron-forward" size={24} color="#6d5d58" />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )
        ))}

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => router.push('/logout')}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
