import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8ec',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60, // Make it circular
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#de9606',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6d5d58',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#de9606',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  backToLoginText: {
    fontSize: 14,
    color: '#de9606',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
});
