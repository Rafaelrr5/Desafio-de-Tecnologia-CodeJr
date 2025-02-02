import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useAppTheme() {
  const colorScheme = useColorScheme();
  
  return {
    colors: Colors[colorScheme],
    isDark: colorScheme === 'dark',
    colorScheme,
  };
}
