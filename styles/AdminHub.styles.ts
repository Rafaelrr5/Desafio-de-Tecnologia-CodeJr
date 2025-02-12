import { StyleSheet } from 'react-native';
import { shadows } from './constants/shadows';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8ec',
    paddingHorizontal: 20,
    paddingTop: 50, 
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#de9606',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    flex: 1,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    ...shadows.default,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});
