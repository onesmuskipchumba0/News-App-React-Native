import React, { useRef } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Link } from 'expo-router'; // Use Link from Expo Router

const SCREEN_WIDTH = Dimensions.get('window').width;

const OffCanvas = ({ isOpen, onClose }) => {
  const animation = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH * 0.75, 0], // Slide from left
  });

  return (
    <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.close}>✕ Close</Text>
      </TouchableOpacity>

      <Link href="/" style={styles.link}>Home</Link>
      <Link href="/account" style={styles.link}>Profile</Link>
      <Link href="/categories" style={styles.link}>Category</Link>
      <Link href="/explore" style={styles.link}>Explore</Link>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: '#333',
    padding: 20,
    zIndex: 1,
  },
  close: { color: 'white', fontSize: 18, marginBottom: 20,marginTop:StatusBar.currentHeight },
  link: { color: 'white', fontSize: 20, marginVertical: 10 },
});

export default OffCanvas;
