import React from "react";
import { SafeAreaView, StyleSheet, Text, Image,View } from "react-native";
import image_dev from "./../../../../assets/image_dev.jpg"
function Info(props) {
  return (
    <SafeAreaView style={styles.aboutContainer}>
      <Text style={styles.mainHeader}> Aviv Turgeman</Text>
      <Text style={styles.paraStyle}>I'm Full Stack Developer</Text>
      <View>
        <Image style={styles.imgStyle} source={image_dev}></Image>
      </View>

      <View style={styles.aboutLayout}>
        <Text style={styles.aboutSubHeader}> About </Text>
      
        <Text style={[styles.paraStyle, styles.aboutPara]}>
          Have you forgot there are cameras down the road? Tired of getting fines? Join us today, 
          activate the application and get alerts of speed cameras!
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Info;
const styles = StyleSheet.create({
  aboutContainer: {
    display: "flex",
    alignItems: "center",
  },
  mainHeader: {
    fontSize: 18,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: 50,
    marginBottom: 10,
  },
  paraStyle: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 30,
    width: 390,
  },
  imgStyle: {
    width: 350,
    height: 150,
    borderRadius: 100,
  },
  aboutLayout: {
    backgroundColor: "#4c5dab",
    paddingHorizontal: 30,
    marginVertical: 30,
  },
  aboutSubHeader: {
    fontSize: 18,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "500",
    marginVertical: 15,
    alignSelf: "center",
  },
  aboutPara: {
    color: "#fff",
  },
});
