import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    transform: [{ rotate: '10deg' }],
    width: 80,
    height: 80,
  },
  buttonContainer: {
    marginTop: 50,
  },
  button: {
    backgroundColor: 'black',
    marginVertical: 10,
    minWidth: 250,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: '#FFA500',
  },
  input: {
    borderColor: '#FFA500',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    width: 100,
    height: 40,
    padding: 10,
    marginHorizontal: 10,
  },
  inputsContainer: {
    marginTop: 50,
    flexDirection: 'row',
  },
  text: {
    marginLeft: 10,
  },
})
