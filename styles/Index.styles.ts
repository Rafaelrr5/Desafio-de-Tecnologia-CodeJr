import { StyleSheet } from 'react-native';

const colors = {
  primary: '#de9606',
  secondary: '#aa8c66',
  background: '#fff8ec',
  textDark: '#402e32',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 248, 236, 0.85)',
  },
  innerContainer: {
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 16,
  },
  beerList: {
    paddingBottom: 16,
  },
  beerCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#f7e4d4',
    borderRadius: 12,
    alignItems: 'center',
    padding: 12,
  },
  beerImage: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginBottom: 12,
  },
  beerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    textAlign: 'center',
  },
  beerType: {
    fontSize: 14,
    color: '#6d5d58',
    textAlign: 'center',
    marginVertical: 4,
  },
  beerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textDark,
    marginVertical: 20,
  },
  promotionCard: {
    flexDirection: 'row',
    backgroundColor: '#ead8c3',
    borderRadius: 12,
    marginBottom: 16,
  },
  promotionTextContainer: {
    flex: 1,
    padding: 12,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  promotionList: {
    paddingBottom: 16,
  },
  promotionDescription: {
    fontSize: 14,
    color: '#6d5d58',
  },
  promotionDiscount: {
    fontSize: 14,
    color: colors.primary,
  },
});
