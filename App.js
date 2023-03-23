import * as React from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import Login from './pages/LoginPages/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './pages/MainScreen';
import Register from './pages/LoginPages/Register';
import ForgotPass from './pages/LoginPages/ForgotPass';
import colors from './assets/colors/colors';
import Library from './pages/Library';
import Dashboard from './pages/Dashboard';
import RewardsScreen from './pages/RewardsScreen';
import ProfileSelect from './pages/LoginPages/ProfileSelect';
import ReadingPage from './pages/ReadingPage';
import ModalProvider from './assets/contexts/ModalContext';
import DropdownProvider from './assets/contexts/DropdownContext';
import LibraryProvider from './assets/contexts/LibraryContext';
import RewardsProvider from './assets/contexts/RewardsContext';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Settings from './pages/Settings/Settings';
import NotificationSettings from './pages/Settings/NotificationSettings';
import FontSizeSettings from './pages/Settings/FontSizeSettings';
import ProfileAddEdit from './pages/LoginPages/ProfileAddEdit';
import ProfileProvider from './assets/contexts/ProfileContext';

const Tab = createBottomTabNavigator();

const TransitionAnim = {
  ...TransitionPresets.ScaleFromCenterAndroid
};

const leftToRightAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="GeneralSettings" component={Settings} />
      <SettingsStack.Screen name="NotificationSettings" component={NotificationSettings} options={leftToRightAnimation} />
      <SettingsStack.Screen name="FontSizeSettings" component={FontSizeSettings} options={leftToRightAnimation} />
    </SettingsStack.Navigator>
  );
}

function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E9AF50',
        tabBarStyle: [styles.tabNavStyle, styles.shadowProp],
        tabBarLabelStyle: styles.tabNavLabelStyle,
        tabBarShowLabel: false,
        overflow: 'hidden',
      }}>

      <Tab.Screen name="Library" component={Library}
        options={{
          tabBarStyle: styles.libraryTabNavStyle,
          tabBarIcon: ({ focused }) => (
            <IonIcons name={focused ? "ios-book" : "ios-book-outline"} size={28} color="#000" />
          )
        }} />

      <Tab.Screen name="Dashboard" component={Dashboard}
        options={{
          tabBarStyle: styles.dashboardTabNavStyle,
          tabBarIcon: ({ focused }) => (
            <FAIcons name={focused ? "user" : "user-o"} size={28} color="#000" />
          )
        }} />

      <Tab.Screen name="Home" component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IonIcons name={focused ? "home" : "home-outline"} size={29} color="#000" />
          ),
        }} />

      <Tab.Screen name="RewardsScreen" component={RewardsScreen}
        options={{
          tabBarStyle: styles.rewardsTabNavStyle,
          tabBarIcon: ({ focused }) => (
            <AntIcons name={focused ? "star" : "staro"} size={30} color="#000" />
          )
        }} />

      <Tab.Screen name="Settings" component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IonIcons name={focused ? "settings" : "settings-outline"} size={30} color="#000" />
          ),
        }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <ProfileProvider>
      <RewardsProvider>
        <LibraryProvider>
          <DropdownProvider>
            <ModalProvider>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}>
                  <Stack.Screen name="Login" component={Login} options={TransitionAnim} />
                  <Stack.Screen name="ProfileSelect" component={ProfileSelect} options={TransitionAnim} />
                  <Stack.Screen name="ProfileAddEdit" component={ProfileAddEdit} options={TransitionAnim} />
                  <Stack.Screen name="MainScreen" component={HomeScreen} options={TransitionAnim} />
                  <Stack.Screen name="Register" component={Register} options={TransitionAnim} />
                  <Stack.Screen name="ForgotPass" component={ForgotPass} options={TransitionAnim} />
                  <Stack.Screen name="ReadingPage" component={ReadingPage} options={TransitionAnim} />
                </Stack.Navigator>
              </NavigationContainer>
            </ModalProvider>
          </DropdownProvider>
        </LibraryProvider >
      </RewardsProvider>
    </ProfileProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabNavStyle: {
    height: 55,
    backgroundColor: colors.yellowRegular,
  },

  tabNavLabelStyle: {
    padding: 8
  },

  labelIcon1: {
    flex: 1,
    width: '70%',
    height: '100%',
    resizeMode: 'contain',
  },

  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 18,
  },

  homeScreenTabBarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  dashboardTabNavStyle: {
    height: 55,
    backgroundColor: colors.greenRegular,
  },

  libraryTabNavStyle: {
    height: 55,
    backgroundColor: colors.blueRegular,
  },

  rewardsTabNavStyle: {
    height: 55,
    backgroundColor: colors.purpleRegular,
  },

});