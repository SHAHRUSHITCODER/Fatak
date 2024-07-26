import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const PayOption = () => {
  const [cartTotal, setCartTotal] = useState(0);

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

          let total = 0;
          let subscribtion=[]
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
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <View style={styles.container}>
    
      <Text style={styles.totalText}>₹{cartTotal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default PayOption;
