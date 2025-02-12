import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/AdminHub.styles';

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

export default AdminHub;
