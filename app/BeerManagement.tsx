import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { api } from '@/services/api';
import { BeerFormModal } from '@/components/BeerFormModal';

interface Beer {
  id: string;
  name: string;
  price: number;
  image_url: string; // Changed from imageUrl to image_url to match DB schema
  stock: number;  // Add stock to interface
}

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
      // Handle the case where data might be null or undefined
      setBeers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading beers:', error);
      Alert.alert('Erro', 'Não foi possível carregar as cervejas.');
      setBeers([]); // Set empty array on error
    }
  };

  // Função para deletar uma cerveja
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
              // Refresh beer list
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
    // Show edit modal
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
      console.log('Saving beer:', beer); // Debug log
      if (editingBeer) {
        await api.updateBeer(beer.id, beer);
      } else {
        const result = await api.createBeer(beer);
        console.log('Create result:', result); // Debug log
      }
      setModalVisible(false);
      loadBeers();
    } catch (error) {
      console.error('Error saving beer:', error);
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
                  source={{ uri: beer.image_url }} // Update to use image_url
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8ec',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff8ec',
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
    padding: 4,
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
  beerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  beerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  beerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#de9606',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A3805',
  },
  stock: {
    fontSize: 14,
    color: '#6d5d58',
    marginLeft: 16,
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

export default BeerManagement;
