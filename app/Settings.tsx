import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/styles/Settings.styles';

const Settings = () => {
  const settingsOptions = [
    {
      title: 'Perfil',
      icon: 'person-outline',
      path: '/profile'
    },
    {
      title: 'Notificações',
      icon: 'notifications-outline',
      path: '/notifications'
    },
    {
      title: 'Pagamento',
      icon: 'card-outline',
      path: '/payment'
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#6A3805" />
          </TouchableOpacity>
          <Text style={styles.title}>Configurações</Text>
        </View>

        {settingsOptions.map((option, index) => (
          option.path ? (
            <Link key={index} href={option.path as any} asChild>
              <TouchableOpacity>
                <Card style={styles.card}>
                  <Card.Content style={styles.cardContent}>
                    <Ionicons name={option.icon as keyof typeof Ionicons.glyphMap} size={24} color="#de9606" />
                    <Text style={styles.optionText}>{option.title}</Text>
                    <Ionicons name="chevron-forward" size={24} color="#6d5d58" />
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </Link>
          ) : (
            <TouchableOpacity key={index} onPress={option.action}>
              <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Ionicons name={option.icon as keyof typeof Ionicons.glyphMap} size={24} color="#de9606" />
                  <Text style={styles.optionText}>{option.title}</Text>
                  <Ionicons name="chevron-forward" size={24} color="#6d5d58" />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )
        ))}

        <View style={styles.separator} />

        <List.Accordion
          title="Sobre o ChoppVerse"
          description="Conheça nossa história e valores"
          left={props => <List.Icon {...props} icon="beer" color="#de9606" />}
          style={styles.accordion}
          theme={{
            colors: {
              primary: '#de9606',
            },
          }}
        >
          <List.Item
            title="Nossa Missão"
            description="Proporcionar a melhor experiência cervejeira aos nossos clientes, oferecendo produtos de qualidade e um serviço excepcional."
            descriptionNumberOfLines={4}
            style={styles.accordionItem}
            titleStyle={styles.accordionTitle}
            descriptionStyle={styles.accordionDescription}
            left={props => <List.Icon {...props} icon="target" color="#de9606" />}
          />
          <List.Item
            title="Nossa Visão"
            description="Ser reconhecida como a melhor plataforma de cervejas artesanais do Brasil, inspirando e conectando pessoas através da cultura cervejeira."
            descriptionNumberOfLines={4}
            style={styles.accordionItem}
            titleStyle={styles.accordionTitle}
            descriptionStyle={styles.accordionDescription}
            left={props => <List.Icon {...props} icon="eye" color="#de9606" />}
          />
          <List.Item
            title="Nossos Valores"
            description={[
              "✦ Qualidade e excelência",
              "✦ Paixão pela cerveja",
              "✦ Inovação constante",
              "✦ Responsabilidade social",
              "✦ Satisfação do cliente"
            ].join('\n')}
            descriptionNumberOfLines={10}
            style={styles.accordionItem}
            titleStyle={styles.accordionTitle}
            descriptionStyle={[styles.accordionDescription, { lineHeight: 24 }]}
            left={props => <List.Icon {...props} icon="star" color="#de9606" />}
          />
        </List.Accordion>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => router.push('/logout')}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
