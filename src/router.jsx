import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import {
  CreateEventHeader,
  EditInfoHeader,
  EventHeader,
  HomeHeader,
  InvitationsHeader,
  ProfileHeader,
  SearchHeader,
  TopsHeader
} from './components/shared/headers'

import AddGuestScreen from './screens/add-guest-screen'
import CreateEventScreen from './screens/create-event-screen'
import EditInfoScreen from './screens/edit-info-screen'
import EventGradeScreen from './screens/event-grade-screen'
import EventScreen from './screens/event-screen'
import GuestsScreen from './screens/guests-screen'
import HomeScreen from './screens/home-screen'
import InvitationsScreen from './screens/invitations-screen'
import LoginScreen from './screens/login-screen'
import MemoriesScreen from './screens/memories-screen'
import ProfileScreen from './screens/profile-screen'
import PurchasesAndExpensesScreen from './screens/purchases-and-expenses-screen'
import RegisterScreen from './screens/register-screen'
import SearchScreen from './screens/search-screen'
import ShareMemoryScreen from './screens/share-memory-screen'
import SplashScreen from './screens/splash-screen'
import TodoListScreen from './screens/todo-list-screen'
import TopEventsScreen from './screens/top-events-screen'

const Stack = createStackNavigator()

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={headerStyles}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

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
          name="Tops"
          component={TopEventsScreen}
          options={({ navigation, route }) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <TopsHeader />,
            headerLeft: () => null
          })}
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
