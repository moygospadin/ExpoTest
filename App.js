import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import GoalInput from './components/GoaInput'
import GoalItem from './components/GoalItem'

export default function App() {
  const [lifeGoals, setLifeGoals] = useState([])
  const [isAddmode, setIsAddMode] = useState(false)
  const addGoalHandler = (goalTitle) => {
    setLifeGoals((currentLifeGoals) => [
      ...currentLifeGoals,
      { id: Math.random().toString(), value: goalTitle },
    ])
    setIsAddMode(false)
  }

  const removeGoalHandler = (goalId) => {
    setLifeGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId)
    })
  }
  const cancelHandler = () => {
    setIsAddMode(false)
  }
  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        onCancel={cancelHandler}
        visible={isAddmode}
        onAddGoal={addGoalHandler}
      />

      <FlatList
        keyExtractor={(item) => item.id}
        data={lifeGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
})
