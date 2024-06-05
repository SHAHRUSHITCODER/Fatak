import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AmulTaaza = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isProductInfoVisible, setIsProductInfoVisible] = useState(false);
  const flatListRef = useRef(null);
  const [quantity, setQuantity] = useState(0);
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection('AmulTaaza')
          .doc('myMNW2ozfPobu70R3KA5')
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
        'AmulTaaza-removebg-preview (1).png',
        'AmulTaazaBack1.png',
        'AmulTaazaEnergy.png',
        'AmulTaazaInstructions.png',
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
      <View style={styles.InfoContainer}>
        <TouchableOpacity style={styles.prodinfo} onPress={toggleProductInfo}>
          <Text style={styles.ProductInfoText}>Product Information</Text>
          <Text style={styles.DropdownIcon}>▼</Text>
        </TouchableOpacity>
        {isProductInfoVisible && (
          <View style={styles.productDetails}>
            <Text style={styles.ProductText}>{data.Info}</Text>
            <Text style={styles.ProductText}><Text style={{fontWeight:'700'}}>Shelf Life :</Text> {data.ShelfLife}</Text>
            <Text style={styles.ProductText}><Text style={{fontWeight:'700'}}>Product Application :</Text> {data.ProductApplication}</Text>

          </View>
        )}
        <View style={styles.Highlight}>
          <Text style={{color:'black',fontWeight:'700',fontSize:17,margin:4}}>Highlights</Text>
          <Text>Toned Milk</Text>
        </View>
        <View style={styles.horizontalLine} />

       <View style={styles.MainQuantityHeader}>
         <View style={styles.QuantityHeaderContainer}>
           <Text style={styles.QuantityHeader}>Amul Tazza X 500mL</Text>  
           
         </View>
      <View style={styles.QuantityConatiner}>  
      <View style={styles.priceContainer}>
      <Text style={styles.discountedPrice}>₹{data.DiscountPrice}</Text>
       <Text style={styles.originalPrice}>₹{data.OriginalPrice}</Text>

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
    </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  Imagecontainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'lightgrey', // Added border color
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  InfoContainer: {
    flex: 0.51,
    backgroundColor:'white',
    
  },
  prodinfo: {
    marginTop:10,
    marginHorizontal:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ProductInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  Highlight:{
      margin:10,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#eaebea',
      borderRadius:20,
      width: Dimensions.get('window').width*0.25,
      height: Dimensions.get('window').height * 0.10,
  },
  MainQuantityHeader:
  {
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
  priceContainer: {
    flexDirection: 'row',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'grey',
    marginRight: 5,
    marginTop:2.5,
    fontSize: 15,
  },
  discountedPrice: {
    color: 'black',
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
  quantityText:
  {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
  controlButton: {
    borderWidth: 1,
    backgroundColor:'blue',
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
    backgroundColor:'white',
    letterSpacing:2,

  },
  ProductText:{
    fontSize:15,
    letterSpacing:1.15,
    margin:5,
    color:'#8c8c8c',

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
});

export default AmulTaaza;
