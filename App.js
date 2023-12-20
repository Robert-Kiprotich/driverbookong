import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import NearbyDrivers from './components/screens/NearbyDrivers'
import Driver from './components/screens/Driver'
import Info from './components/screens/Info'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup';
import LoginAs from './components/screens/LoginAs';
import DriverProfile from './components/screens/DriverProfile';
import OwnerLogin from './components/screens/OwnerLogin';
import OwnerSignup from './components/screens/OwnerSignup';
import Location from './components/screens/Confirm';
import  { auth } from  './config/firebase';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';
//import DriverConfirm from './components/screens/DriverInfo';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const Stack = createNativeStackNavigator();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        const userRole = getUserRoleFromFirebase(user); // Function to retrieve user role from Firebase
        setUserRole(userRole);
      } else {
        setLoggedIn(false);
        setUserRole(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleDriverLogin = () => {
    setScreen('Driver Login');
  };

  const handleDriverSignup = () => {
    setScreen('Driver Signup');
  };

  const handleRiderLogin = () => {
    setScreen('LoginAs');
  };

  return (
    <NavigationContainer>
    {loggedIn && userRole === 'driver' && (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Nearby Drivers" component={NearbyDrivers} />
        <Stack.Screen name="Driver" component={Info} />
        <Stack.Screen name="Hire Driver" component={Driver} />
        <Stack.Screen name="Driver Profile" component={DriverProfile} />
      </Stack.Navigator>
    )}
    {loggedIn && userRole === 'rider' && (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Driver Home" component={RiderHome} />
        <Stack.Screen name="Driver Profile" component={RiderProfile} />
        <Stack.Screen name="Driver Ride" component={BookRide} />
        <Stack.Screen name="Ride History" component={RideHistory} />
      </Stack.Navigator>
    )}
    {!loggedIn && (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginAs" component={LoginAs} />
        <Stack.Screen name="Owner Login" component={OwnerLogin} />
        <Stack.Screen name="Owner Signup" component={OwnerSignup} />
      </Stack.Navigator>
    )}
  </NavigationContainer>  
);
};
  

export default App;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
