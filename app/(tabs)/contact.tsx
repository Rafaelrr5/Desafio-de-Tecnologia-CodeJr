import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Biblioteca de ícones
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from '@/styles/Contact.styles';

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

export default ContactScreen;
