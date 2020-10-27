import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#512DA8',
    width: '70%',
    padding: 10,
    marginTop: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: '#512DA8',
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 20,
    marginVertical: 15,
    height: 40,
    paddingHorizontal: 10,
    width: '75%',
    borderRadius: 5,
  },
})
