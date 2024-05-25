import React, {useEffect, useState} from 'react';
import LoginScreen from './src/LoginScreen';
import InviteTeam from './src/InviteTeam';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodoApp from './src/profile';
import Register from './src/Register';
import Profile from './src/profile';
import ListUsers from './src/ShowUsers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const sessionToken = await AsyncStorage.getItem('sessionToken');
      console.log(sessionToken, 'sessionToken');
      // Check if sessionToken exists and set isAuthenticated accordingly
      setIsAuthenticated(!!sessionToken);
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'profile' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InviteTeam"
          component={InviteTeam}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowUsers"
          component={ListUsers}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
