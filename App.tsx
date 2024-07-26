import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import UserPage from './Screens/UserPage';
import AmulTaaza from './Screens/AmulTaaza';
import AmulGold from './Screens/AmulGold';
import AmulBuffalo from './Screens/AmulBuffalo';
import Gokul from './Screens/Gokul';
import CartPage from './Screens/CartPage';
import PayOption from './Screens/PayOption';
import SelectOption from './Screens/SelectOption';
import COD from './Screens/COD';
import UPIscreen from './Screens/UPIscreen';

// Define Stack Navigator
const Stack = createStackNavigator();

// Main App Component
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
          <Stack.Screen name="Login" component={Login} options={{
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
            <Stack.Screen name="AmulGold" component={AmulGold} options={{
            headerShown: false,}}/>
            <Stack.Screen name="AmulBuffalo" component={AmulBuffalo} options={{
            headerShown: false,}}/>
            <Stack.Screen name="Gokul" component={Gokul} options={{
            headerShown: false,}}/>
            <Stack.Screen name="CartPage" component={CartPage} options={{
            headerShown: false,}}/>
            <Stack.Screen name="PayOption" component={PayOption} options={{
            headerShown: false,}}/>
            <Stack.Screen name="SelectOption" component={SelectOption} options={{
            headerShown: false,}}/>
            <Stack.Screen name="COD" component={COD} options={{
            headerShown: false,}}/>
            <Stack.Screen name="UPIscreen" component={UPIscreen} options={{
            headerShown: false,}}/>
            
            
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
