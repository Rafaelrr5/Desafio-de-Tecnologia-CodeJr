import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { api } from '@/services/api';
import { BeerFormModal } from '@/components/BeerFormModal';
import { Beer } from '../types/beer';
import { styles } from '@/styles/BeerManagement.styles';

const BeerManagement = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [editingBeer, setEditingBeer] = useState<Beer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadBeers();
  }, []);

  // Função para carregar a lista de cervejas
  const loadBeers = async () => {
    try {
      const data = await api.getBeers();
      setBeers(Array.isArray(data) ? data : []); // Atualiza a lista de cervejas
    } catch (error) {
      console.error('Error loading beers:', error);
      Alert.alert('Erro', 'Não foi possível carregar as cervejas.');
      setBeers([]); // caso dê erro, limpa a lista
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta cerveja?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteBeer(id);
              // Atualiza a lista de cervejas após a exclusão
              loadBeers();
            } catch (error) {
              console.error('Error deleting beer:', error);
              Alert.alert('Erro', 'Não foi possível excluir a cerveja.');
            }
          },
        },
      ]
    );
  };

  // Função para editar uma cerveja
  const handleEdit = (beer: Beer) => {
    setEditingBeer(beer);
    setModalVisible(true);
  };

  // Função para adicionar uma nova cerveja
  const handleAdd = () => {
    setEditingBeer(null);
    setModalVisible(true);
  };

  // Função para salvar uma cerveja (nova ou editada)
  const handleSave = async (beer: Beer) => {
    try {
      if (editingBeer) {
        await api.updateBeer(beer.id, beer);
      } else {
        const result = await api.createBeer(beer);
      }
      setModalVisible(false);
      loadBeers();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a cerveja.');
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
          <Text style={styles.title}>Gerenciamento de Cervejas</Text>
        </View>

        {beers.map((beer) => (
          <Card key={beer.id} style={styles.card}>
            <Card.Content>
              <View style={styles.beerContent}>
                <Image 
                  source={{ uri: beer.image_url }}
                  style={styles.beerImage}
                  resizeMode="contain"
                />
                <View style={styles.beerInfo}>
                  <Text style={styles.cardTitle}>{beer.name}</Text>
                  <View style={styles.detailsRow}>
                    <Text style={styles.price}>R$ {beer.price.toFixed(2)}</Text>
                    <Text style={styles.stock}>Estoque: {beer.stock}</Text>
                  </View>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained"
                buttonColor="#de9606"
                textColor="#fff"
                onPress={() => handleEdit(beer)}
              >
                Editar
              </Button>
              <Button 
                mode="contained"
                buttonColor="#D9534F"
                textColor="#fff"
                onPress={() => handleDelete(beer.id)}
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
      <BeerFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialData={editingBeer}
      />
    </SafeAreaView>
  );
};

export default BeerManagement;
