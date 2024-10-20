import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router'; // Import useRouter
import { TouchableOpacity } from 'react-native';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize the router

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful!');
      router.replace('/(tabs)'); // Navigate to the main app screen
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View 
    className='space-y-2'
    style={styles.container}>
      <View
      className='bg-gray-200 py-12 px-3 rounded-t-xl'
      >
        <Text className='text-2xl w-full text-center pb-3'>Login to News Blaze</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity
        className='mt-1 w-full justify-center items-center bg-blue-500 h-12 rounded-lg'
         onPress={handleLogin}>
          <Text className='text-xl text-white'>Login</Text>
         </TouchableOpacity>
        <TouchableOpacity
        className='mt-1 w-full justify-center items-center bg-slate-800 h-12 rounded-lg'
          onPress={() => router.push('/auth/SignUpPage')} // Use router.push for navigation
        >
          <Text className='text-slate-200 text-xl'>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',
     padding: 20,
     
     },
  input: { 
    borderWidth: 1, 
    marginBottom: 10,
     padding: 8,
     borderRadius:12, 
    },
    button:{
      marginTop:20
    }
});

export default LoginPage;
