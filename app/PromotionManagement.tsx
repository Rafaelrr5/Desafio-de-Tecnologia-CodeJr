import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { api } from '@/services/api';
import { PromotionFormModal } from '@/components/PromotionFormModal';

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  isActive: boolean;
}

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      const data = await api.getPromotions();
      // Handle the case where data might be null or undefined
      setPromotions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading promotions:', error);
      Alert.alert('Erro', 'Não foi possível carregar as promoções.');
      setPromotions([]); // Set empty array on error
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta promoção?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deletePromotion(id);
              // Refresh promotion list
              loadPromotions();
            } catch (error) {
              console.error('Error deleting promotion:', error);
              Alert.alert('Erro', 'Não foi possível excluir a promoção.');
            }
          },
        },
      ]
    );
  };

  const handleEdit = (promotion: Promotion) => {
    // Show edit modal
    setEditingPromotion(promotion);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingPromotion(null);
    setModalVisible(true);
  };

  const handleSave = async (promotion: Promotion) => {
    try {
      if (editingPromotion) {
        await api.updatePromotion(promotion.id, promotion);
      } else {
        await api.createPromotion(promotion);
      }
      setModalVisible(false);
      loadPromotions();
    } catch (error) {
      console.error('Error saving promotion:', error);
      Alert.alert('Erro', 'Não foi possível salvar a promoção.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#6A3805" />
          </TouchableOpacity>
          <Text style={styles.title}>Gerenciamento de Promoções</Text>
        </View>

        {promotions.map((promo) => (
          <Card key={promo.id} style={styles.card}>
            <Card.Content>
              <View style={styles.promoHeader}>
                <Text style={styles.cardTitle}>{promo.title}</Text>
                <Text style={[styles.status, { color: promo.isActive ? '#de9606' : '#D9534F' }]}>
                  {promo.isActive ? 'Ativa' : 'Inativa'}
                </Text>
              </View>
              <Text style={styles.description}>{promo.description}</Text>
              <Text style={styles.details}>Desconto: {promo.discount}%</Text>
              <Text style={styles.details}>Válido até: {promo.validUntil}</Text>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                buttonColor="#de9606"
                textColor="#fff"
                onPress={() => handleEdit(promo)}
              >
                Editar
              </Button>
              <Button 
                mode="contained"
                buttonColor="#D9534F"
                textColor="#fff"
                onPress={() => handleDelete(promo.id)}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        color="#fff"
        onPress={handleAdd}
      />
      <PromotionFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialData={editingPromotion}
      />
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A3805',
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#de9606',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6d5d58',
  },
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  details: {
    fontSize: 14,
    color: '#6d5d58',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#de9606',
  },
  scrollContent: {
    paddingBottom: 80, // Add padding at bottom for FAB
  },
});

export default PromotionManagement;
