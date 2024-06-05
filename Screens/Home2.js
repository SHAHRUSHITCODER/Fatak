// import React from "react";
// import { StyleSheet, View, Text } from "react-native";
// import MapboxGL from "@react-native-mapbox-gl/maps";

// // Initialize the map with your access token
// MapboxGL.setAccessToken(
//   "pk.eyJ1IjoicGVlcGVlbWFuIiwiYSI6ImNsaG4ydHFtdjFpNXQzcW51OWNlamY3OGcifQ.Hol5IBavRbkJxjYhfCIg-Q"
// );

// function App() {
//   return (
//     <View style={styles.app}>
//       <Text>React Native Template</Text>
//     </View>
//   );
// }

// const MapScreen = () => {
//   const [longitude, setLongitude] = useState(null);
//   const [latitude, setLatitude] = useState(null);

//   useEffect(() => {
//     // Set up a geolocation watch to track the user's location
//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         setLongitude(position.coords.longitude);
//         setLatitude(position.coords.latitude);
//       },
//       (error) => console.log(error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );

//     return () => {
//       navigator.geolocation.clearWatch(watchId);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapboxGL.MapView style={styles.map}>
//         <MapboxGL.UserLocation
//           visible={true}
//           animated={true}
//           onUpdate={(location) => {
//             setLongitude(location.coords.longitude);
//             setLatitude(location.coords.latitude);
//           }}
//         />
//         {longitude && latitude && (
//           <MapboxGL.PointAnnotation
//             id="marker"
//             coordinate={[longitude, latitude]}
//           />
//         )}
//       </MapboxGL.MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   app: {
//     flex: 1
//   }
// });

// export default App;



// //////////////////////////////////////




// import React from "react";
// import { StyleSheet, View, Text } from "react-native";
// import Mapbox from "@react-native-mapbox-gl/maps";

// // Initialize the map with your access token
// Mapbox.setAccessToken(
//   "pk.eyJ1IjoicGVlcGVlbWFuIiwiYSI6ImNsaG4ydHFtdjFpNXQzcW51OWNlamY3OGcifQ.Hol5IBavRbkJxjYhfCIg-Q"
// );

// function App() {
//   return (
//     <View style={styles.app}>
//       <Text>React Native Template</Text>
//     </View>
//   );
// }

// const MapScreen = () => {
//   const [longitude, setLongitude] = useState(null);
//   const [latitude, setLatitude] = useState(null);

//   useEffect(() => {
//     // Set up a geolocation watch to track the user's location
//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         setLongitude(position.coords.longitude);
//         setLatitude(position.coords.latitude);
//       },
//       (error) => console.log(error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );

//     return () => {
//       navigator.geolocation.clearWatch(watchId);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Mapbox.MapView style={styles.map}>
//         <Mapbox.UserLocation
//           visible={true}
//           animated={true}
//           onUpdate={(location) => {
//             setLongitude(location.coords.longitude);
//             setLatitude(location.coords.latitude);
//           }}
//         />
//         {longitude && latitude && (
//           <Mapbox.PointAnnotation
//             id="marker"
//             coordinate={[longitude, latitude]}
//           />
//         )}
//       </Mapbox.MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   app: {
//     flex: 1,
//   },
// });

// export default App;
 ////////

//  import React, { useState, useEffect } from 'react';
//  import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
//  import { firebase } from '@react-native-firebase/auth';
//  import firestore from '@react-native-firebase/firestore';
//  import Icons from 'react-native-vector-icons/FontAwesome';
//  import Icons2 from 'react-native-vector-icons/FontAwesome5';
 
//  const Home = () => {
//    const [userName, setUserName] = useState('');
//    const [searchQuery, setSearchQuery] = useState('');
//    const [filteredData, setFilteredData] = useState([]);
 
//    useEffect(() => {
//      // Get the currently logged-in user
//      const currentUser = firebase.auth().currentUser;
//      if (currentUser) {
//        // Get the user document from Firestore
//        const userRef = firestore().collection('users').doc(currentUser.uid);
//        userRef.get()
//          .then((doc) => {
//            if (doc.exists) {
//              // If the document exists, set the userName state to the user's name
//              const userData = doc.data();
//              setUserName(userData.name);
//            } else {
//              console.log('No such document!');
//            }
//          })
//          .catch((error) => {
//            console.log('Error getting document:', error);
//          });
//      }
//    }, []);
 
//    useEffect(() => {
//      // Filter data based on search query
//      const filtered = yourDataArray.filter(item =>
//        item.someProperty.toLowerCase().includes(searchQuery.toLowerCase())
//      );
//      setFilteredData(filtered);
//    }, [searchQuery]);
 
//    const handleImagePress = () => {
//      // Function to handle onPress event of the TouchableOpacity wrapping the Image
//      // Add your logic here
//    };
 
//    return (
//      <View style={styles.container}>
//        <View style={styles.textContainer}>
//          <TouchableOpacity onPress={handleImagePress}>
//            <Image
//              source={require('../assets/Users2.png')} // Replace 'Users2.png' with your image file name
//              style={{ width: 40, height: 40 }}   // Adjust width and height as needed
//            />
//          </TouchableOpacity>
//          <Text style={styles.text}>Hello, {userName}</Text>
//          <TextInput
//            style={styles.input}
//            placeholder="Search..."
//            onChangeText={setSearchQuery}
//            value={searchQuery}
//          />
//        </View>
//        <FlatList
//          data={filteredData}
//          renderItem={({ item }) => (
//            <View>
//              {/* Render your list items here */}
//            </View>
//          )}
//          keyExtractor={(item, index) => index.toString()}
//        />
//      </View>
//    );
//  };
 
//  const styles = StyleSheet.create({
//    container: {
//      padding: 24,
//      backgroundColor: '#e7f5fb',
//      flex: 1,
//    },
//    textContainer: {
//      flexDirection: 'row', // Align items in a row
//      alignItems: 'center', // Vertically center items
//    },
//    text: {
//      flex: 1, // Allow the text to take up the remaining space
//      paddingVertical: 8,
//      marginLeft: 10,
//      fontSize: 30,
//      fontWeight: 'bold',
//      color: 'black',
//    },
//    input: {
//      flex: 1,
//      height: 40,
//      borderColor: 'gray',
//      borderWidth: 1,
//      paddingHorizontal: 10,
//      marginLeft: 10,
//      borderRadius: 5,
//    },
//  });
 
//  export default Home;
 



