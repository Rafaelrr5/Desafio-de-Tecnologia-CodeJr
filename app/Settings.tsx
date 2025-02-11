import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const settingsOptions = [
    {
      title: 'Perfil',
      icon: 'person-outline',
      path: '/profile',
    },
    {
      title: 'Notificações',
      icon: 'notifications-outline',
      action: () => console.log('Notificações - Em desenvolvimento'),
    },
    {
      title: 'Segurança',
      icon: 'shield-outline',
      action: () => console.log('Segurança - Em desenvolvimento'),
    },
    {
      title: 'Pagamento',
      icon: 'card-outline',
      action: () => console.log('Pagamento - Em desenvolvimento'),
    },
    {
      title: 'Ajuda',
      icon: 'help-circle-outline',
      action: () => console.log('Ajuda - Em desenvolvimento'),
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8ec',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A3805',
    flex: 1,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#6d5d58',
    marginLeft: 16,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#D9534F',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
