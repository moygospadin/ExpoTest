import React, { useState, useEffect } from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from './Home.styles'

export function lab6() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [faculty, setFaculty] = useState('')
  const [group, setGroup] = useState('')
  const key = 'students_data1'

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
      const oldData = data || []
      const newData = [
        ...oldData,
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
          style={styles.input}
          onChangeText={(v) => setName(v)}
          value={name}
          placeholder="name"
        />
        <TextInput
          style={styles.input}
          onChangeText={(v) => setFaculty(v)}
          value={faculty}
          placeholder="faculty"
        />
        <TextInput
          style={styles.input}
          onChangeText={(v) => setGroup(v)}
          value={group}
          placeholder="group"
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
