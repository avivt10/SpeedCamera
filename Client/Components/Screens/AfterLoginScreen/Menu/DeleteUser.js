import { useState } from "react";
import { View,SafeAreaView,Text,StyleSheet,TextInput,TouchableOpacity } from "react-native";
import {useNavigation} from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

function DeleteUser(props) {
  let [phone, setPhone] = useState();
  let [password, setPassword] = useState();
  const navigation = useNavigation();

  const removeToken = async () => {
    await AsyncStorage.removeItem("token");
  };


  let SendDataToServer = async () => {
    const token = await AsyncStorage.getItem("token");
    let config = {
      headers: { 
        Authorization: token
      },
       data : {
        Phone: phone,
        Password: password,
      }
    }
    
    try {
        const res = await axios.delete(`http://10.100.102.16:3000/auth/delete`,config)
        if(res.status == 200)
       {
        removeToken();
        if(res.data.message == "User deleted successfully")
        {
          alert("User deleted successfully")
          navigation.navigate('Home')
        }

       }
       
    } catch (error) {
      alert("Incorrect username/password! Try again");
    }

}
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Text  style={styles.header}> Delete User </Text>
    </View>
    <Text style={{ top: 53, right: 150, fontWeight: "bold" }}> Phone </Text>
    <Text style={{ top: 84, right: 150, fontWeight: "bold" }}> Password </Text>
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
        <Text style={styles.buttonText}>Delete</Text>
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


export default DeleteUser;
