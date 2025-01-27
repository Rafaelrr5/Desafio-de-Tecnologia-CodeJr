import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

const adminHub = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento da Administração</Text>
      
      <ScrollView style={styles.optionsContainer}>
        {/* Gerenciar Cervejas */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('BeerManagement')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/174/174751.png' }}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Gerenciar Cervejas</Text>
        </TouchableOpacity>

        {/* Gerenciar Promoções */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('PromotionManagement')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3792/3792096.png' }}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Gerenciar Promoções</Text>
        </TouchableOpacity>

        {/* Configurações */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/126/126472.png' }}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Configurações</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8ec',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#de9606',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    flex: 1,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default adminHub;