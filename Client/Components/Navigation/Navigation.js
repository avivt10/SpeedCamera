import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./../Screens/HomeScreen/Home";
import Login from "./../Screens/LoginScreen/Login";
import Register from "../Screens/RegisterScreen/Register";
import AfterLogin from "../Screens/AfterLoginScreen/AfterLogin";
import Info from "../Screens/AfterLoginScreen/Menu/Info";
import DeleteUser from "../Screens/AfterLoginScreen/Menu/DeleteUser";
import UpdateUser from "../Screens/AfterLoginScreen/Menu/UpdateUser";
import { ScreenStackHeaderLeftView } from "react-native-screens";

function Navigation({ defaultScreen }) {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={defaultScreen} >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false, 
            gestureEnabled:false,
          }}
        ></Stack.Screen>
        <Stack.Screen name="Login" component={Login} options={ScreenStackHeaderLeftView}></Stack.Screen>
        <Stack.Screen name="Register" component={Register}></Stack.Screen>
        <Stack.Screen
          name="AfterLogin"
          component={AfterLogin}
          options={{
            headerShown: false,
            gestureEnabled:false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Info"
          component={Info}
          options={{
            title:"",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{
            title:"",
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{
            title:"",
          }}
        ></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
