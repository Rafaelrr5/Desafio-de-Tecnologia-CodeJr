import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AdminHub = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento da Administração</Text>
      
      <ScrollView style={styles.optionsContainer}>
        <Link href="/BeerManagement" asChild>
          <TouchableOpacity style={styles.optionCard}>
            <Ionicons name="beer-outline" size={28} color="#333" style={styles.icon} />
            <Text style={styles.optionText}>Gerenciar Cervejas</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/PromotionManagement" asChild>
          <TouchableOpacity style={styles.optionCard}>
            <Ionicons name="cash-outline" size={28} color="#333" style={styles.icon} />
            <Text style={styles.optionText}>Gerenciar Promoções</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/Settings" asChild>
          <TouchableOpacity style={styles.optionCard}>
            <Ionicons name="settings-outline" size={28} color="#333" style={styles.icon} />
            <Text style={styles.optionText}>Configurações</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8ec',
    paddingHorizontal: 20,
    paddingTop: 50, // Changed from paddingVertical: 30
    paddingBottom: 30,
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
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default AdminHub;
