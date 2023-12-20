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
import  { auth } from  '../../config/firebase';
import { getAuth,onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
const OwnerSignup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
     
    const auth= getAuth();

    const createAccount = async () => {
        try {
          if (password === confirmPassword) {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log(auth,email,password);
          } else {
            setError("Passwords don't match");
          }
        } catch(e) {
          setError("There was a problem creating your account");
          console.log(e)
        }
       
      }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: "Roboto-Bold",
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Create Account
                    </Text>

                    {error && <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>{error}</Text>}
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: "Roboto-Bold",
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
                        fontFamily: "Roboto-Bold",
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
               

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: "Roboto-Bold",
                        marginVertical: 8
                    }}>Confirm Password</Text>

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
                           value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder='Confirm  password'
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

                    <Text>I aggree to the terms and conditions</Text>
                </View>

                <Button
                
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={createAccount} disabled={!email || !password || !confirmPassword} 
                />

            
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Driver Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontFamily: "Roboto-Bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OwnerSignup