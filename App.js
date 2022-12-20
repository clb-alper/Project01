import * as React from 'react';
import { StyleSheet } from 'react-native';
import Login from './components/Login'

export default function App() {
  return (

        <Login />


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
