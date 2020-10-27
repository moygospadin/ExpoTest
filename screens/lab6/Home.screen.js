import React, { useState, useEffect } from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from './Home.styles'

export function lab6() {
  const [data, setData] = useState(null)
  const [name, setName] = useState('')
  const [faculty, setFaculty] = useState('')
  const [group, setGroup] = useState('')
  const key = 'students_data'

  useEffect(() => {
    const init = async () => {
      const fetchedData = await loadDeviceData(key)
      setData(fetchedData)
    }
    init()
  }, [])

  const saveDeviceData = async (key, data) => {
    try {
      if (!name || !faculty || !group) return
      const newData = [
        ...data,
        {
          id: Math.random(),
          name,
          faculty,
          group,
        },
      ]
      await AsyncStorage.setItem(key, JSON.stringify(newData))
    } catch (e) {
      console.log(`Error saving data for key ${key}`, data)
      throw e
    }
  }

  const loadDeviceData = async (key) => {
    try {
      const fetchedData = JSON.parse(await AsyncStorage.getItem(key))
      setData(fetchedData)
    } catch (e) {
      console.log(`Error loading data for key ${key}`)
      throw e
    }
  }

  return (
    <View style={styles.container}>
      {data && (
        <View style={styles.studentsData}>
          {data.map((studentData) => (
            <Text
              key={studentData.id}
            >{`Name: ${studentData.name}, faculty: ${studentData.faculty}, group: ${studentData.group}`}</Text>
          ))}
        </View>
      )}
      <View>
        <TextInput
          placeholder="name"
          style={styles.input}
          onChangeText={(v) => setName(v)}
          value={name}
        />
        <TextInput
          placeholder="faculty"
          style={styles.input}
          onChangeText={(v) => setFaculty(v)}
          value={faculty}
        />
        <TextInput
          placeholder="group"
          style={styles.input}
          onChangeText={(v) => setGroup(v)}
          value={group}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Load Data"
          onPress={() => loadDeviceData(key, data)}
          color="black"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Save Data"
          onPress={() => saveDeviceData(key, data)}
          color="black"
        />
      </View>
    </View>
  )
}
