import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeHeader, ProfileHeader, SearchHeader } from '../components/Headers'
import ChatsScreen from '../screens/ChatsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import ChatScreen from '../screens/ChatScreen'
import CreateEventScreen from '../screens/CreateEventScreen'
import EventScreen from '../screens/EventScreen'
import GuestsScreen from '../screens/GuestsScreen'
import AddGuestScreen from '../screens/AddGuestScreen'
import TodoListScreen from '../screens/TodoListScreen'
import PurchasesAndExpensesScreen from '../screens/PurchasesAndExpensesScreen'
import MemoriesScreen from '../screens/MemoriesScreen'
import EventGradeScreen from '../screens/EventGradeScreen'
import EditInfoScreen from '../screens/EditInfoScreen'

const Stack = createStackNavigator()

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={headerStyles}>
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
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => (
              <HomeHeader navigation={navigation} route={route} />
            ),
            headerLeft: () => null
          })}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => (
              <SearchHeader navigation={navigation} route={route} />
            ),
            headerLeft: () => null,
            headerStyle: { ...headerStyles.headerStyle, height: 90 },
            headerTintColor: headerStyles.headerTintColor,
            headerTitleStyle: headerStyles.headerTitleStyle
          })}
        />

        <Stack.Screen
          name="Chats"
          component={ChatsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => (
              <ProfileHeader navigation={navigation} route={route} />
            ),
            headerLeft: () => null
          })}
        />

        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Guests"
          component={GuestsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddGuest"
          component={AddGuestScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TodoList"
          component={TodoListScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Purchases"
          component={PurchasesAndExpensesScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Memories"
          component={MemoriesScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EventGrade"
          component={EventGradeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EditInfo"
          component={EditInfoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const headerStyles = {
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
  }
}
