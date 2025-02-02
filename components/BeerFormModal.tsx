import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Alert, ScrollView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';

const DEFAULT_BEER_IMAGE = 'https://media.istockphoto.com/id/519728153/pt/foto/caneca-de-cerveja.jpg?s=1024x1024&w=is&k=20&c=POKrUPtx9-x7l0jQQLN1qQ8IExxOPvHdq_svWYJwdME=';

interface BeerFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (beer: Partial<Beer>) => Promise<void>;
  initialData?: Beer;
}

export const BeerFormModal = ({ visible, onClose, onSave, initialData }: BeerFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image_url: '', // Changed from imageUrl to image_url
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price.toString(),
        stock: initialData.stock.toString(),
        image_url: initialData.image_url, // Update to use image_url
      });
    } else {
      setFormData({
        name: '',
        price: '',
        stock: '',
        image_url: '',
      });
    }
  }, [initialData, visible]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Erro', 'Precisamos de permissão para acessar suas fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setLoading(true);
      const filename = uri.split('/').pop();
      const response = await fetch(uri);
      const blob = await response.blob();
      const filePath = `beers/${Date.now()}-${filename}`;
      
      const { error: uploadError, data } = await supabase
        .storage
        .from('images')
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase
        .storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl })); // Update to use image_url
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer upload da imagem');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.stock) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      const newBeer = {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image_url: formData.image_url || DEFAULT_BEER_IMAGE,
        type: 'X',
        description: 'X',
        alcohol: 0,
        ibu: 0,
        temperature: 0
      };

      await onSave(newBeer);
      onClose();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar cerveja');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalTitle}>
              {initialData ? 'Editar Cerveja' : 'Nova Cerveja'}
            </Text>
            <TextInput
              label="Nome"
              value={formData.name}
              onChangeText={text => setFormData(prev => ({ ...prev, name: text }))}
              style={styles.input}
              theme={{
                colors: {
                  primary: '#de9606',
                  placeholder: '#6A3805',
                }
              }}
            />
            <TextInput
              label="Preço"
              value={formData.price}
              onChangeText={text => setFormData(prev => ({ ...prev, price: text }))}
              keyboardType="decimal-pad"
              style={styles.input}
              theme={{
                colors: {
                  primary: '#de9606',
                  placeholder: '#6A3805',
                }
              }}
            />
            <TextInput
              label="Estoque"
              value={formData.stock}
              onChangeText={text => setFormData(prev => ({ ...prev, stock: text }))}
              keyboardType="number-pad"
              style={styles.input}
              theme={{
                colors: {
                  primary: '#de9606',
                  placeholder: '#6A3805',
                }
              }}
            />
            <Button
              mode="contained"
              onPress={pickImage}
              style={[styles.button, styles.imageButton]}
              buttonColor="#de9606"
              textColor="#fff"
              loading={loading}
            >
              Selecionar Imagem
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
              buttonColor="#de9606"
              textColor="#fff"
              loading={loading}
            >
              Salvar
            </Button>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.button}
              textColor="#6A3805"
            >
              Cancelar
            </Button>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(106, 56, 5, 0.3)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#fff8ec',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A3805',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 8,
    borderColor: '#6A3805',
  },
  imageButton: {
    marginTop: 16,
    marginBottom: 8,
  },
});
