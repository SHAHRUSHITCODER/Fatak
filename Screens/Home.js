import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageUri2, setImageUri2] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userRef = firestore().collection('users').doc(currentUser.uid);
      userRef.get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUserName(userData.name);
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });

      const storageRef = storage().ref('AmulTaaza-removebg-preview (1).png');
      storageRef.getDownloadURL()
        .then((url) => {
          setImageUri(url);
        })
        .catch((error) => {
          console.log('Error getting download URL:', error);
        });

      const storageRef2 = storage().ref('AmulGold2-removebg-preview.png');
      storageRef2.getDownloadURL()
        .then((url) => {
          setImageUri2(url);
        })
        .catch((error) => {
          console.log('Error getting download URL:', error);
        });
    }
  }, []);

  const handleImagePress = () => {
    navigation.navigate('UserPage');
  };

  return (
    <LinearGradient
      colors={['#b5e0f3', '#e0f7fa']}
      style={styles.maincontainer}>
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
              Your <Text style={{ color: '#00597f' }}>Amul's</Text>
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
                  >500mL/1L</Text>
                </View>
                <View style={styles.Pricecontainer}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>₹27</Text>
                    <Text style={styles.discountedPrice}>₹26</Text>
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
                    <Text style={styles.discountedPrice}>₹33</Text>
                  </View>
                  <TouchableOpacity style={styles.Pricebutton} >
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
                <View >
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
                      <Text style={styles.originalPrice}>₹27</Text>
                      <Text style={styles.discountedPrice}>₹26</Text>
                    </View>
                    <TouchableOpacity style={styles.Pricebutton}>
                      <Text style={{ color: 'blue', fontWeight: '600' }}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
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
                  >500mL/1L</Text>
                </View>
                <View style={styles.Pricecontainer}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>₹27</Text>
                    <Text style={styles.discountedPrice}>₹26</Text>
                  </View>
                  <TouchableOpacity style={styles.Pricebutton}>
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
                    <Text style={styles.originalPrice}>₹27</Text>
                    <Text style={styles.discountedPrice}>₹26</Text>
                  </View>
                  <TouchableOpacity style={styles.Pricebutton}>
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
                <View >
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
                      <Text style={styles.originalPrice}>₹27</Text>
                      <Text style={styles.discountedPrice}>₹26</Text>
                    </View>
                    <TouchableOpacity style={styles.Pricebutton}>
                      <Text style={{ color: 'blue', fontWeight: '600' }}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
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
                  >500mL/1L</Text>
                </View>
                <View style={styles.Pricecontainer}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>₹27</Text>
                    <Text style={styles.discountedPrice}>₹26</Text>
                  </View>
                  <TouchableOpacity style={styles.Pricebutton}>
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
                    <Text style={styles.originalPrice}>₹27</Text>
                    <Text style={styles.discountedPrice}>₹26</Text>
                  </View>
                  <TouchableOpacity style={styles.Pricebutton}>
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
                <View >
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
                      <Text style={styles.originalPrice}>₹27</Text>
                      <Text style={styles.discountedPrice}>₹26</Text>
                    </View>
                    <TouchableOpacity style={styles.Pricebutton}>
                      <Text style={{ color: 'blue', fontWeight: '600' }}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </LinearGradient>
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
    marginHorizontal: 12,
    marginVertical: 18,
    height: windowHeight * 1.5, // Adjust the height as needed
  },
  AmulContainer: {
    flex: 1,
    alignItems: 'center',
  },
  Pricecontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  priceContainer: {
    flexDirection: 'column',
    marginRight: 12, // Adds some space between the price and the button
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'grey',
    marginRight: 1,
    fontSize: 15,
  },
  discountedPrice: {
    color: 'black',
    marginRight: 8,
    fontSize: 20,
    fontWeight: '500'
  },
  Pricebutton: {
    borderWidth: 2,
    marginLeft: 14,
    marginVertical: 14,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
    borderColor: 'blue',
    color: 'blue',
    fontWeight: '700',
  },
  indi: {
    flex: 1,
    alignItems: 'center',
    // borderWidth: 2,
    margin: 5,
    width: windowWidth * 0.4,
    height: windowHeight * 0.31,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image1: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.14,
  },
  image2: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.14,
  },
  ProductContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    
  },
  textWrapper: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
