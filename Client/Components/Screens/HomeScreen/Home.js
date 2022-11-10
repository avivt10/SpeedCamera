import React from "react";
import {
  SafeAreaView,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native"; 
import { useNavigation } from '@react-navigation/native';

function Home(props) {
  const image = require("../../../assets/icon_camera.png");
  const navigation = useNavigation();
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <View style={styles.img}>

        </View>
        <ImageBackground
          source={image}
          style={{
            height: 250,
            right: 87,
            top: -200,
            width: 300,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.text_header}> Speed cameras </Text>
          </View>
          <View style={styles.ButtonContainer}>
              <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.button}
              >
          <Text style={styles.buttonText}>  Login </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={[styles.button,styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}> Register </Text>
          </TouchableOpacity>


          </View>

         </ImageBackground>
      </SafeAreaView>
    );
  };
export default Home;

const styles = StyleSheet.create({
  buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,

  },
  button:{
    backgroundColor:'#0782F9',
    width:'155%',
    padding:25,
    borderRadius:200,
    alignItems:'center',
    top:300,

  },
  buttonOutline:{
    backgroundColor:'white',
    marginTop:5,
    borderColor:'#0782F9',
    borderWidth:2,
  },
  buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
  },
  buttonOutlineText:{
    color:'#0782F9',
    fontWeight:'700',
    fontSize:16,
  },
  header:{
    top:250,
    right:-100,   
    marginTop:40,

  },
  text_header:{
    fontSize:35,
    fontWeight:'800',
  }

})
