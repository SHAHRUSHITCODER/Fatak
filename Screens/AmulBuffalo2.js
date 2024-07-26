import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
const planType=['Daily','Weekly','Monthly'];

const daysOfWeekMain = ['Sun', 'Mo', 'Tue', 'We', 'Thu', 'Fri', 'Sat'];

const Gokul = () => {
  const [data, setData] = useState(null);
  const [userName,setUserName]=useState('');
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isProductInfoVisible, setIsProductInfoVisible] = useState(false);
  const flatListRef = useRef(null);
  const [quantity, setQuantity] = useState(0);
  const [quantity1L, setQuantity1L] = useState(0);

  const [total, setTotal] = useState(0);
  const [total1L, setTotal1L] = useState(0);

  const [discTotal, setdiscTotal] = useState(0);
  const [discTotal1L, setdiscTotal1L] = useState(0);

  const [finalTotal,setfinalTotal]= useState(0);

  const [selectedDays, setSelectedDays] = useState([null]);
  const [selectedPlan, setSelectedPlan] = useState([]);


  const storeQuantity = async (quantity) => {
    try {
      await AsyncStorage.setItem('@quantity', quantity.toString());
    } catch (e) {
      console.error('Failed to save the quantity to the storage', e);
    }
  };

  const getQuantity = async () => {
    try {
      const value = await AsyncStorage.getItem('@quantity');
      if (value !== null) {
        setQuantity(parseInt(value, 10));
      }
    } catch (e) {
      console.error('Failed to fetch the quantity from storage', e);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 5) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      storeQuantity(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      storeQuantity(newQuantity);
    }
  };

  const storeQuantity1L = async (quantity1L) => {
    try {
      await AsyncStorage.setItem('@quantity1L', quantity1L.toString());
    } catch (e) {
      console.error('Failed to save the quantity to the storage', e);
    }
  };

  const getQuantity1L = async () => {
    try {
      const value = await AsyncStorage.getItem('@quantity1L');
      if (value !== null) {
        setQuantity1L(parseInt(value, 10));
      }
    } catch (e) {
      console.error('Failed to fetch the quantity from storage', e);
    }
  };

  const incrementQuantity1L = () => {
    if (quantity1L < 5) {
      const newQuantity = quantity1L + 1;
      setQuantity1L(newQuantity);
      storeQuantity1L(newQuantity);
    }
  };

  const decrementQuantity1L = () => {
    if (quantity1L > 0) {
      const newQuantity = quantity1L - 1;
      setQuantity1L(newQuantity);
      storeQuantity1L(newQuantity);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        console.log('Current User:', currentUser);
        if (currentUser) {
          const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
          console.log('User Ref:', userRef);
          const doc = await userRef.get();
          console.log('Document:', doc);
          if (doc.exists) {
            const userData = doc.data();
            console.log('User Data:', userData);
            setUserName(userData.name);
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };
  
    fetchUserData();
  }, []);
  
  const addOrderDetails = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        // Log the values to debug which one is undefined
        console.log('userName:', userName);
        console.log('quantity:', quantity);
        console.log('selectedDays:', selectedDays);
        console.log('selectedPlan:', selectedPlan);
  
        if (quantity !== undefined && selectedDays !== undefined && selectedPlan !== undefined) {
          const orderRef = firebase.firestore().collection('ordersGokul').doc(currentUser.uid);
          const userRef= firebase.firestore().collection('users').doc(currentUser.uid);
          await userRef.update({
            Gokulquantity1L:quantity1L,
            Gokulquantity500mL: quantity,
            GokulselectedDays: selectedDays,
            GokulselectedPlan: selectedPlan,
          });
          await orderRef.set({
            name:userName,
            quantity500mL: quantity,
            quantity1L:quantity1L,
            selectedDays: selectedDays,
            selectedPlan: selectedPlan,
            userId: currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          console.log('Order details added successfully');
        } else {
          console.log('One or more required fields are undefined.');
        }
      } else {
        console.log('No user is signed in.');
      }
    } catch (error) {
      console.log('Error adding order details:', error);
    }
  };
  
  
  useEffect(() => {
    getQuantity();
  }, []);

  useEffect(() => {
    getQuantity1L();
  }, []);

  useEffect(() => {
    setTotal(quantity * 34);
  }, [quantity]);

  useEffect(() => {
    setdiscTotal(quantity * 33.5);
  }, [quantity]);

  useEffect(() => {
    setTotal1L(quantity1L * 68);
  }, [quantity1L]);

  useEffect(() => {
    setdiscTotal1L(quantity1L * 67);
  }, [quantity1L]);

  useEffect(()=>
  {
    setfinalTotal((quantity*27.5)+(quantity1L*67))
  },[quantity,quantity1L]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('Gokul')
          .doc('woMzWJwYHVSZEOpVivDU')
          .get();

        if (documentSnapshot.exists) {
          setData(documentSnapshot.data());
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }

      const images = [
        'Gokul1L-removebg-preview.png',
        'Gokul.png',
        'GokulBack.png',
        'GokulEnergy.png',        
      ];

      const fetchImageUrls = images.map(async (imageName) => {
        try {
          const url = await storage().ref(imageName).getDownloadURL();
          return url;
        } catch (error) {
          console.log('Error getting download URL for', imageName, ':', error);
          return null;
        }
      });

      //remove after some time

      // const clearAsyncStorage = async () => {
      //   try {
      //     await AsyncStorage.clear();
      //     console.log('Async Storage cleared successfully');
      //   } catch (error) {
      //     console.error('Error clearing Async Storage:', error);
      //   }
      // };
      
      // // Use with caution
      // clearAsyncStorage();

       //remove after some time

      Promise.all(fetchImageUrls)
        .then((urls) => {
          setImageUrls(urls.filter((url) => url !== null));
        })
        .catch((error) => {
          console.log('Error fetching image URLs:', error);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadSelectedDays = async () => {
      try {
        const storedDays = await AsyncStorage.getItem('@selected_days');
        
        if (storedDays) {
          setSelectedDays(JSON.parse(storedDays));
        }
      } catch (error) {
        console.error('Failed to load selected days', error);
      }
    };

    loadSelectedDays();
  }, []);


  const toggleDay = async (day) => {
    let updatedDays = [...selectedDays];
    if (updatedDays.includes(day)) {
      updatedDays = updatedDays.filter(d => d !== day);
    } else {
      updatedDays.push(day);
    }
    setSelectedDays(updatedDays);
    // Store updated days
    try {
      await AsyncStorage.setItem('@selected_days', JSON.stringify(updatedDays));
    } catch (error) {
      console.error('Failed to save selected days', error);
    }
  };

  useEffect(() => {
    const loadSelectedPlan = async () => {
      try {
        const storedPlan = await AsyncStorage.getItem('@selected_plan');
        
        if (storedPlan) {
          setSelectedPlan(JSON.parse(storedPlan));
        }
      } catch (error) {
        console.error('Failed to load selected Plan', error);
      }
    };

    loadSelectedPlan();
  }, []);
  

  const togglePlan = async (plan) => {
    let updatedPlan = [plan]; // Only one plan should be selected at a time
  
    setSelectedPlan(updatedPlan);
  
    // Store updated plan
    try {
      await AsyncStorage.setItem('@selected_plan', JSON.stringify(updatedPlan));
    } catch (error) {
      console.error('Failed to save selected plan', error);
    }
  };
  

  

  const handlePagination = (event) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / Dimensions.get('window').width);
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  const toggleProductInfo = () => {
    setIsProductInfoVisible(!isProductInfoVisible);
  };

  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>No data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.Imagecontainer}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={imageUrls}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode='contain'
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled
          onScroll={handlePagination}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.paginationContainer}>
          {imageUrls.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.activeDot,
              ]}
              onTouchStart={() => scrollToIndex(index)}
            />
          ))}
        </View>
      </View>
      <ScrollView style={styles.ScrollView}>
        {/* <View style={styles.InfoContainer}> */}
        <TouchableOpacity style={styles.prodinfo} onPress={toggleProductInfo}>
          <Text style={styles.ProductInfoText}>Product Information</Text>
          {/* <Text>UserName :{userName}</Text> */}
          <Text style={styles.DropdownIcon}>▼</Text>
        </TouchableOpacity>
        {isProductInfoVisible && (
          <View style={styles.productDetails}>
            <Text style={styles.ProductText}>{data.Info}</Text>
            <Text style={styles.ProductText}><Text style={{ fontWeight: '700' }}>Shelf Life :</Text> {data.ShelfLife}</Text>
            <Text style={styles.ProductText}><Text style={{ fontWeight: '700' }}>Product Application :</Text> {data.ProductApplication}</Text>
          </View>
        )}
        <View style={styles.Highlight}>
          <Text style={{ color: 'black', fontWeight: '700', fontSize: 17, margin: 4 }}>Highlights</Text>
          <Text style={styles.HighlightText}>Full Cream Milk</Text>
        </View>
        <View style={styles.horizontalLine} />

        <View style={styles.MainQuantityHeader}>
          <View style={styles.QuantityHeaderContainer}>
            <Text style={styles.QuantityHeader}>Gokul X 500mL</Text>
          </View>
          <View style={styles.QuantityConatiner}>
            <View style={styles.priceContainerMain}>
              <Text style={styles.discountedPrice}>₹{data.DiscountPrice}</Text>
              <Text style={styles.OriginalPrice}>₹{data.OriginalPrice}</Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.controlButton} onPress={decrementQuantity}>
                <Text style={styles.controlButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity style={styles.controlButton} onPress={incrementQuantity}>
                <Text style={styles.controlButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Text style={{color:'grey'}}>Total:</Text>
            <View style={{ minWidth: 50 }}>
              <Text style={{color:'grey'}}>{total}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Text style={{color:'grey'}}>Discount:</Text>
            <View style={{ minWidth: 50 }}>
              <Text style={{color:'grey'}}>+ 2%</Text>
            </View>
          </View>
        </View>

        <View style={styles.MainQuantityHeader}>
          <View style={styles.QuantityHeaderContainer}>
            <Text style={styles.QuantityHeader}>Gokul X 1000mL</Text>
          </View>
          <View style={styles.QuantityConatiner}>
            <View style={styles.priceContainerMain}>
              <Text style={styles.discountedPrice}>₹{data.DiscountPrice1L}</Text>
              <Text style={styles.OriginalPrice}>₹{data.OriginalPrice1L}</Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.controlButton} onPress={decrementQuantity1L}>
                <Text style={styles.controlButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity1L}</Text>
              <TouchableOpacity style={styles.controlButton} onPress={incrementQuantity1L}>
                <Text style={styles.controlButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Text style={{color:'grey'}}>Total:</Text>
            <View style={{ minWidth: 50 }}>
              <Text style={{color:'grey'}}>{total1L}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Text style={{color:'grey'}}>Discount:</Text>
            <View style={{ minWidth: 50 }}>
              <Text style={{color:'grey'}}>+ 2%</Text>
            </View>
          </View>
        </View>


        <View style={styles.horizontalLine} />
        <Text style={styles.planTitle}>Select Your Plan Type</Text>

        <View style={styles.planContainer}>
          
          {planType.map(plan => (
            <TouchableOpacity
              key={plan}
              style={[
                styles.planButton,
                selectedPlan.includes(plan) && styles.selectedPlanButton,
              ]}
              onPress={() => togglePlan(plan)}
            >
              <Text style={styles.planButtonText}>{plan}</Text>
            </TouchableOpacity>
          ))}
          </View>
        <View style={styles.horizontalLine} />
        <Text style={styles.daysTitle}>Select Delivery Days</Text>

        <View style={styles.daysContainer}>
          
          {daysOfWeekMain.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.selectedDayButton,
              ]}
              onPress={() => toggleDay(day)}
            >
              <Text style={styles.dayButtonText}>{day}</Text>
            </TouchableOpacity>
          ))}
          </View>
        {/* </View> */}
      </ScrollView>
      <View style={styles.blankSpace}>
        <TouchableOpacity style={styles.addToCartButton} onPress={addOrderDetails}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
          <View style={styles.priceContainerCart}>
              <Text style={styles.TotalPrice}>₹{finalTotal}</Text>
              <Text style={styles.perDayCart}>/day</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Imagecontainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ScrollView: {
    flex: 0.2,
  },
  
  prodinfo: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ProductInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  Highlight: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaebea',
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').height * 0.10,
  },
  HighlightText: {
    justifyContent: 'center',
    alignItems: 'center',
    color:'grey',
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',       // Ensure text is centered horizontally
    textAlignVertical: 'center' // Center text vertically, works on Android
},

  MainQuantityHeader: {
    marginTop: 18,
    marginHorizontal: 10,
  },
  QuantityHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  QuantityHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  priceContainerMain:
  {
     flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').height * 0.075,
  },
  priceContainerCart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    width: Dimensions.get('window').width * 0.30,
    height: Dimensions.get('window').height * 0.075,
  },
  OriginalPrice: {
    textDecorationLine: 'line-through',
    justifyContent:'centre',
    alignItems: 'center',
    color: 'grey',
    marginRight: 8,
    fontSize: 15,
    fontWeight: '500'
  },
  discountedPrice: {
    justifyContent:'centre',
    alignItems: 'center',
    color: 'black',
    marginRight: 8,
    fontSize: 20,
    fontWeight: '500'
  },
  perDayCart: {
    // textDecorationLine: 'line-through',
    justifyContent:'centre',
    alignItems: 'center',
    color: '#D3D3D3',
    marginRight: 8,
    fontSize: 15,
    fontWeight: '500'
  },
  justifyContent:'centre',
    alignItems: 'center',
  TotalPrice: {
    color: 'white',
    marginRight: 8,
    fontSize: 20,
    fontWeight: '500'
  },
  QuantityConatiner: {
    marginTop: 18,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
  controlButton: {
    borderWidth: 1,
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  controlButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    marginTop: 10,
  },
  DropdownIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  productDetails: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    letterSpacing: 2,
  },
  ProductText: {
    fontSize: 15,
    letterSpacing: 1.15,
    margin: 5,
    color: '#8c8c8c',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.35,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '2%',
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccf2f7',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#00597f',
  },
  daysContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap:'wrap',  

  },
  daysTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'grey',


  },
  dayButton: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    minWidth: '10.5%',
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedDayButton: {
    backgroundColor: 'lightblue',
  },
  dayButtonText: {
    fontSize: 16,
    color:'grey',
    
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'grey',
  },
  planContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap', // Allow items to wrap to the next line
  },
  planButton: {
    flexBasis: '30%',
    // minWidth:'30%',
    paddingHorizontal:'5%',
    paddingVertical:'3%',

    justifyContent:'center',
    borderWidth: 1,
    borderRadius: 5,

    borderColor: 'gray',
    marginBottom: 10, // Add some margin to space out the rows
  },
  selectedPlanButton: {
    backgroundColor: 'lightblue',
  },
  planButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color:'grey',

  },
  blankSpace: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addToCartButton: {
    flex: 0.85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'blue',
    minWidth: 50,
    borderRadius: 20,
    marginBottom: '1.5%',
  },
  addToCartText: {
    justifyContent:'centre',
    alignItems: 'center',

    color: 'white',
    paddingBottom: 10,
    paddingLeft: '5%',
    fontSize: 18,
    minWidth: 200,
  },
  addToCartPrice: {
    color: 'white',
    justifyContent:'centre',
    alignItems: 'center',
    minWidth: 50,
    paddingBottom: '0.5%',
    marginRight: '5%',
    fontSize: 18,
  },
});

export default Gokul;
