import * as React from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './components/MainScreen';
import Register from './components/Register';
import ForgotPass from './components/ForgotPass';
import colors from './assets/colors/colors';
import { View } from 'react-native-web';

const Tab = createBottomTabNavigator();

const HomeScreenTabBarButton = ({ onPress }) => (
  <TouchableHighlight style={styles.homeScreenTabBarStyle} onPress={onPress}>
  </TouchableHighlight>
);

function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E9AF50',
        tabBarStyle: [styles.tabNavStyle, styles.shadowProp],
        tabBarLabelStyle: styles.tabNavLabelStyle,
        tabBarShowLabel: false,
        overflow: 'hidden',
      }}>
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Profile" component={MainScreen} />
      <Tab.Screen name="Profile3" component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require('./assets/images/homeButtonBG.png')}
              resizeMode="contain"
              style={{
                width: 90,
                height: 90,
                top: -12,
              }}
            />
          ),
          HomeScreenTabBarButton: (props) => (
            <HomeScreenTabBarButton {...props} />
          )
        }} />
      <Tab.Screen name="Profile4" component={MainScreen} />
      <Tab.Screen name="Profile5" component={MainScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainScreen" component={HomeScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
      </Stack.Navigator>
    </NavigationContainer>

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
    height: 75,
    position: 'absolute',
    elevation: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.yellowTabBar,

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

});