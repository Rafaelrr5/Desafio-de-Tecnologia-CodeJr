import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8ec',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff8ec',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    margin: 16,
    elevation: 4,
    backgroundColor: '#fff',
  },
  beerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  beerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  beerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#de9606',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A3805',
  },
  stock: {
    fontSize: 14,
    color: '#6d5d58',
    marginLeft: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#de9606',
  },
  scrollContent: {
    paddingBottom: 80,
  },
});
