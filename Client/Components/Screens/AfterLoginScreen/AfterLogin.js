import React, { useRef, useEffect, useMemo } from "react";
import { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Animated,
} from "react-native";
import password_change from "./../../../assets/password_change.png";
import delete_user from "./../../../assets/delete_user.png";
import logout from "./../../../assets/logout.png";
import menu from "./../../../assets/menu.png";
import info from "./../../../assets/info.png";
import img111 from "./../../../assets/img111.jpeg"
import { coordinates } from "../../../constants/coordinates";
import calculateDirection from "../../../utils/calculateDirection";
import cameraData from "../../../assets/cameraData";
import calculateDistanceBetweenTwoLocations from "./../../../utils/calculateDistanceBetweenTwoLocations";
import getDirectionName from "./../../../utils/getDirectionName";
import Tabs from "./Menu/Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CameraRadar from "../../CameraRadar";
import { Audio } from "expo-av";
import isBetween from "../../../utils/isBetween";
import axios from "axios";


function AfterLogin(props) {
  const [currentTab, setCurrentTab] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [currentLocation, setCurrentLocation] = useState(coordinates[0]);
  const [prevLocation, setPrevLocation] = useState(null);
  const [currentName, setCurrentName] = useState("");
  const [sound, setSound] = React.useState();
  const cameras = {}; 
  let indexOfCoor = 1;
  const time = new Date()
  let currentTime = time.getHours() + ":" + time.getMinutes();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/Iphone.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const checkNameExist = async () => {
    const name = await AsyncStorage.getItem("user_name");
    if (name) {
      setCurrentName(name);
    }
  };
  checkNameExist();

  useEffect(() => {
    setInterval(() => {
      if (currentLocation && currentLocation.lon && currentLocation.lat) {
        setPrevLocation(currentLocation);
        setCurrentLocation(coordinates[indexOfCoor]);
        if (indexOfCoor === coordinates.length - 1) {
          indexOfCoor = 0;
        } else {
          indexOfCoor++;
        }
      }
    }, 5000);
  }, []);

  let SendDataToServer = async () => {
    try{
      const {data} = await axios.post(
        "http://10.100.102.16:3000/other/writeToFile",{
          cameras,
        });
    }
    catch(err){
      console.log(err);
    }
  }

  
  const alertedCameras = useMemo(() => {
    if (prevLocation && currentLocation) {
      const ourBearing = calculateDirection(prevLocation, currentLocation);
      const directions = getDirectionName(ourBearing);
      const updatedAlertedCameras = {};
      directions.forEach((direction) => {
        cameraData.direction[direction].forEach(
          ({ Latitude, Longitude, ID,CameraLocation }) => {
            const distance = calculateDistanceBetweenTwoLocations(
              Latitude,
              Longitude,
              currentLocation.lat,
              currentLocation.lon
            );
            const bearingOfCamera = calculateDirection(currentLocation, {
              lon: Longitude,
              lat: Latitude,
            });
            const isOnOurDirection = isBetween(
              bearingOfCamera,
              ourBearing - 90,
              ourBearing + 90
            );
              if (distance < 3) {
                if (isOnOurDirection) {
                  updatedAlertedCameras[ID] = distance;
                  cameras["info"] = {NameCamera:CameraLocation,LatitudeCamera:Latitude, LongitudeCamera:Longitude,UserLatitude:currentLocation.lat,UserLongitude:currentLocation.lon,ID:ID,CurrentTime:currentTime};
                  SendDataToServer();
                  }
                }
            }
        );
      });
      return updatedAlertedCameras;
    }
  }, [currentLocation]);

 
  const isSafe = useMemo(() => {
    if (alertedCameras && Object.keys(alertedCameras).length) {   
      playSound();
      return false
    } else {
      return true
    }
  }, [alertedCameras]);

  return (
    <SafeAreaView style={styles().container}>
      <View style={{ justifyContent: "flex-start", padding: 15 }}>
        <Image
          source={img111}
          style={{
            width: 150,
            height: 70,
            borderRadius: 10,
            marginTop: 8,
          }}
        ></Image>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            marginTop: 20,
          }}
        >
          {" "}
          Welcome {currentName}!
        </Text>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {Tabs(currentTab, setCurrentTab, "Info", info)}
          {Tabs(currentTab, setCurrentTab, "Update User", password_change)}
          {Tabs(currentTab, setCurrentTab, "Delete User", delete_user)}
          {Tabs(currentTab, setCurrentTab, "LogOut", logout)}
        </View>

        <View></View>
      </View>

      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(offsetValue, {
              toValue: showMenu ? 0 : 220,
              duration: 300,
              useNativeDriver: true,
            }).start();

            setShowMenu(!showMenu);
          }}
        >
          <Image
            source={menu}
            style={{
              width: 20,
              height: 20,
              marginTop: 40,
            }}
          ></Image>
        </TouchableOpacity>

        <View style={styles.text}>
          <Text
            style={{
              fontWeight: "bold",
              color: "red",
              fontSize: 18,
              textAlign: "center",
              top: 20,
            }}
          >
        האפליקציה עובדת ברקע - נא לא לסגור אותה
          </Text>
          <Text style={{ textAlign: "center", top: 80 }}>
            Current Location:
          </Text>
          <Text style={{ textAlign: "center", top: 100, fontSize: 19 }}>
            {currentLocation.lon} , {currentLocation.lat}
          </Text>
        </View>

        <View style={styles({ isSafe }).scanner}>
          <CameraRadar isSafe={isSafe} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

export default AfterLogin;

const styles = (props = {}) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#5359D1",
      flex: 1,
    },
    text: {
      justifyContent: "center",
      alignItems: "center",
      fontSize: 30,
      fontWeight: "bold",
      top: 100,
      color: "red",
    },
    scanner: {
      flex: 1,
      fontWeight: "bold",
      top: 350,
      borderColor: props.isSafe ? "green" : "red",
    },
    dis:{
      color:"red",
    }
  });
