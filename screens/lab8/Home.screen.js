import React, { useState, useCallback } from 'react'
import { Text, View, Linking, TouchableOpacity, Button } from 'react-native'

import styles from './Home.styles'

export function lab8() {
  const [urlHistory, setUrlHistory] = useState([])

  const onOpenUrl = useCallback(
    (url, urlLabel) => {
      setUrlHistory([...urlHistory, urlLabel])
      Linking.openURL(url)
    },
    [urlHistory, setUrlHistory]
  )

  const onClearHistory = useCallback(() => {
    setUrlHistory([])
  }, [setUrlHistory])

  return (
    <View style={styles.container}>
      <View style={styles.urlHistory}>
        <Text>{urlHistory.join(', ')}</Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Button
          title="VK"
          onPress={() => onOpenUrl('https://vk.com/moygospadin', 'VK')}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Button
          title="Instagram"
          onPress={() =>
            onOpenUrl('https://www.instagram.com/moygospadin/', 'Instagram')
          }
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Button
          title="GitHub"
          onPress={() => onOpenUrl('https://github.com/moygospadin', 'Github')}
          color="black"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.clearButton]}
        activeOpacity={0.7}
      >
        <Button title="Clear History" onPress={onClearHistory} color="black" />
      </TouchableOpacity>
    </View>
  )
}
