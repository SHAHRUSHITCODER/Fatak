import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration, Animated } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const COD = () => {
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  const handleLongPress = () => {
    setIsLongPressing(true);
    Vibration.vibrate(100); // Short vibration to indicate start

    setTimeout(async () => {
      Vibration.vibrate(100); // Short vibration to indicate end
      setOrderConfirmed(true);

      // Update Firestore document
      try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          console.log('User authenticated:', currentUser.uid); // Debugging log
          await firestore().collection('users').doc(currentUser.uid).set({
            orderPlaced: true,
            lastUpdated: firestore.FieldValue.serverTimestamp(), // Add a timestamp for the update
          }, { merge: true });
          console.log('Order placed successfully.');
        } else {
          console.log('No user is authenticated.'); // Debugging log
        }
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }, 3000);
  };

  useEffect(() => {
    if (orderConfirmed) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();

      // Navigate to the home page after 10 seconds
      const timer = setTimeout(() => {
        navigation.navigate('Home'); // Adjust 'Home' to your actual home route name
      }, 7000); // 10 seconds

      // Clear the timeout if the component is unmounted before the timeout completes
      return () => clearTimeout(timer);
    }
  }, [orderConfirmed]);

  const animatedStyle = {
    opacity: animatedValue,
  };

  return (
    <View style={styles.container}>
      {!orderConfirmed ? (
        <TouchableOpacity
          style={styles.button}
          onLongPress={handleLongPress}
          onPressOut={() => setIsLongPressing(false)}
        >
          <Text style={styles.buttonText}>Long Hold to Confirm</Text>
        </TouchableOpacity>
      ) : (
        <Animated.View style={[styles.confirmationContainer, animatedStyle]}>
          <Text style={styles.confirmationText}>
            🎉 Order Confirmed! 🎉
          </Text>
          <Text style={styles.emojiText}>🎊🥳🎉✨🎈</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#008ffd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    minWidth:300
  },
  confirmationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
  emojiText: {
    fontSize: 36,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default COD;
