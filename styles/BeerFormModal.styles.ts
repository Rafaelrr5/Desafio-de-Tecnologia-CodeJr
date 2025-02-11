import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(106, 56, 5, 0.3)',
  },
  modalView: {
    width: '95%',
    height: '90%',
    backgroundColor: '#fff8ec',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A3805',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(106, 56, 5, 0.1)',
  },
  button: {
    marginTop: 8,
    borderColor: '#6A3805',
  },
  imageButton: {
    marginTop: 16,
    marginBottom: 8,
  },
  additionalParams: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fullWidth: {
    marginHorizontal: 8,
    marginBottom: 12,
  },
});
