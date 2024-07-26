import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
// import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';


import AmulTaaza from './AmulTaaza';
import UserPage from './UserPage';

const ProductCard = ({ product, imageUri, quantity, quantity2, selectedDays, planType, total }) => {
  const navigation = useNavigation();
  const daysOfWeek = ['Mo', 'Tue', 'We', 'Thu', 'Fri', 'Sat', 'Sun'];

  const componentMapping = {
    'Amul Taaza': 'AmulTaaza',
    'Amul Gold': 'AmulGold',
    'Amul Buffalo': 'AmulBuffalo',
    'Gokul': 'Gokul',
    // Add more mappings here
  };

  if (quantity <= 0 && quantity2 <= 0) {
    return null;
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.indiBox}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(componentMapping[product])}>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image1} />}
        </TouchableOpacity>
        <View style={styles.orderDetails}>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>{product}</Text>
          {quantity > 0 && <Text style={{ color: 'grey' }}>Quantity 1L: {quantity}</Text>}
          {quantity2 > 0 && <Text style={{ color: 'grey' }}>Quantity 500mL: {quantity2}</Text>}
          <Text style={{ color: 'grey' }}>Days: </Text>
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day) => (
              <Text key={day} style={[styles.day, selectedDays.includes(day) && styles.selectedDay]}>
                {day}
              </Text>
            ))}
          </View>
          <Text style={{ color: 'grey' }}>Plan Type: {planType}</Text>
        </View>
        <View style={{ marginVertical: 'auto', marginLeft: Dimensions.get('window').width * 0.05 }}>
          <Text style={{ minWidth: 100, fontSize: 15, fontWeight: 'bold', color: 'black' }}>₹{total}/day</Text>
        </View>
      </View>
    </View>
  );
};

const CartPage = () => {
  const [products, setProducts] = useState([
    { name: 'Amul Taaza', imagePath: 'AmulTaaza-removebg-preview (1).png', firestoreCollection: 'ordersAmulTaaza' },
    { name: 'Amul Gold', imagePath: 'AmulGold2-removebg-preview.png', firestoreCollection: 'ordersAmulGold' },
    { name: 'Amul Buffalo', imagePath: 'AmulBuffalo2-removebg-preview.png', firestoreCollection: 'ordersAmulBuffalo' },
    { name: 'Gokul', imagePath: 'Gokul1L-removebg-preview.png', firestoreCollection: 'ordersGokul' },
    // Add more products here
  ]);

  const [productData, setProductData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const promises = products.map(async (product) => {
            const doc = await firestore()
              .collection(product.firestoreCollection)
              .doc(currentUser.uid)
              .get();

            if (doc.exists) {
              const userData = doc.data();
              const storageRef = storage().ref(product.imagePath);
              const imageUrl = await storageRef.getDownloadURL();

              return {
                name: product.name,
                imageUri: imageUrl,
                quantity: userData.quantity1L || userData.quantityBuffalo || userData.Gokulquantity1L,
                quantity2: userData.quantityTaaza || userData.quantity500mL || userData.Gokulquantity500mL || 0,
                selectedDays: userData.selectedDays || [],
                planType: userData.selectedPlan || '',
                total: userData.taazaTotal || userData.totalGold || userData.totalBuffalo || userData.totalGokul || 0,
              };
            }
            return null;
          });

          const results = await Promise.all(promises);
          const filteredResults = results.filter((result) => result !== null);
          setProductData(filteredResults);
          setCartTotal(filteredResults.reduce((acc, product) => acc + product.total, 0));
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [products]);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={styles.upperBar}>
          <ImageBackground source={require('../assets/Rain.png')} style={styles.imageBackground}>
            <Text style={{ fontSize: 18, color: '#0000a6', textAlign: 'center' }}>Be it Rain ⛈️</Text>
            <Text style={styles.promiseText}>We promise</Text>
          </ImageBackground>
          <ImageBackground source={require('../assets/Summer.png')} style={styles.imageBackground}>
            <Text style={{ fontSize: 18, color: '#ffd016', textAlign: 'center' }}>Summer ☀️</Text>
            <Text style={styles.promiseText}>to deliver</Text>
          </ImageBackground>
          <ImageBackground source={require('../assets/winter.png')} style={styles.imageBackground}>
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>or Winter 🥶</Text>
            <Text style={styles.promiseText}>before 7 A.M.</Text>
          </ImageBackground>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: Dimensions.get('window').height * 0.075 }}>
        <View>
          {productData.map((product) => (
            <ProductCard
              key={product.name}
              product={product.name}
              imageUri={product.imageUri}
              quantity={product.quantity}
              quantity2={product.quantity2}
              selectedDays={product.selectedDays}
              planType={product.planType}
              total={product.total}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.lowerBar}>
        <Text style={styles.totalText}>Total: ₹{cartTotal}/day</Text>
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
    color: 'grey',
  },
  selectedDay: {
    color: 'blue',
  },
  lowerBar: {
    backgroundColor: 'grey',
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
});

export default CartPage;

