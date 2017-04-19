import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 300,
    borderRadius: 4,
    borderColor: '#666666',
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 10,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#088DA5',
    height: 40,
    alignItems: 'center',
    width: 120,
    borderRadius: 4
  },
  buttonText: {
    color: '#FFFFFF',
    marginTop: 11
  },
  loader: {
    marginTop: 11
  },
  error: {
    color: '#BF0000'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
