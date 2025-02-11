import React from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { ThemedText } from '@/components/ThemedText';
import { notificationsStyles as styles } from '@/styles/notificationsStyles';

const notifications = [
  {
    id: '1',
    title: 'Novo pedido confirmado',
    message: 'Seu pedido #123 foi confirmado e está sendo preparado.',
    time: '10 min atrás',
  },
  {
    id: '2',
    title: 'Promoção especial',
    message: 'Aproveite 20% de desconto em todos os produtos hoje!',
    time: '2 horas atrás',
  },
  {
    id: '3',
    title: 'Entrega realizada',
    message: 'Seu pedido #120 foi entregue com sucesso.',
    time: '1 dia atrás',
  },
];

export default function NotificationsScreen() {
  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationHeader}>
        <ThemedText style={styles.notificationTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.notificationTime}>{item.time}</ThemedText>
      </View>
      <ThemedText style={styles.notificationMessage}>{item.message}</ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Notificações" />
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}
