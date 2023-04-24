import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import {
  CreateEventHeader,
  EditInfoHeader,
  EventHeader,
  HomeHeader,
  InvitationsHeader,
  ProfileHeader,
  SearchHeader
} from '../components/Headers'

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
import ShareMemoryScreen from '../screens/ShareMemoryScreen'
import EventGradeScreen from '../screens/EventGradeScreen'
import EditInfoScreen from '../screens/EditInfoScreen'
import InvitationsScreen from '../screens/InvitationsScreen'

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
            headerTitle: (props) => <HomeHeader />,
            headerLeft: () => null
          })}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <SearchHeader />,
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
            headerTitle: (props) => <ProfileHeader />,
            headerLeft: () => null
          })}
        />

        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <CreateEventHeader />,
            headerLeft: () => null
          })}
        />

        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <EventHeader />,
            headerLeft: () => null,
            headerStyle: { ...headerStyles.headerStyle, height: 90 },
            headerTintColor: headerStyles.headerTintColor,
            headerTitleStyle: headerStyles.headerTitleStyle
          })}
        />

        <Stack.Screen
          name="Guests"
          component={GuestsScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <EventHeader />,
            headerLeft: () => null,
            headerStyle: { ...headerStyles.headerStyle, height: 90 },
            headerTintColor: headerStyles.headerTintColor,
            headerTitleStyle: headerStyles.headerTitleStyle
          })}
        />

        <Stack.Screen
          name="AddGuest"
          component={AddGuestScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <EventHeader />,
            headerLeft: () => null,
            headerStyle: { ...headerStyles.headerStyle, height: 90 },
            headerTintColor: headerStyles.headerTintColor,
            headerTitleStyle: headerStyles.headerTitleStyle
          })}
        />

        <Stack.Screen
          name="TodoList"
          component={TodoListScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <EventHeader />,
            headerLeft: () => null,
            headerStyle: { ...headerStyles.headerStyle, height: 90 },
            headerTintColor: headerStyles.headerTintColor,
            headerTitleStyle: headerStyles.headerTitleStyle
          })}
        />

        <Stack.Screen
          name="Purchases"
          component={PurchasesAndExpensesScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <EventHeader />,
            headerLeft: () => null,
            headerStyle: { ...headerStyles.headerStyle, height: 90 },
            headerTintColor: headerStyles.headerTintColor,
            headerTitleStyle: headerStyles.headerTitleStyle
          })}
        />

        <Stack.Screen
          name="Memories"
          component={MemoriesScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <EventHeader />,
            headerLeft: () => null,
            headerStyle: { ...headerStyles.headerStyle, height: 90 },
            headerTintColor: headerStyles.headerTintColor,
            headerTitleStyle: headerStyles.headerTitleStyle
          })}
        />

        <Stack.Screen
          name="ShareMemory"
          component={ShareMemoryScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <EventHeader />,
            headerLeft: () => null,
            headerStyle: { ...headerStyles.headerStyle, height: 90 },
            headerTintColor: headerStyles.headerTintColor,
            headerTitleStyle: headerStyles.headerTitleStyle
          })}
        />

        <Stack.Screen
          name="EventGrade"
          component={EventGradeScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <EventHeader />,
            headerLeft: () => null,
            headerStyle: { ...headerStyles.headerStyle, height: 90 },
            headerTintColor: headerStyles.headerTintColor,
            headerTitleStyle: headerStyles.headerTitleStyle
          })}
        />

        <Stack.Screen
          name="EditInfo"
          component={EditInfoScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <EditInfoHeader />,
            headerLeft: () => null
          })}
        />

        <Stack.Screen
          name="Invitations"
          component={InvitationsScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <InvitationsHeader />,
            headerLeft: () => null
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const headerStyles = {
  headerStyle: {
    backgroundColor: '#1f2937',
    elevation: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#f1f1f1'
  }
}
