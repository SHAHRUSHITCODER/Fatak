import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground,ScrollView,TouchableOpacity } from 'react-native';
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
  

  const handleSignIn=async()=>
    {
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            const { user } = response;
            console.log('User signed in successfully:', user);
            // Navigate to Home.js upon successful sign-in
            navigation.navigate('Home'); // Adjust 'Home' to match the name of your Home screen
          } catch (error) {
            console.error('Error signing in:', error);
            // Handle error
          }
    }

  return (

    <ImageBackground
      source={require('../assets/background3.jpg')}
      style={styles.backgroundImage}
    >
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text1}>
          <Text style={{ color: '#00597f' }}>Welcome </Text> Back!!!{' '}
          <Text style={{ opacity: 1 }}>👋</Text>
        </Text>

        {/* <Text style={styles.text2}>
          Welcome To <Text style={{ color: '#00597f' }}>Fatak</Text>
        </Text> */}
        <Text style={styles.centerText}>Glad to see you at Fatak...</Text>
        
        
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
        <Button mode="contained" onPress={handleSignIn} style={styles.button}>
          Sign In
        </Button>
        <Text style={styles.new1}>
    Don't have an account?{' '}
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.new}>
            Click Here
        </Text>
    </TouchableOpacity>
</Text>

        


      </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text1:{
    fontSize:40,
    color:'black',
    textAlign: 'center',
    paddingBottom:15,
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
  new:
  {
    color:'#00597f',
    textAlign:'right',
    fontSize:15,
    marginTop:15,
    

  },
  new1:
  {
    color:'black',
    textAlign:'right',
    fontSize:15,
    marginTop:15,

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
