import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Tabs, Link } from 'expo-router';
import { styles } from '../styles/notFound.styles';

const NotFoundScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Opa!</Text>
      <Text style={styles.message}>A página que você está procurando não existe.</Text>
      <Link href="/">
        <ThemedText type="link">Voltar para a Home :)</ThemedText>
      </Link>
    </SafeAreaProvider>
  );
};

export default NotFoundScreen;
