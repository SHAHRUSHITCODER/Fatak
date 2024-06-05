import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import UserPage from './Screens/UserPage';
import AmulTaaza from './Screens/AmulTaaza';

// Define Stack Navigator
const Stack = createStackNavigator();

// Main App Component
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
          <Stack.Screen name="Login" component={Home} options={{
            headerShown: false, // Hide the header for this screen
          }} />         
          <Stack.Screen name="SignUp" component={Signup} options={{
            headerShown: false, // Hide the header for this screen
          }} />
           <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,}}/>
            <Stack.Screen name="UserPage" component={UserPage} options={{
            headerShown: false,}}/>
            <Stack.Screen name="AmulTaaza" component={AmulTaaza} options={{
            headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
