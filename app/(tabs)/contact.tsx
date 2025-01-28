import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Biblioteca de ícones
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      {/* Imagem de destaque */}
      <Image
        source={{ uri: 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME='}}
        style={styles.image}
      />

      {/* Informações de contato */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <FontAwesome name="envelope" size={20} color="#de9606" />
          <TouchableOpacity onPress={() => Linking.openURL('mailto:contato@cervejaria.com')}>
            <Text style={styles.infoText}>contato@cervejaria.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <FontAwesome name="phone" size={20} color="#de9606" />
          <TouchableOpacity onPress={() => Linking.openURL('tel:+553212345678')}>
            <Text style={styles.infoText}>(32) 1234-5678</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <FontAwesome name="map-marker" size={20} color="#de9606" />
          <Text style={styles.infoText}>Rua da Cerveja, 123 - Juiz de Fora, MG</Text>
        </View>

        {/* Redes Sociais */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://facebook.com/cervejaria')}
          >
            <FontAwesome name="facebook" size={24} color="#fff" />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://instagram.com/cervejaria')}
          >
            <FontAwesome name="instagram" size={24} color="#fff" />
            <Text style={styles.socialText}>Instagram</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8ec',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#de9606',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    justifyContent: 'center',
  },
  socialText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default ContactScreen;
