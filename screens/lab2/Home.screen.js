import React, { useState } from 'react'
import { Text, View, Button, TextInput } from 'react-native'

import styles from './Home.styles'

const getRandomInteger = (min, max) =>
  Math.round(min - 0.5 + Math.random() * (max - min + 1))
const min = 1
const max = 10

export function lab2() {
  const [surname, setSurname] = useState('')
  const [name, setName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [groupNumber, setGroupNumber] = useState('')
  const [faculty, setFaculty] = useState('')
  const [inputsOrder, setInputsOrder] = useState([0, 1, 2, 3, 4])

  const inputsArr = [
    {
      label: 'Surname',
      value: surname,
      function: setSurname,
      order: inputsOrder[0],
    },
    {
      label: 'Name',
      value: name,
      function: setName,
      order: inputsOrder[1],
    },
    {
      label: 'Patronymic',
      value: patronymic,
      function: setPatronymic,
      order: inputsOrder[2],
    },
    {
      label: 'Group Number',
      value: groupNumber,
      function: setGroupNumber,
      order: inputsOrder[3],
    },
    {
      label: 'Faculty',
      value: faculty,
      function: setFaculty,
      order: inputsOrder[4],
    },
  ]

  const renderInputs = () => {
    const array = inputsArr.sort((a, b) => {
      if (a.order < b.order) {
        return -1
      }
      if (a.order > b.order) {
        return 1
      }
      return 0
    })
    return array.map((el, i) => {
      return (
        <View key={`input-${i}`} style={styles.input}>
          <TextInput
            value={el.value}
            onChangeText={(v) => el.function(v)}
            placeholder={el.label}
          />
        </View>
      )
    })
  }

  const onChangeOrder = () => {
    setInputsOrder([
      getRandomInteger(min, max),
      getRandomInteger(min, max),
      getRandomInteger(min, max),
      getRandomInteger(min, max),
      getRandomInteger(min, max),
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text>
          Surname: {surname}
          {'\n'}
          Name: {name}
          {'\n'}
          Patronymic: {patronymic}
          {'\n'}
          Group number: {groupNumber}
          {'\n'}
          Faculty: {faculty}
          {'\n'}
        </Text>
      </View>
      {renderInputs()}
      <View style={styles.button}>
        <Button
          onPress={() => onChangeOrder()}
          title="Change inputs order"
          color="black"
        />
      </View>
    </View>
  )
}
