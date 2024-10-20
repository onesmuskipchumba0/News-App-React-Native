import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='LoginPage' options={{
            headerShown:false
        }}/>
        <Stack.Screen name='SignUpPage' options={{
            headerShown:false
        }}/>
    </Stack>
  )
}

export default AuthLayout