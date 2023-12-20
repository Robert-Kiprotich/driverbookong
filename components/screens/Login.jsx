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



// const Login = ({navigation}) => {
//     const [isPasswordShown, setIsPasswordShown] = useState(false);
//     const [isChecked, setIsChecked] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const auth= getAuth();
//     const loginUser = async () => {
//         try {
//           await signInWithEmailAndPassword(auth, email, password);
//         } catch(error) {
//           if (
//             error.code === "auth/invalid-email" ||
//             error.code === "auth/wrong-password"
           
//           ) {
//             setError("Your email or password was incorrect");
//           } else if (error.code === "auth/email-already-in-use") {
//             setError("An account with this email already exists");
//           } else {
//             setError("There was a problem with your request");
//             console.log(error.code);
//           }
//         }
//       }

const Login = ({navigation}) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const auth= getAuth();

    const loginUser = async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          // Set a timer to automatically logout the user after 3 minutes
          const timer = setTimeout(() => {
            signOut(auth);
            navigation.navigate('Login');
          }, 18000); // 3 minutes in milliseconds
        } catch(error) {
          if (
            error.code === "auth/invalid-email" ||
            error.code === "auth/wrong-password"
           
          ) {
            setError("Your email or password was incorrect");
          } else
 
if (error.code === "auth/email-already-in-use") {
            setError("An account with this email already exists");
          } else {
            setError("There was a problem with your request");
            console.log(error.code);
          }
        }
      }
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
            }}>Hello again you have been missed!</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
            <Text style={{

                fontSize: 16,
                //fontFamily: "Roboto-Bold",
                marginVertical: 8
            }}>Email address</Text>

            <View style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22
            }}>
                <TextInput
                     value={email}
                     onChangeText={setEmail}
                    placeholder='Enter your email address'
                    placeholderTextColor={COLORS.black}
                    keyboardType='email-address'
                    style={{
                        width: "100%"
                    }}
                />
            </View>
        </View>

        <View style={{ marginBottom: 12 }}>
            <Text style={{
                fontSize: 16,
                //fontFamily: "Roboto-Bold",
                marginVertical: 8
            }}>Password</Text>

            <View style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22
            }}>
                <TextInput
                     value={password}
                     onChangeText={setPassword}
                    placeholder='Enter your password'
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={isPasswordShown}
                    style={{
                        width: "100%"
                    }}
                />

                <TouchableOpacity
                    onPress={() => setIsPasswordShown(!isPasswordShown)}
                    style={{
                        position: "absolute",
                        right: 12
                    }}
                >
                    {
                        isPasswordShown == true ? (
                            <Ionicons name="eye-off" size={24} color={COLORS.black} />
                        ) : (
                            <Ionicons name="eye" size={24} color={COLORS.black} />
                        )
                    }

                </TouchableOpacity>
            </View>
        </View>

        <View style={{
            flexDirection: 'row',
            marginVertical: 6
        }}>
            <Checkbox
                style={{ marginRight: 8 }}
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? COLORS.primary : undefined}
            />

            <Text>Remenber Me</Text>
        </View>

        <Button

            title="Login"
            filled
            style={{
                marginTop: 18,
                marginBottom: 4,
            }}
            onPress={loginUser} disabled={!email || !password}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View
                style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: COLORS.grey,
                    marginHorizontal: 10
                }}
            />
            <Text style={{ fontSize: 14 }}>Or Login with</Text>
            <View
                style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: COLORS.grey,
                    marginHorizontal: 10
                }}
            />
        </View>

        <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
        }}>
            <TouchableOpacity
                onPress={() => console.log("Pressed")}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 52,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    marginRight: 4,
                    borderRadius: 10
                }}
            >
                <Image

                    style={{
                        height: 36,
                        width: 36,
                        marginRight: 8
                    }}
                    resizeMode='contain'
                />

                <Text>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => console.log("Pressed")}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 52,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    marginRight: 4,
                    borderRadius: 10
                }}
            >
                <Image
                  
                    style={{
                        height: 36,
                        width: 36,
                        marginRight: 8
                    }}
                    resizeMode='contain'
                />

                <Text>Google</Text>
            </TouchableOpacity>
        </View>

        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22
        }}>
            <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
            <Pressable
                onPress={() => navigation.navigate("Driver Signup")}
            >
                <Text style={{
                    fontSize: 16,
                    color: COLORS.primary,
                    //fontFamily: "Roboto-Bold",
                    marginLeft: 6
                }}>Register</Text>
            </Pressable>
        </View>
    </View>
</SafeAreaView>
)
}

export default Login

const styles=StyleSheet.create({})