import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './components/MainScreen';
import Register from './components/Register';
import ForgotPass from './components/ForgotPass';
import colors from './assets/colors/colors';

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator 
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#E9AF50',
      tabBarInactiveBackgroundColor: '#FBE7C6',
      tabBarActiveBackgroundColor: '#FBE7C6',
      tabBarStyle: [styles.tabNavStyle, styles.shadowProp],
      tabBarLabelStyle: styles.tabNavLabelStyle,
      tabBarShowLabel: false,
    }}>
      <Tab.Screen name=" " component={MainScreen} 
       options={{
        tabBarIcon: ({ color, size }) => (
          <Image source={require('./assets/images/icontest.png')} style={styles.labelIcon1} />
        ),
      }}/>
      <Tab.Screen name="Profile" component={MainScreen} />
      <Tab.Screen name="Profile3" component={MainScreen} />
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
        <Stack.Screen name="MainScreen" component={Home} />
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
});