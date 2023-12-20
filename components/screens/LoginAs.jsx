import { FlatList, StyleSheet,TextInput, Image,Pressable, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../constants/Button';

import { drivers } from '../apis/DATA';
import DriverContainer from './Container';
import { useState } from 'react';
import {getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import  { auth } from  '../../config/firebase';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginAs = ({navigation}) => {
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
    <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
            <Text style={{
                fontSize: 22,
               // fontFamily: "Roboto-Bold",
                marginVertical: 12,
                color: COLORS.black
            }}>
                Hi Welcome Back ! 👋
            </Text>

            <Text style={{
                fontSize: 16,
                color: COLORS.black
            }}>Login As</Text>
        </View>

      
        <View style={{ marginVertical: 22 }}>
        <Button

            title="Driver"
            filled
            style={{
                marginTop: 18,
                marginBottom: 4,
            }}
            onPress={() => navigation.navigate("Driver Profile")}
          
        />
    </View>
    <View style={{ marginVertical: 22 }}>
        <Button

            title="Car Owner"
            filled
            style={{
                marginTop: 18,
                marginBottom: 4,
            }}
            onPress={() => navigation.navigate("Hire Driver")}
            
        />
    </View>
    </View>
</SafeAreaView>
)
}

export default LoginAs

const styles=StyleSheet.create({})