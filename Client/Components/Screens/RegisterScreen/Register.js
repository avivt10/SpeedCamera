import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Register(props) {
  const navigation = useNavigation();
  let errors = [];
  let [show, setShow] = useState(false);
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");

  const setToken = async (token) => {
    await AsyncStorage.setItem("token", token);
  };

  const setName = async (name) => {
    try{
      await AsyncStorage.setItem("user_name", name);
    }
    catch(error)
    {
      console.log(error);
    }
  };
  let SendDataToServer = async () => {
    let data = {
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
      Password: password,
    };

  
    try {
      let res = await axios.post(
        "http://10.100.102.16:3000/auth/register",
        data
      );
      if (res) {
        setToken(res.data.token)
        setName(firstName)
        setTimeout(() => {
          navigation.navigate("AfterLogin");
        }, 5000),
          setShow(true);
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
  const validateFirstName = (text = "") => {
    for (let i = 0; i < text.length; i++) {
      if (
        (text[i] >= "a" && text[i] <= "z") ||
        (text[i] >= "A" && text[i] <= "Z")
      ) {
        if (text.length >= 2 && text.length <= 10) {
          continue;
        } else {
          errors.push("first name is not valid!");
          break;
        }
      } else {
        errors.push("first name is not valid!");
        break;
      }
    }

    if (text.length == 0) {
      errors.push("first name is not valid!");
    }
  };

  const validLastName = (text) => {
    for (let i = 0; i < text.length; i++) {
      if (
        (text[i] >= "a" && text[i] <= "z") ||
        (text[i] >= "A" && text[i] <= "Z")
      ) {
        if (text.length >= 2 && text.length <= 10) {
          continue;
        } else {
          errors.push("last name is not valid!");
          break;
        }
      } else {
        errors.push("last name is not valid!");
        break;
      }
    }

    if (text.length == 0) {
      errors.push("last name is not valid!");
    }
  };

  const validPassword = (text) => {
    if (text.length < 4 || text.length > 20) {
      errors.push("Password should be between 4 and 20 characters!");
    }
  };

  let count_error = 0;
  const ValidatePhone = (text) => {
    if (
      text.length < 10 ||
      text.length > 10 ||
      text[0] != 0 ||
      text[1] != 5 ||
      (text[2] < 0 && text[2] > 9)
    ) {
      count_error++;
    }
    for (let i = 0; i < text.length; i++) {
      if (
        (text[i] >= "a" && text[i] <= "z") ||
        (text[i] >= "A" && text[i] <= "Z")
      ) {
        count_error++;
        break;
      }
    }
    if (count_error > 0) errors.push("phone number is not valid!");

    return true;
  };

  const handleRegistration = async () => {
    try {
      await validateFirstName(firstName);
      await validLastName(lastName);
      let isValid = await ValidatePhone(phone);
      if (!isValid) {
        errors.push("phone is not valid!");
      }
      await validPassword(password);
      if (errors.length == 0) {
        SendDataToServer();
      } else {
        let errMessage = "";
        for (let index = 0; index < errors.length; index++) {
          const element = errors[index];
          errMessage += element + "\n";
        }
        alert(errMessage);
        errors = [];
      }
    } catch (error) {
      alert("server error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ top: 90, right: 150, fontWeight: "bold" }}>
        {" "}
        First Name{" "}
      </Text>
      <Text style={{ top: 130, right: 150, fontWeight: "bold" }}>
        {" "}
        Last Name{" "}
      </Text>
      <Text style={{ top: 178, right: 150, fontWeight: "bold" }}> Phone </Text>
      <Text style={{ top: 220, right: 150, fontWeight: "bold" }}>
        {" "}
        Password{" "}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        type="text"
        placeholder="Enter Your First Name"
      ></TextInput>

      <Text></Text>
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        type="text"
        placeholder="Enter Your Last Name"
      />
      <Text></Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        type="text"
        name="phone"
        placeholder="Enter Your Phone"
      />

      <Text></Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        type="password"
        secureTextEntry={"true"}
        placeholder="Enter Your Password"
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleRegistration}
      >
        <Text style={styles.buttonText}> Submit </Text>
      </TouchableOpacity>
      <ActivityIndicator size="large" animating={show} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -200,
    flex: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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

export default Register;
