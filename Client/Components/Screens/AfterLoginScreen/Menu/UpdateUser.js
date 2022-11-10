import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

function UpdateUser(props) {
  let [phone, setPhone] = useState();
  let [password, setPassword] = useState();
  let [newPassword, setNewPassword] = useState();

  let SendDataToServer = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await axios.put(`http://10.100.102.16:3000/auth/update`,{
        Phone: phone,
        Password: password,
        NewPassword: newPassword,
      }, { headers:{
        Authorization: token
      }} )
      if(res.status == 200)
      {
         alert("Password changed successfully")
      }
    } catch (error) {  
        alert("Incorrect/short password or Incorrect phone number!try again ")

    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}> Update Password </Text>
      </View>
      <Text style={{ top: 70, right: 150, fontWeight: "bold" }}> Phone </Text>
      <Text style={{ top: 101, right: 150, fontWeight: "bold" }}>
        {" "}
        Old Password{" "}
      </Text>
      <Text style={{ top: 129, right: 150, fontWeight: "bold", right: 155 }}>
        {" "}
        New Password{" "}
      </Text>
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
          placeholder="Enter Your Old Password"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
        />

        <TextInput
          onChangeText={setNewPassword}
          placeholder="Enter Your New Password"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={newPassword}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={SendDataToServer}>
          <Text style={styles.buttonText}>Updating</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    color: "black",
    fontSize: 40,
    fontWeight:"bold",
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

export default UpdateUser;
