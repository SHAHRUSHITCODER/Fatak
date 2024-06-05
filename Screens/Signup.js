import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground,ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore

import { useNavigation } from '@react-navigation/native';


const Signup = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);  
  const navigation = useNavigation();


  const handleFocus = (input) => {
    setFocusedInput(input);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Now you can use userInfo.user to get user details like name, email, etc.
    } catch (error) {
      console.log('Google Sign-In error:', error);
    }
  };
  

  const handleSignup = async () => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const { user } = response;
      // Store additional user data like name, dob, address in Firestore
      await firestore().collection('users').doc(user.uid).set({
        name,
        phoneNumber,
        address,
        email,
      });
      console.log('User signed up successfully:', user);
      navigation.navigate('Home');
      // Navigate to other screen or perform other actions after signup
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error
    }

  };

  return (

    <ImageBackground
      source={require('../assets/background3.jpg')}
      style={styles.backgroundImage}
    >
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text1}>
          <Text style={{ color: '#00597f' }}>Hey</Text> There!!!{' '}
          <Text style={{ opacity: 1 }}>🫡</Text>
        </Text>

        <Text style={styles.text2}>
          Welcome To <Text style={{ color: '#00597f' }}>Fatak</Text>
        </Text>
        <Text style={styles.centerText}>Just wanted some basic info...</Text>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          style={styles.input}
        />
        <TextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          onFocus={() => handleFocus('phoneNumber')}
          onBlur={handleBlur}
          style={styles.input}
        />
        <TextInput
          label="Address"
          value={address}
          onChangeText={text => setAddress(text)}
          onFocus={() => handleFocus('address')}
          onBlur={handleBlur}
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          onFocus={() => handleFocus('email')}
          onBlur={handleBlur}
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          onFocus={() => handleFocus('password')}
          onBlur={handleBlur}
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSignup} style={styles.button}>
          Sign Up
        </Button>
      </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text1:{
    fontSize:50,
    color:'black',
    textAlign: 'center', // Add this
  },
  text2:{
    fontSize:35,
    color:'black',
    textAlign: 'center',
    paddingBottom:35, // Add this
  },
  centerText: {
    fontSize:18,
    color:'black',
    paddingBottom:15,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical:"25%",
    justifyContent: 'flex-start',
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderBottomColor: '#ccc',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor:"#E6F6F8",
  },
  label: {
    position: 'absolute',
    left: 0,
    top: ({ focused }) => (focused ? -20 : 15),
    fontSize: ({ focused }) => (focused ? 12 : 16),
    color: ({ focused }) => (focused ? '#007AFF' : '#6C6C6C'),
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 10,
  },
});

export default Signup;
