import { Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function ThemedText({ style, ...props }) {
  const colorScheme = useColorScheme();
  return (
    <Text 
      style={[{ color: Colors[colorScheme].text }, style]} 
      {...props} 
    />
  );
}

export function ThemedView({ style, ...props }) {
  const colorScheme = useColorScheme();
  return (
    <View 
      style={[{ backgroundColor: Colors[colorScheme].background }, style]} 
      {...props} 
    />
  );
}
