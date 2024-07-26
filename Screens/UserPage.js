import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const UserPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    email: '',
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const handleFocus = (input) => {
    setFocusedInput(input);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleUpdateProfile = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        await firestore().collection('users').doc(user.uid).update(userData);
        console.log('User data updated successfully');
        navigation.navigate('Home'); // Navigate to another screen after update
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error
    }
  };

  const handleChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
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
          <Text style={styles.centerText}>Update your info...</Text>
          <TextInput
            label="Name"
            value={userData.name}
            onChangeText={text => handleChange('name', text)}
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
            style={styles.input}
          />
          <TextInput
            label="Phone Number"
            value={userData.phoneNumber}
            onChangeText={text => handleChange('phoneNumber', text)}
            onFocus={() => handleFocus('phoneNumber')}
            onBlur={handleBlur}
            style={styles.input}
          />
          <TextInput
            label="Address"
            value={userData.address}
            onChangeText={text => handleChange('address', text)}
            onFocus={() => handleFocus('address')}
            onBlur={handleBlur}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={userData.email}
            onChangeText={text => handleChange('email', text)}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            style={styles.input}
            editable={false} // Email should not be editable
          />
          <Button mode="contained" onPress={handleUpdateProfile} style={styles.button}>
            Update Profile
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text1: {
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
  },
  text2: {
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 35,
  },
  centerText: {
    fontSize: 18,
    color: 'black',
    paddingBottom: 15,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: "25%",
    justifyContent: 'flex-start',
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomColor: '#ccc',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#E6F6F8",
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

export default UserPage;
