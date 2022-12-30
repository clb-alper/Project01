import * as React from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './components/MainScreen';
import Register from './components/Register';
import ForgotPass from './components/ForgotPass';
import colors from './assets/colors/colors';
import { View } from 'react-native-web';
import Library from './components/Library';
import Dashboard from './components/Dashboard';
import RewardsScreen from './components/RewardsScreen';
import ProfileSelect from './components/ProfileSelect';

const Tab = createBottomTabNavigator();

var touchPropsHomeButton = {
  activeOpacity: 1,
  underlayColor: '#ffe0e7',
  onHideUnderlay: () => setIsPress(false),
  onShowUnderlay: () => setIsPress(true),
  //onPress: () => console.log("Giriş Yapıldı")
  onPress: () => navigation.navigate('MainScreen')

};

const HomeScreenTabBarButton = ({ onPress }) => (
  <TouchableHighlight {...touchPropsHomeButton} style={styles.homeScreenTabBarStyle} onPress={onPress}>
  </TouchableHighlight>
);

const TransitionAnim = {
  ...TransitionPresets.ScaleFromCenterAndroid
};

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
          tabBarIcon: ({ focused }) => (
            <Image source={require('./assets/images/iconPoints.png')}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
              }}
            />
          )
        }} />

      <Tab.Screen name="Dashboard" component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require('./assets/images/iconPoints.png')}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
              }}
            />
          )
        }} />

      <Tab.Screen name="Home" component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require('./assets/images/homeButtonBG.png')}
              resizeMode="contain"
              style={{
                width: 90,
                height: 90,
                top: '-15%',
              }}
            />
          ),
          HomeScreenTabBarButton: (props) => (
            <HomeScreenTabBarButton {...props} />
          )
        }} />

      <Tab.Screen name="RewardsScreen" component={RewardsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require('./assets/images/iconPoints.png')}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
              }}
            />
          )
        }} />

      <Tab.Screen name="Profile" component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require('./assets/images/iconPoints.png')}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
              }}
            />
          )
        }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} options={TransitionAnim} />
        <Stack.Screen name="ProfileSelect" component={ProfileSelect} options={TransitionAnim} />
        <Stack.Screen name="MainScreen" component={HomeScreen} options={TransitionAnim} />
        <Stack.Screen name="Register" component={Register} options={TransitionAnim} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} options={TransitionAnim} />
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