// SignUpPage.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { auth, firestore } from '../../firebaseConfig'; // Import Firebase auth and Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { TouchableOpacity } from 'react-native';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const router = useRouter(); // Initialize router

  const handleSignUp = async () => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sign Up Successful!');

      // Save additional user information to Firestore
      const userRef = doc(firestore, 'users', userCredential.user.uid); // Use the UID as document ID
      await setDoc(userRef, {
        firstName,
        lastName,
        phone,
        gender,
        email,
      });

      // Navigate to the main tabs screen
      router.push('/(tabs)');
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text className='text-2xl w-full text-center pb-3'>Sign up to News Blaze</Text>
      <View
      className='bg-gray-300 py-12 px-3 rounded-t-xl'
      >
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
          style={styles.input}
        />
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
         onPress={handleSignUp} >
                    <Text className='text-xl text-white'>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
        className='mt-1 w-full justify-center items-center bg-slate-800 h-12 rounded-lg'
          onPress={() => router.push('/auth/LoginPage')}
        >
          <Text className='text-slate-200 text-xl'>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderRadius:12,  borderWidth: 1, marginBottom: 10, padding: 8 },
});

export default SignUpPage;
