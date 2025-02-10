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
    start_date: '',
    end_date: '',
    is_active: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title,
        description: initialData.description,
        discount: initialData.discount,
        start_date: initialData.start_date,
        end_date: initialData.end_date,
        is_active: initialData.is_active,
      });
    } else {
      setFormData({
        id: '',
        title: '',
        description: '',
        discount: 0,
        start_date: today,
        end_date: today,
        is_active: true,
      });
    }
  }, [initialData, visible]);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateDates = (start_date: string, end_date: string): boolean => {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return startDate >= today && endDate > startDate;
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('O título é obrigatório');
      return false;
    }
    if (!formData.description.trim()) {
      setError('A descrição é obrigatória');
      return false;
    }
    if (isNaN(formData.discount) || formData.discount <= 0 || formData.discount > 100) {
      setError('O desconto deve estar entre 0 e 100');
      return false;
    }
    if (!formData.start_date || !formData.end_date) {
      setError('As datas são obrigatórias');
      return false;
    }
    if (!validateDates(formData.start_date, formData.end_date)) {
      setError('A data inicial deve ser hoje ou posterior e a data final deve ser posterior à inicial');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!validateForm()) {
        setLoading(false);
        return;
      }

      const { id, ...data } = formData;
      if (id) {
        await updatePromotion(id, data);
      } else {
        await createPromotion(data);
      }
      setError(null);
      onSave();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao salvar promoção. Verifique os dados e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (!loading) {
      setError(null);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => !loading && handleCloseModal()}
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
              onPress={() => setShowStartDatePicker(true)}
              style={styles.input}
              textColor="#6A3805"
            >
              Data inicial: {formData.start_date}
            </Button>
            <Button
              mode="outlined"
              onPress={() => setShowEndDatePicker(true)}
              style={styles.input}
              textColor="#6A3805"
            >
              Data final: {formData.end_date}
            </Button>
            {showStartDatePicker && (
              <DateTimePicker
                value={formData.start_date ? new Date(formData.start_date) : new Date()}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowStartDatePicker(false);
                  if (selectedDate) {
                    handleChange('start_date', selectedDate.toISOString().split('T')[0]);
                  }
                }}
              />
            )}
            {showEndDatePicker && (
              <DateTimePicker
                value={formData.end_date ? new Date(formData.end_date) : new Date()}
                mode="date"
                display="default"
                minimumDate={new Date(formData.start_date || new Date())}
                onChange={(event, selectedDate) => {
                  setShowEndDatePicker(false);
                  if (selectedDate) {
                    handleChange('end_date', selectedDate.toISOString().split('T')[0]);
                  }
                }}
              />
            )}
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Ativa</Text>
              <Switch
                value={formData.is_active}    
                onValueChange={value => handleChange('is_active', value)}    
                color="#de9606"
              />
            </View>
            {loading && <Text>Loading...</Text>}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {error}
                </Text>
              </View>
            )}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              buttonColor="#de9606"
              textColor="#fff"
              loading={loading}
              disabled={loading}
            >
              Salvar
            </Button>
            <Button
              mode="outlined"
              onPress={handleCloseModal}
              style={styles.button}
              textColor="#6A3805"
              disabled={loading}
            >
              Cancelar
            </Button>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
