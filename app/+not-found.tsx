import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Tabs, Link } from 'expo-router';

const NotFoundScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>A página que você está procurando não existe.</Text>
      <Link href="/">
        <ThemedText type="link">Voltar para a Home</ThemedText>
      </Link>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8ec', // Bege claro
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#de9606', // Laranja
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#6d5d58', // Marrom suave
    textAlign: 'center',
    marginHorizontal: 32,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#de9606', // Laranja
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NotFoundScreen;
