import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { api } from '@/services/api';
import { Beer } from '../types/beer';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DISMISS_THRESHOLD = SCREEN_HEIGHT * 0.3;

const DEFAULT_BEER_IMAGE = 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=';

export default function BeerDetailsModal() {
  const params = useLocalSearchParams();
  const beerId = params.id as string; // Changed from Number(params.id)
  const [beer, setBeer] = useState<Beer | null>(null);
  const [loading, setLoading] = useState(true);
  const translateY = useSharedValue(0);

  useEffect(() => {
    async function loadBeer() {
      if (!beerId) {
        console.error('No beer ID provided');
        setLoading(false);
        return;
      }

      try {
        const data = await api.getBeerById(beerId);
        if (!data) {
          console.log('No data found for beer ID:', beerId);
          return;
        }
        
        setBeer({
          ...data,
          image: data.image || DEFAULT_BEER_IMAGE
        });
      } catch (error) {
        console.error('Error loading beer:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBeer();
  }, [beerId]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > DISMISS_THRESHOLD) {
        router.back();
      } else {
        translateY.value = withSpring(0);
      }
    })
    .simultaneousWithExternalGesture(Gesture.Native());  // Allow simultaneous scrolling

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (!beer) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Cerveja não encontrada</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rStyle]}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="#6A3805" />
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={true}
            bounces={false}
            scrollEventThrottle={16}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            <Image 
              source={{ 
                uri: beer.image || DEFAULT_BEER_IMAGE,
                cache: 'reload'
              }} 
              style={styles.beerImage}
              onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
            />
        
            <View style={styles.content}>
              <Text style={styles.title}>{beer.name}</Text>
              <Text style={styles.type}>{beer.type}</Text>
              <Text style={styles.description}>{beer.description}</Text>

              <View style={styles.detailsGrid}>
                <DetailItem label="Teor Alcoólico" value={`${beer.alcohol}%`} />
                <DetailItem label="IBU" value={beer.ibu.toString()} />
                <DetailItem label="Temperatura" value={`${beer.temperature}°C`} />
                <DetailItem label="Volume" value={`${beer.volume}ml`} />
                <DetailItem label="Cor" value={beer.color} />
                <DetailItem label="Cervejaria" value={beer.brewery} />
              </View>

              <View style={styles.footer}>
                <Text style={styles.price}>R$ {beer.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8ec',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff8ec',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
  },
  beerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A3805',
    marginBottom: 4,
  },
  type: {
    fontSize: 16,
    color: '#6d5d58',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#6d5d58',
    marginBottom: 24,
    lineHeight: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    width: '50%',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6d5d58',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#6A3805',
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#de9606',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#de9606',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
});
