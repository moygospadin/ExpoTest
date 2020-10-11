import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Modal } from 'react-native'
const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState('')

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText)
  }

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal)
    setEnteredGoal('')
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Life Goals"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={{ width: '40%' }}>
            <Button title="ADD" onPress={addGoalHandler} />
          </View>
          <View style={{ width: '40%' }}>
            <Button title="CANCEL" color="red" onPress={props.onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
})

export default GoalInput