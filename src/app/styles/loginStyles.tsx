import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  loginContainer: {
    width: '100%',
    height: 'auto',
    borderRadius: 6,
    padding: 10,
    margin: 10,
  },
  input: {
    fontSize: 16,
    fontWeight: 'normal',
    padding: 5,
    margin: 5,
    borderColor: '#ddd',
    color: '#222',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  errorText: {
    fontSize: 12,
    fontWeight: 'normal',
    padding: 0,
    margin: 5,
    textAlign: 'left',
  },
});
