import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AmulBuffalo from './AmulBuffalo';
import PayOption from './PayOption';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageUri2, setImageUri2] = useState(null);
  const[imageUri3,setImageUri3]=useState(null);
  const[imageUri4,setImageUri4]=useState(null);
  const[imageUri5,setImageUri5]=useState(null);
  const [isHomePage, setIsHomePage] = useState(true); // Adjust based on actual page



  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const userRef = firestore().collection('users').doc(currentUser.uid);
          const doc = await userRef.get();
          if (doc.exists) {
            const userData = doc.data();
            setUserName(userData.name);
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };

    

    const fetchImageUri = async (imagePath, setImageUri) => {
      try {
        const storageRef = storage().ref(imagePath);
        const url = await storageRef.getDownloadURL();
        setImageUri(url);
      } catch (error) {
        console.log('Error getting download URL:', error);
      }
    };

    fetchUserData();
    fetchImageUri('AmulTaaza-removebg-preview (1).png', setImageUri);
    fetchImageUri('AmulGold2-removebg-preview.png', setImageUri2);
    fetchImageUri('AmulBuffalo2Try.png',setImageUri3);
    fetchImageUri('download.png',setImageUri4);
    fetchImageUri('Market-removebg-preview.png',setImageUri5);



  }, []);

  const handleImagePress = () => {
    navigation.navigate('UserPage');
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <LinearGradient
        colors={['#b5e0f3', '#e0f7fa']}
        style={styles.gradient}>
        <View style={styles.container}>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(129,212,250,0)']}
            style={styles.gradient}>
            <View style={styles.textContainer}>
              <TouchableOpacity onPress={handleImagePress}>
                <Image
                  source={require('../assets/Users2.png')}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
              <Text style={styles.text}>Hello, {userName}</Text>
            </View>

            <View style={styles.searchContainer}>
              <Image
                source={require('../assets/Search.png')}
                style={{ width: 20, height: 20 }}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search your product"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <ScrollView style={styles.scrollView}>
              <View style={styles.AmulContainer}>
                <Text style={styles.AmulText}>
                  Your <Text style={{ color: '#00597f' }}>Daily Milk 🐄🥛</Text>
                </Text>
              </View>

              <View style={styles.ProductContainer}>
                <View style={styles.indi}>
                  <TouchableOpacity>
                    {imageUri &&
                      <Image
                        source={{ uri: imageUri }}
                        style={styles.image1}
                      />}
                  </TouchableOpacity>
                  <View style={styles.textWrapper}>
                    <Text
                      style={styles.maindescriptionInput}
                    >Amul Taaza Toned Fresh Milk</Text>
                    <Text
                      style={styles.descriptionInput}
                    >500mL</Text>
                  </View>
                  <View style={styles.Pricecontainer}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.originalPrice}>₹28</Text>
                      <Text style={styles.discountedPrice}>₹27½ </Text>
                    </View>
                    <TouchableOpacity style={styles.Pricebutton} onPress={() => navigation.navigate('AmulTaaza')}>
                      <Text style={{ color: 'blue', fontWeight: '600' }}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.indi}>
                  <TouchableOpacity>
                    {imageUri2 &&
                      <Image
                        source={{ uri: imageUri2 }}
                        style={styles.image2}
                      />}
                  </TouchableOpacity>

                  <View style={styles.textWrapper}>
                    <Text
                      style={styles.maindescriptionInput}
                    >Amul Gold Toned Fresh Milk</Text>
                    <Text
                      style={styles.descriptionInput}
                    >500mL/1L</Text>
                  </View>
                  <View style={styles.Pricecontainer}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.originalPrice}>₹35</Text>
                      <Text style={styles.discountedPrice}>₹33½</Text>
                    </View>
                    <TouchableOpacity style={styles.Pricebutton} onPress={() => navigation.navigate('AmulGold')}>
                      <Text style={{ color: 'blue', fontWeight: '600' }}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.indi}>
                  <TouchableOpacity>
                    {imageUri3 &&
                      <Image
                        source={{ uri: imageUri3 }}
                        style={styles.image3}
                      />}
                  </TouchableOpacity>
                  <View >
                    <View style={styles.textWrapper}>
                      <Text
                        style={styles.maindescriptionInput}
                      >Amul Buffalo A2 Fresh Milk</Text>
                      <Text
                        style={styles.descriptionInput}
                      >1L</Text>
                    </View>
                    <View style={styles.Pricecontainer}>
                      <View style={styles.priceContainer}>
                        <Text style={styles.originalPrice}>₹72</Text>
                        <Text style={styles.discountedPrice}>₹71 </Text>
                      </View>
                      <TouchableOpacity style={styles.Pricebutton} onPress={()=> navigation.navigate('AmulBuffalo')}>
                        <Text style={{ color: 'blue', fontWeight: '600' }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
                <View style={styles.indi}>
                  <TouchableOpacity>
                    {imageUri &&
                      <Image
                        source={{ uri: imageUri4}}
                        style={styles.image1}
                      />}
                  </TouchableOpacity>
                  <View style={styles.textWrapper}>
                    <Text
                      style={styles.maindescriptionInput}
                    >Gokul Full Cream Fresh Milk</Text>
                    <Text
                      style={styles.descriptionInput}
                    >500mL/1L</Text>
                  </View>
                  <View style={styles.Pricecontainer}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.originalPrice}>₹36</Text>
                      <Text style={styles.discountedPrice}>₹35½ </Text>
                    </View>
                    <TouchableOpacity style={styles.Pricebutton} onPress={() => navigation.navigate('Gokul')}>
                      <Text style={{ color: 'blue', fontWeight: '600' }}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </ScrollView>
          </LinearGradient>
        </View>
        <View style={{borderTopWidth:1,borderColor:'grey', justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('CartPage')}>
      <View style={{ alignItems: 'center' }}> 
        {imageUri5 &&
          <Image
            source={{ uri: imageUri5 }}
            style={{ width: 50, height: 50 }} // Image size
          />
        }
        <Text style={{  fontSize: 16,minWidth:45,paddingHorizontal:'5%' }}>Cart</Text> 
      </View>
    </TouchableOpacity>
          
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maincontainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 5,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  scrollView: {
    // marginHorizontal: 5,
    marginVertical: 10,
  },
  AmulContainer: {
    alignItems: 'center',
  },
  Pricecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
    marginTop: 16,
    padding:5,
  },
  priceContainer: {
    flexDirection: 'column',
    margin: 1,
    padding:5, // Adds some space between the price and the button
  },
  Pricebutton: {
    borderWidth: 2,
    margin:"4%",
    marginVertical: "14%",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
    borderColor: 'blue',
    color: 'blue',
    fontWeight: '700',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'grey',
    paddingRight: 1,
    fontSize: 15,
  },
  discountedPrice: {
    color: 'black',
    paddingRight: 8,
    fontSize: 20,
    fontWeight: '500'
  },
  
  indi: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginRight:5,
    marginVertical:5,
    width: windowWidth *  0.28,
    height: windowHeight * 0.31,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image1: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.14,
    resizeMode: 'contain',
  },
  image2: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.14,
    resizeMode: 'contain',
  },
  image3: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.14,
    resizeMode: 'contain',
  },
  ProductContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textWrapper: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 15,
    marginHorizontal: 12,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color:'grey'
  },
  text: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  AmulText: {
    alignItems: 'center',
    marginTop: 10,
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  maindescriptionInput: {
    paddingHorizontal: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  descriptionInput: {
    paddingLeft: 5,
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#a5a5a5',
  },
});

export default Home;
