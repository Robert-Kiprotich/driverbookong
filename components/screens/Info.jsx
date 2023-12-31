

import { StyleSheet, Text, View, Image, FlatList,Share, TouchableOpacity, Linking,Modal,Animated} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeartIcon from "react-native-vector-icons/Fontisto";
import StarIcon from "react-native-vector-icons/Entypo";
import ContactIcon from "react-native-vector-icons/FontAwesome";
import LocationIcon from "react-native-vector-icons/SimpleLineIcons";
import RatingCard from "./RatingCard";
import { CustomerRating } from '../apis/DATA';
import call from 'react-native-phone-call'
import { useState } from 'react';


const Info = ({ route, navigation }) => {
  //const [showModal, setShowModal] = React.useState(visible);
  
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  
  
  const driver = route.params.driver;

    function placeCall() {
        const args = {
            number:driver.phoneNum,
            prompt: true,
            skipCanOpen: true
          }
          
          call(args).catch(console.error)
    }

    function sendMsgOnWhatsapp() {
        Linking.openURL(`https://api.whatsapp.com/send?text=Hi ${driver.name},&phone=+91${driver.phoneNum}`)
    }

    function share() {
         Share.share({
            message:`name: ${driver.name}; Mob. number: ${driver.phoneNum}; `,
          });
    }

  return (
    <View style={styles.container}>
 <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require('../../assets/x.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/success.png')}
            style={{height: 150, width: 150, marginVertical: 10}}
          />
        </View>

        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
          Driver Request Sucessfull 
          You will recieve a call from the driver
        </Text>
      </ModalPoup>






      <ModalPoup visible={visible1}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible1(false)}>
              <Image
                source={require('../../assets/x.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>

        </View>
<View style={{alignItems: 'center'}}>
<Image source={driver.img} style={styles.proImg} />
<Text style={styles.name}>{driver.name}</Text>
<Text style={styles.driverId}>ID - {driver.driverId}</Text>

        </View>
        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
        Select Accept to confirm driver
        </Text>
        <TouchableOpacity
      onPress={() => setVisible(true)}
        style={styles.BTN}
      >
        <Text style={styles.btnText}>
            Confirm Driver
        </Text>
      </TouchableOpacity>
      </ModalPoup>

     

      <View style={styles.row}>
        <Icon
          name="arrow-back-ios"
          size={24}
          color="#5D5FEF"
          onPress={() => navigation.goBack()}
        />
        <HeartIcon name="heart-alt" size={24} color="#5D5FEF" />
      </View>
      <View style={styles.profile}>
        <View style={styles.profileHeading}>
          <Image source={driver.img} style={styles.proImg} />
          <Text style={styles.name}>{driver.name}</Text>
          <Text style={styles.driverId}>ID - {driver.driverId}</Text>
        </View>
        <View style={styles.profileData}>
          <View style={styles.leftView}>
            <Text style={styles.exp}>Exp {driver.exp} years</Text>
            <Text style={styles.rating}>
              {" "}
              {driver.rating} <StarIcon size={16} color="#F2C94C" name="star" />
            </Text>
          </View>
          <View style={styles.rightView}>
            <Text style={styles.distance}>
              <LocationIcon name="location-pin" size={14} color="#7D7FF2" />{" "}
              {driver.distance} Km
            </Text>
            <Text style={styles.charge}>₹ {driver.charge}/Hr</Text>
          </View>
        </View>
        <Text style={styles.desc}>{driver.desc}</Text>
        <View style={styles.contact}>
          <TouchableOpacity 
          onPress={placeCall}
          style={styles.circle}
          >
            <ContactIcon name="phone" color="#5D5FEF" size={24} />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={sendMsgOnWhatsapp}
          style={styles.circle}
          >
            <ContactIcon name="whatsapp" color="#5D5FEF" size={24} />
          </TouchableOpacity>
          <TouchableOpacity 

          style={styles.circle}
          >
            <LocationIcon name="location-pin" size={24} color="#5D5FEF" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={share}
          style={styles.circle}
          >
            <ContactIcon name="share-square-o" color="#5D5FEF" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ratingView}>
        <Text style={styles.HEADER}>Reviews</Text>
            <FlatList
              data={CustomerRating}
              renderItem={RatingCard }
              keyExtractor={(item)=>item.id}
              horizontal={true}
            />
      </View>
      <TouchableOpacity
       onPress={() => setVisible1(true)}
        style={styles.BTN}
      >
        <Text style={styles.btnText}>
            Hire Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};




export default Info;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 5,
    textAlign: "center",
  },
  proImg: {
    height: 140,
    aspectRatio: 1,
    borderRadius: 140,
    borderColor: "#5D5FEF",
    borderWidth: 3,
    resizeMode: "contain",
  },
  name: {
    fontSize: 20,
    lineHeight: 30,
    marginTop: 5,
    textAlign: "center",
  },
  driverId: {
    fontSize: 16,
    lineHeight: 24,
    color: "#808080",
    textAlign: "center",
  },
  profileData: {
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 3,
  },
  leftView: {
    alignItems: "flex-start",
  },
  rightView: {
    alignItems: "flex-end",
  },
  exp: {
    fontSize: 17,
    lineHeight: 20,
    color: "#808080",
  },
  rating: {
    fontSize: 18,
    lineHeight: 19,
    color: "#FFCE31",
    textAlign: "center",
  },
  distance: {
    fontSize: 17,
    lineHeight: 21,
    color: "#808080",
    textAlign: "center",
    textAlignVertical: "center",
  },
  charge: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    textAlignVertical: "bottom",
    color: "#4BB543",
  },
  desc: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400",
    marginTop: 10,
    color: "#333333",
    marginBottom: 10,
  },
  contact: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 15,
  },
  circle:{
    height:50,
    width:50,
    borderRadius:50,
    padding:10,
    borderColor:'#ababab',
    borderWidth:1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#4E4D4D',
  },
  HEADER:{
    fontSize:17,
    lineHeight:26,
    fontWeight:'700',
    marginBottom:5
  },
  BTN:{
    width:'100%',
    height:50,
    backgroundColor:'#5D5FEF',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8,
    marginTop:8
  },
  btnText:{
    fontSize:16,
    fontWeight:'600',
    color:'#fff'
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
