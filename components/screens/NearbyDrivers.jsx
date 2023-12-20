import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { drivers } from '../apis/DATA';
import DriverContainer from './Container';
import  { auth } from  '../../config/firebase';
import {getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const NearbyDrivers = ({navigation}) => {
       //const auth =getAuth();
       
  return (
    <View style={styles.container}>
      <FlatList
        data={drivers}
        keyExtractor={(item)=>item.driverId}
        renderItem={({item})=>{
            return <DriverContainer driver={item} navigation={navigation} />
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default NearbyDrivers

const styles = StyleSheet.create({
    container:{
        width:'100%',
        paddingVertical:6,
        paddingHorizontal:12,
        backgroundColor:'#d6d8db'
    },
})