import React from 'react';
import { View, Linking, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const contactInfo = {
  image: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=',
  email: 'contato@cervejaria.com',
  phone: '(32) 1234-5678',
  address: 'Rua da Cerveja, 123 - Juiz de Fora, MG',
};

const ContactScreen = () => {
  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaProvider>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Contato</ThemedText>
        <Image source={{ uri: contactInfo.image }} style={styles.contactImage} />
        <ThemedText type="default">Email: {contactInfo.email}</ThemedText>
        <ThemedText type="default">Telefone: {contactInfo.phone}</ThemedText>
        <ThemedText type="default">Endereço: {contactInfo.address}</ThemedText>
        <TouchableOpacity onPress={() => handlePress('https://facebook.com')}>
          <ThemedText type="link">Facebook</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('https://instagram.com')}>
          <ThemedText type="link">Instagram</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default ContactScreen;