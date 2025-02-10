import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { usePromotions, Promotion } from '../contexts/promotionContext';
import { PromotionFormModal } from '../components/PromotionFormModal';
import { styles } from '../styles/PromotionManagement.styles';

const PromotionManagement = () => {
  const { 
    promotions, 
    loading, 
    error, 
    fetchPromotions, 
    deletePromotion,
    updatePromotion,
    createPromotion
  } = usePromotions();

  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPromotions();
  }, []);

  if (loading) return <View><Text>Loading...</Text></View>;
  if (error) return <View><Text>Error: {error}</Text></View>;

  /**
   * Gerencia a exclusão de uma promoção
   * Exibe um diálogo de confirmação antes de excluir
   * @param id ID da promoção a ser excluída
   */
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
              await deletePromotion(id);
              await fetchPromotions();
            } catch (error) {
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

  /**
   * Gerencia o salvamento de uma promoção (nova ou existente)
   * @param promotion Dados da promoção a ser salva
   */
  const handleSave = async (promotion: Promotion) => {
    try {
      if (editingPromotion) {
        await updatePromotion(promotion.id, promotion);
      } else {
        await createPromotion(promotion);
      }
      await fetchPromotions(); // Refresh promotions after changes
      setModalVisible(false);
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

export default PromotionManagement;
