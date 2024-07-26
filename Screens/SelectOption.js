import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const SelectOption = () => {
  const [products, setProducts] = useState([
    { name: 'Amul Taaza', imagePath: 'AmulTaaza-removebg-preview (1).png', firestoreCollection: 'ordersAmulTaaza' },
    { name: 'Amul Gold', imagePath: 'AmulGold2-removebg-preview.png', firestoreCollection: 'ordersAmulGold' },
    { name: 'Amul Buffalo', imagePath: 'AmulBuffalo2-removebg-preview.png', firestoreCollection: 'ordersAmulBuffalo' },
    { name: 'Gokul', imagePath: 'Gokul1L-removebg-preview.png', firestoreCollection: 'ordersGokul' },
  ]);
  const navigation = useNavigation(); // Get the navigation object

  const [cartTotal, setCartTotal] = useState(0);
  const [subscriptionDuration, setSubscriptionDuration] = useState('');
  const translateX = useSharedValue(-Dimensions.get('window').width); // Initial position of the scanner

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const products = [
            { name: 'Amul Taaza', firestoreCollection: 'ordersAmulTaaza' },
            { name: 'Amul Gold', firestoreCollection: 'ordersAmulGold' },
            { name: 'Amul Buffalo', firestoreCollection: 'ordersAmulBuffalo' },
            { name: 'Gokul', firestoreCollection: 'ordersGokul' },
          ];

          const promises = products.map(async (product) => {
            const doc = await firestore().collection(product.firestoreCollection).doc(currentUser.uid).get();
            if (doc.exists) {
              const userData = doc.data();
              console.log(userData);
              return {
                planType: userData.selectedPlan || '',
              };
            } else {
              console.log("error");
            }
            return null;
          });

          const results = await Promise.all(promises);
          const filteredResults = results.filter((result) => result !== null);

          let subscribtion = [];
          filteredResults.forEach((result) => {
            if (result.planType.includes('Daily')) {
              subscribtion.push(39);
            } else if (result.planType.includes('Weekly')) {
              subscribtion.push(59);
            } else if (result.planType.includes('Monthly')) {
              subscribtion.push(99);
            }
          });
          let maxElement = Math.max(...subscribtion);
          setCartTotal(maxElement);

          // Set subscription duration based on the amount
          let duration = '';
          if (maxElement === 29) {
            duration = 'One Day';
          } else if (maxElement === 59) {
            duration = 'One Week';
          } else if (maxElement === 99) {
            duration = 'One Month';
          }
          setSubscriptionDuration(duration);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();

    translateX.value = withRepeat(
      withTiming(Dimensions.get('window').width, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1, // Repeat infinitely
      true // Reverse direction
    );
  }, [translateX]);

  const scannerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={styles.upperBar}>
          <ImageBackground source={require('../assets/Rain.png')} style={styles.imageBackground}>
            <Text style={{ fontSize: 18, color: '#0000a6', textAlign: 'center', minWidth: 50 }}>Be it Rain ⛈️</Text>
            <Text style={styles.promiseText}>We promise</Text>
          </ImageBackground>
          <ImageBackground source={require('../assets/Summer.png')} style={styles.imageBackground}>
            <Text style={{ fontSize: 18, color: '#ffd016', textAlign: 'center', minWidth: 50 }}>Summer ☀️</Text>
            <Text style={styles.promiseText}>to deliver</Text>
          </ImageBackground>
          <ImageBackground source={require('../assets/winter.png')} style={styles.imageBackground}>
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', minWidth: 50 }}>or Winter 🥶</Text>
            <Text style={styles.promiseText}>before 7 A.M.</Text>
          </ImageBackground>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 20, marginHorizontal: '3%', marginTop: '5%', color: '#404040' }}>
          Select Option
        </Text>
        <Text style={{ fontSize: 20, marginHorizontal: '3%', color: '#404040' }}>
          To Pay:<Text style={{ color: 'blue' }}> ₹{cartTotal} </Text><Text style={{fontSize:15}}>for {subscriptionDuration}</Text>
        </Text>
        {/* <Text style={{ fontSize: 20, marginHorizontal: '3%', color: '#404040' }}>
          Subscription Duration: <Text style={{ color: 'blue' }}>{subscriptionDuration}</Text>
        </Text> */}
        <View>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: '3%', marginHorizontal: '3%' }} onPress={()=> navigation.navigate('UPIscreen')}>
            <Image
              source={require('../assets/upi_logo_icon_169316.png')}
              style={{
                width: 45,
                height: 45,
                borderRadius: 22.5, // half of width/height to make it circular
                borderWidth: 1, // adjust the border width as needed
                borderColor: '#404040', // adjust the border color as needed
              }}
              resizeMode="contain"
            />
            <Text style={{ marginLeft: '2%', fontSize: 18, color: '#404040', minWidth: 500 }}>Pay Via UPI Through QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
     
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: '3%', marginHorizontal: '3%' }}>
        <Image
          source={require('../assets/Rupee-removebg-preview.png')}
          style={{
            width: 45,
            height: 45,
            borderRadius: 22.5, // half of width/height to make it circular
            borderWidth: 1, // adjust the border width as needed
            borderColor: '#404040', // adjust the border color as needed
          }}
          resizeMode="contain"
        />
        <Text style={{ marginLeft: '2%', fontSize: 18, color: '#404040', minWidth: 500 }} onPress={()=> navigation.navigate('COD')}>Cash On Delivery</Text>
      </TouchableOpacity>

      <View style={styles.lowerBar} onPress={() => console.log('Lower bar pressed')}>
        <Text style={styles.totalText}>Total: ₹{cartTotal}</Text>
        <Animated.View style={[styles.scanner, scannerStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '30%',
    height: 85,
  },
  promiseText: {
    minWidth: '70%',
    textAlign: 'center',
    color: '#ddf9f4',
  },
  indiBox: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.12,
    marginVertical: '5.25%',
  },
  image1: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').height * 0.17,
    resizeMode: 'contain',
  },
  orderDetails: {
    marginVertical: 'auto',
  },
  daysContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  day: {
    marginHorizontal: 1.5,
    color: '#404040',
  },
  selectedDay: {
    color: 'blue',
  },
  lowerBar: {
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '7.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scanner: {
    width: 75,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    position: 'absolute',
    top: 0,
  },
});

export default SelectOption;
