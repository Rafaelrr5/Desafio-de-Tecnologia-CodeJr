import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { usePromotions } from '../../contexts/promotionContext';
import { styles } from '../../styles/Index.styles';

// Cores da paleta
const colors = {
  primary: '#de9606', // Laranja
  secondary: '#aa8c66', // Marrom claro
  background: '#fff8ec', // Bege claro
  textDark: '#402e32', // Marrom escuro
};

const DEFAULT_BEER_IMAGE = 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=';

const HomeScreen = () => {
  const { getActivePromotions, loading: promotionsLoading, error, fetchPromotions } = usePromotions();
  const [featuredBeers, setFeaturedBeers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPromotions();
        
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/beers?select=*`,
          {
            headers: {
              'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch beers');
        }

        const beers = await response.json();
        setFeaturedBeers(beers || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const activePromotions = getActivePromotions();

  if (isLoading || promotionsLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.innerContainer}>
          <ThemedText>Carregando...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.innerContainer}>
          <ThemedText>Error: {error}</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Imagem de fundo */}
      <Image
        source={{ uri: DEFAULT_BEER_IMAGE }}
        style={styles.backgroundImage}
      />
      {/* Sobreposição */}
      <View style={styles.overlay} />
      <FlatList
        data={[]}
        ListHeaderComponent={
          <ThemedView style={styles.innerContainer}>
            {/* Seções */}
            <ThemedText type="title" style={styles.title}>Cervejas em Destaque</ThemedText>
            <FlatList
              horizontal
              data={featuredBeers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.beerCard}
                  onPress={() => {
                    console.log('Selected beer:', item); // Debug log
                    router.push({
                      pathname: "/BeerDetailsModal",
                      params: { id: item.id }
                    });
                  }}
                >
                  <Image 
                    source={{ uri: item.image || DEFAULT_BEER_IMAGE }} 
                    style={styles.beerImage} 
                  />
                  <ThemedText style={styles.beerName}>{item.name}</ThemedText>
                  <ThemedText style={styles.beerType}>{item.type}</ThemedText>
                    <ThemedText style={styles.beerPrice}>
                    R$ {item.price.toFixed(2).replace('.', ',')}
                    </ThemedText>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.beerList}
            />

            <ThemedText type="title" style={styles.sectionTitle}>Promoções</ThemedText>
            <FlatList
              data={activePromotions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.promotionCard}>
                  <View style={styles.promotionTextContainer}>
                    <ThemedText style={styles.promotionTitle}>{item.title}</ThemedText>
                    <ThemedText style={styles.promotionDescription}>
                      {item.description}
                    </ThemedText>
                    <ThemedText style={styles.promotionDiscount}>
                      Desconto: {item.discount}%
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.promotionList}
            />
          </ThemedView>
        }
        renderItem={null}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;