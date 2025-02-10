import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { Ionicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { handleLogoutConfirmation } from '@/services/auth';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/logo.png')}
              style={{
                width: 28,
                height: 28,
                opacity: focused ? 1 : 0.7,
                borderRadius: 14,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="AdminHub"
        options={{
          title: 'Gerenciamento',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="Contact"
        options={{
          title: 'Contato',
          tabBarIcon: ({ color }) => <Ionicons name="call-outline" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="Cart"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="logout"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogoutConfirmation();
          },
        }}
        options={{
          title: 'Sair',
          tabBarIcon: ({ color }) => <Ionicons name="log-out-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}