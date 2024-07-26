import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity,ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import AmulTaaza from './AmulTaaza';
import UserPage from './UserPage';

const ProductCard = ({ product, imageUri, quantity, quantity2, selectedDays, planType, total }) => {
  const navigation = useNavigation();
  const daysOfWeek = ['Mo', 'Tue', 'We', 'Thu', 'Fri', 'Sat', 'Sun'];


  const componentMapping = {
    'Amul Taaza': 'AmulTaaza',
    'Amul Gold': 'AmulGold',
    'Amul Buffalo':'AmulBuffalo',
    'Gokul':'Gokul',
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
                quantity:  userData.quantity1L || userData.quantityBuffalo||userData.Gokulquantity1L,
                quantity2: userData.quantityTaaza ||userData.quantity500mL || userData.Gokulquantity500mL||0,
                selectedDays: userData.selectedDays || [],
                planType: userData.selectedPlan || '',
                total: userData.taazaTotal || userData.totalGold ||userData.totalBuffalo|| userData.totalGokul|| 0,
              };
            }
            return null;
          });

          const results = await Promise.all(promises);
          setProductData(results.filter((result) => result !== null));
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [products]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.upperBar}>
        <Text style={{minWidth:'70%',fontSize:18,color:'#66588d'}}>Be it Rain ⛈️ Summer ☀️ or Winter 🥶</Text>
         <Text style={{minWidth:'70%'}}>We promise to deliver before 7 A.M.</Text>

      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: Dimensions.get('window').height * 0.075 }}>
      <View >
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
      <View style={styles.lowerBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    upperBar: {
        flex: 0.10,
        backgroundColor: 'lightblue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        margin: 5,
    },
  indiBox: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.12,
    marginVertical: '5.25  %',
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
    flex: 0.75,
    backgroundColor: 'grey',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '7.5%',
  },
});

export default CartPage;
