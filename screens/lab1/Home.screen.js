import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'

import styles from './Home.styles'

export function lab1() {
  const [isGreeting, setIsGreeting] = useState(null)

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          onPress={() => setIsGreeting(!isGreeting)}
          title={isGreeting ? 'Say goodbye' : 'Say hello'}
          color="black"
        />
      </View>
      <Text style={styles.text}>
        {isGreeting !== null && (isGreeting ? 'Hello' : 'Goodbye')}
      </Text>
    </View>
  )
}
