import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'; // Import storage

const UPIscreen = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const [qrCodeUri, setQRCodeUri] = useState(null);
  const [loading, setLoading] = useState(true);

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
              return {
                planType: userData.selectedPlan || '',
              };
            }
            return null;
          });

          const results = await Promise.all(promises);
          const filteredResults = results.filter((result) => result !== null);

          let subscription = [];
          filteredResults.forEach((result) => {
            if (result.planType.includes('Daily')) {
              subscription.push(39);
            } else if (result.planType.includes('Weekly')) {
              subscription.push(59);
            } else if (result.planType.includes('Monthly')) {
              subscription.push(99);
            }
          });

          const maxElement = Math.max(...subscription);
          setCartTotal(maxElement);
          fetchQRCodeUrl(maxElement); // Fetch QR code URL after setting cart total
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    const fetchQRCodeUrl = async (total) => {
      let qrCodePath = '';
      if (total === 39) {
        qrCodePath = '39.jpeg';
      } else if (total === 59) {
        qrCodePath = '59.jpeg';
      } else if (total === 99) {
        qrCodePath = '99.jpeg';
      }

      if (qrCodePath) {
        try {
          const url = await storage().ref(qrCodePath).getDownloadURL();
          setQRCodeUri(url);
          setLoading(false); // Set loading to false after fetching the QR code URL
        } catch (error) {
          console.error('Error fetching QR code URL:', error);
        }
      }
    };

    fetchProductData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {qrCodeUri && <Image source={{ uri: qrCodeUri }} style={styles.qrCode} />}
      <Text style={{minWidth:Dimensions.get('window').width*0.90,padding:'auto',}}>You Will receive a confirmation message in One hour</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCode: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.90,
    marginTop: 20,
  },
});

export default UPIscreen;
