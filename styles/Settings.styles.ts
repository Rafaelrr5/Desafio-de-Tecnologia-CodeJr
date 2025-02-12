import { StyleSheet } from 'react-native';
import { shadows } from './constants/shadows';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8ec',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    ...shadows.medium,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A3805',
    flex: 1,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    ...shadows.default,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 8
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#6d5d58',
    marginLeft: 16,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#D9534F',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordion: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    ...shadows.default,
  },
  accordionItem: {
    backgroundColor: '#fff8ec',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  separator: {
    height: 16,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6A3805',
    marginBottom: 4,
  },
  accordionDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6d5d58',
    fontStyle: 'italic',
  },
});
