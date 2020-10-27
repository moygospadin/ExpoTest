import React, { useState, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import * as Permissions from 'expo-permissions'

import styles from './Home.styles'

export function lab7() {
  const [cameraRollPermissionStatus, setCameraRollPermissionStatus] = useState(
    null
  )
  const [
    notificationsPermissionStatus,
    setNotificationsPermissionStatus,
  ] = useState(null)
  const [locationPermissionStatus, setLocationPermissionStatus] = useState(null)
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState(null)
  const [
    audioRecordingPermissionStatus,
    setAudioRecordingPermissionStatus,
  ] = useState(null)
  const [contactsPermissionStatus, setContactsPermissionStatus] = useState(null)
  const [calendarPermissionStatus, setCalendarPermissionStatus] = useState(null)

  useEffect(() => {
    const init = async () => {
      const { status: cameraRollStatus } = await Permissions.getAsync(
        Permissions.CAMERA_ROLL
      )
      setCameraRollPermissionStatus(cameraRollStatus)
      const { status: notificationsStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      )
      setNotificationsPermissionStatus(notificationsStatus)
      const { status: locationPermissionStatus } = await Permissions.getAsync(
        Permissions.LOCATION
      )
      setLocationPermissionStatus(locationPermissionStatus)
      const { status: cameraStatus } = await Permissions.getAsync(
        Permissions.CAMERA
      )
      setCameraPermissionStatus(cameraStatus)
      const { status: audioRecordingPermission } = await Permissions.getAsync(
        Permissions.AUDIO_RECORDING
      )
      setAudioRecordingPermissionStatus(audioRecordingPermission)
      const { status: contactsPermission } = await Permissions.getAsync(
        Permissions.CONTACTS
      )
      setContactsPermissionStatus(contactsPermission)
      const { status: calendarPermission } = await Permissions.getAsync(
        Permissions.CALENDAR
      )
      setCalendarPermissionStatus(calendarPermission)
    }
    init()
  }, [])

  const askForPermission = async (permission, func) => {
    const { status } = await Permissions.askAsync(permission)
    func(status)
  }

  return (
    <View style={styles.container}>
      {cameraRollPermissionStatus !== 'granted' && (
        <View style={styles.button}>
          <Button
            title="Camera roll"
            onPress={() =>
              askForPermission(
                Permissions.CAMERA_ROLL,
                setCameraRollPermissionStatus
              )
            }
            color="black"
          />
        </View>
      )}
      {notificationsPermissionStatus !== 'granted' && (
        <View style={styles.button}>
          <Button
            title="Notifications"
            onPress={() =>
              askForPermission(
                Permissions.NOTIFICATIONS,
                setNotificationsPermissionStatus
              )
            }
            color="black"
          />
        </View>
      )}
      {locationPermissionStatus !== 'granted' && (
        <View style={styles.button}>
          <Button
            title="Location"
            onPress={() =>
              askForPermission(
                Permissions.LOCATION,
                setLocationPermissionStatus
              )
            }
            color="black"
          />
        </View>
      )}
      {cameraPermissionStatus !== 'granted' && (
        <View style={styles.button}>
          <Button
            title="Camera"
            onPress={() =>
              askForPermission(Permissions.CAMERA, setCameraPermissionStatus)
            }
            color="black"
          />
        </View>
      )}
      {audioRecordingPermissionStatus !== 'granted' && (
        <View style={styles.button}>
          <Button
            title="Audio Recording"
            onPress={() =>
              askForPermission(
                Permissions.AUDIO_RECORDING,
                setAudioRecordingPermissionStatus
              )
            }
            color="black"
          />
        </View>
      )}
      {contactsPermissionStatus !== 'granted' && (
        <View style={styles.button}>
          <Button
            title="Contacts"
            onPress={() =>
              askForPermission(
                Permissions.CONTACTS,
                setContactsPermissionStatus
              )
            }
            color="black"
          />
        </View>
      )}
      {calendarPermissionStatus !== 'granted' && (
        <View style={styles.button}>
          <Button
            title="Calendar"
            onPress={() =>
              askForPermission(
                Permissions.CALENDAR,
                setCalendarPermissionStatus
              )
            }
            color="black"
          />
        </View>
      )}
    </View>
  )
}
