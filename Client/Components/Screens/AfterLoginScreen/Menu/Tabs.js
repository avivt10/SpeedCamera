import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity,View,Image,Text,Animated,ActivityIndicator} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Tabs = (currentTab, setCurrentTab, title, image) => {
    const [show, setShow] = useState(false);
    const navigation = useNavigation();

    return (
      <Animated.View>
      <TouchableOpacity
        onPress={() => {
          if (title == "LogOut") {
            alert("Disconnecting...")
            return setTimeout(
              async () => {
                await AsyncStorage.removeItem("token", () => navigation.navigate("Home"));

              },
              4000,
            );
          }
          if (title == "Info") {
            navigation.navigate("Info");
          }
          else {
            setCurrentTab(title)
          }
  
          if (title == "Update User") {
             navigation.navigate("UpdateUser");
          } else {
            setCurrentTab(title)
          }
  
  
          if (title == "Delete User") {
            return navigation.navigate("DeleteUser");
          } else {
            setCurrentTab(title);
          }
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
            backgroundColor: currentTab == title ? 'white' : 'transparent', paddingLeft: 13,
            paddingRight: 35,
            borderRadius: 18, 
            marginTop: 15,
          }}
        >
          <Image
            source={image}
            style={{
              width: 25,
              height: 25,
              tintColor: currentTab == title ? "#5359D1" : "white"
            }}
          ></Image>
  
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              paddingLeft: 15,
              color: currentTab == title ? "#5359D1" : "white",
            }}
          >
            {title}
          </Text>
        </View>
        <ActivityIndicator size="large" animating={show} /> 
      </TouchableOpacity>
      </Animated.View>
    );
  };

  export default Tabs;