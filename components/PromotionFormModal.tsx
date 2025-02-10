import React, { useState, useEffect } from 'react';
import { View, Modal, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Switch, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles/PromotionFormModal.styles';
import { Promotion, usePromotions } from '../contexts/promotionContext';

interface PromotionFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: Promotion;
}

export const PromotionFormModal = ({ visible, onClose, onSave, initialData }: PromotionFormModalProps) => {
  const { createPromotion, updatePromotion } = usePromotions();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    discount: 0,
    validUntil: '',
    isActive: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title,
        description: initialData.description,
        discount: initialData.discount,
        validUntil: initialData.validUntil,
        isActive: initialData.isActive,
      });
    } else {
      setFormData({
        id: '',
        title: '',
        description: '',
        discount: 0,
        validUntil: '',
        isActive: true,
      });
    }
  }, [initialData, visible]);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const { id, ...data } = formData;
      if (id) {
        await updatePromotion(id, data);
      } else {
        await createPromotion(data);
      }
      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar promoção');
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
              {initialData ? 'Editar Promoção' : 'Nova Promoção'}
            </Text>
            <TextInput
              label="Título"
              value={formData.title}
              onChangeText={text => handleChange('title', text)}
              style={styles.input}
              theme={{
                colors: {
                  primary: '#de9606',
                  placeholder: '#6A3805',
                }
              }}
            />
            <TextInput
              label="Descrição"
              value={formData.description}
              onChangeText={text => handleChange('description', text)}
              multiline
              style={styles.input}
              theme={{
                colors: {
                  primary: '#de9606',
                  placeholder: '#6A3805',
                }
              }}
            />
            <TextInput
              label="Desconto (%)"
              value={formData.discount.toString()}
              onChangeText={text => handleChange('discount', parseFloat(text))}
              keyboardType="decimal-pad"
              style={styles.input}
              theme={{
                colors: {
                  primary: '#de9606',
                  placeholder: '#6A3805',
                }
              }}
            />
            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
              textColor="#6A3805"
            >
              Válido até: {formData.validUntil}
            </Button>
            {showDatePicker && (
              <DateTimePicker
                value={new Date(formData.validUntil)}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    handleChange('validUntil', selectedDate.toISOString().split('T')[0]);
                  }
                }}
              />
            )}
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Ativa</Text>
              <Switch
                value={formData.isActive}
                onValueChange={value => handleChange('isActive', value)}
                color="#de9606"
              />
            </View>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
            <Button
              mode="contained"
              onPress={handleSubmit}
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
