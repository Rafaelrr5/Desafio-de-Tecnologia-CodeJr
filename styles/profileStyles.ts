import { StyleSheet } from 'react-native';
import { shadows } from './constants/shadows';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8ec',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    ...shadows.default,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#6d5d58',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#6A3805',
    fontWeight: '500',
  },
  header: {
    fontSize: 18,
    color: '#de9606',
    fontWeight: 'bold',
    marginBottom: 16,
  }
});
