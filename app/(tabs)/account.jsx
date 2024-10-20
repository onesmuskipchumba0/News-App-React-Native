// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Linking } from 'react-native';
import { auth, firestore } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router'; // Import the router
import Header from '../../components/Header';
import OffCanvas from '../../components/offCanvas';
const ProfilePage = () => {
    const openLink = async (url) => {
        if (!url) return;
        Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
      };
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize the router
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid; // Get the current user's ID
        if (userId) {
          const userRef = doc(firestore, 'users', userId); // Reference the user's document
          const userDoc = await getDoc(userRef); // Fetch the document
          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Set user data if document exists
          } else {
            console.log('No such user document!'); // Log if no document found
          }
        } else {
          console.log('No user is currently logged in.'); // Log if no user is authenticated
        }
      } catch (error) {
        console.error('Error fetching user data:', error); // Log any fetch errors
      } finally {
        setLoading(false); // Set loading to false regardless of success
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Logout Successful!', 'You have been logged out.');
      router.push('/auth/LoginPage'); // Navigate to Login Page after logout
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  if (loading) {
    return (
        <><Header /><Text>Loading...</Text></>
); // Show loading message
  }

  if (!userData) {
    return (
        <><Header /><Text>No user data available.</Text></>); // Show no data message
  }

  return (
    <>
    <Header onMenuToggle={() => setIsMenuOpen(true)} />
    <OffCanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    <View style={styles.container}>
          <Text style={styles.username}>Welcome, {userData.firstName} {userData.lastName}!</Text>
          <Text style={styles.label}>Email: {auth.currentUser?.email}</Text>
          <Text style={styles.label}>Phone: {userData.phone}</Text>
          <Text style={styles.label}>Gender: {userData.gender}</Text>

          {/* Add additional functionality to buttons */}
          <Button title="View Github" onPress={() =>openLink('https://github.com/onesmuskipchumba0') } />
          <Button title="Logout" onPress={handleLogout} color="red" />
      </View></>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  username: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 18, marginBottom: 10 },
});

export default ProfilePage;
