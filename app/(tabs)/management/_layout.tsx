import React from 'react';
import { Stack } from 'expo-router';
import BeerManagementScreen from './BeerManagement';
import PromotionManagementScreen from './PromotionManagement';
import SettingsScreen from './Settings';

const ManagementStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="BeerManagement"
        component={BeerManagementScreen}
        options={{ title: 'Gerenciar Cervejas' }}
      />
      <Stack.Screen
        name="PromotionManagement"
        component={PromotionManagementScreen}
        options={{ title: 'Gerenciar Promoções' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Configurações' }}
      />
    </Stack>
  );
};

export default ManagementStack;