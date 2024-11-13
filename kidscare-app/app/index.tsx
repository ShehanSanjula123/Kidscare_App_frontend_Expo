
import React from 'react'
import '../global.css'
import FrontPage from './FrontPage'
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import ParentHome from './ParentHome';
import DocHome from './DocHome';
import VacDetails from './VacDetails';
import ChangePassword from './ChangePassword';
import ForgotPassword from './ForgotPassword';


const Stack = createStackNavigator();

const index = () => {
  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="/" component={FrontPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="parentHome" component={ParentHome} />
      <Stack.Screen name="docHome" component={DocHome} />
      <Stack.Screen name="ChangeP" component={ChangePassword} />
      <Stack.Screen name="vacDetails" component={VacDetails} />
      <Stack.Screen name="FPassword" component={ForgotPassword}/>
    </Stack.Navigator>
 
  )
}

export default index