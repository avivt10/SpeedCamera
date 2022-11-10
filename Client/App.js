import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Navigation from "./Components/Navigation/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
function App(props) {
  const [defaultScreen, setDefaultScreen] = useState();
  useEffect(() => {
    setTimeout(() => {
      const checkTokenExist = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          try {
            await axios.post(
              "http://10.100.102.16:3000/auth/verifyToken",
              undefined,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            setDefaultScreen("AfterLogin");
          } catch (err) {
            setDefaultScreen("Home");
            console.log("ffff");
          }
        } else {
          setDefaultScreen("Home");
        }
      };
      checkTokenExist();
    }, 3000);
  }, []);

  if (!defaultScreen) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading....</Text>
        
        <ActivityIndicator style={styles.loader} />

      </View>
    );
  }

  return <Navigation defaultScreen={defaultScreen} />;
}

export default App;

const styles = StyleSheet.create({
  loader: {
    right: -50,
    top: -20,
  },
});
