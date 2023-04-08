import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";

import { HomeHeader } from '../components/Headers';

const Stack = createStackNavigator();

export default function Router() {
  return <NavigationContainer>
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fbbf24',
          elevation: 5,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#101010'
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({ 
          headerTitle: (props) => <HomeHeader 
            navigation={navigation} 
            route={route}
          /> 
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>;
}
