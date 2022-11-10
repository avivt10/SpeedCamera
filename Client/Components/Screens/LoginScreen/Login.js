import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

function Login(props) {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  let [phone, setPhone] = useState();
  let [password, setPassword] = useState();

  let SignUp = () => {
    navigation.navigate("Register");
  };

  const setName = async (name) => {
    try {
      await AsyncStorage.setItem("user_name", name);
    } catch (error) {
    }
  };

  const setToken = async (token) => {
    await AsyncStorage.setItem("token", token);
  };

  let SendDataToServer = async () => {
    try {
      const { data } = await axios.post("http://10.100.102.16:3000/auth/login", {
        Phone: phone,
        Password: password,
      });

      if (data) {
        setName(data.FirstName);
        if (data.message === "Login successful") {
          setPhone("");
          setPassword("");
          setToken(data.token);
          return setTimeout(
            () => {
              navigation.navigate("AfterLogin");
            },
            5000,
            setShow(true)
          );
        }
      }
    } catch (error) {
+      alert(error.response.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ top: 50, right: 150, fontWeight: "bold" }}> Phone </Text>
      <Text style={{ top: 84, right: 150, fontWeight: "bold" }}>password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setPhone}
          placeholder="Enter Your Phone"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={phone}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Enter Your Password"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={SendDataToServer}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={SignUp}>
          <Text style={styles.button}>Don't have an account? Sign up</Text>
          <View></View>
        </TouchableOpacity>
      </View>
      <ActivityIndicator size="large" animating={show} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "60%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 10,
    width: 250,
    right: -30,
  },
  buttonContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor:"#ADD8E6",
    borderRadius:18,
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 18,
    borderColor:"#ADD8E6",
    borderWidth:12,
    color:"white",
  },
});

export default Login;
