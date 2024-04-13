import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import Splash from './src/Splash/Splash';
import HomePage from './src/Home/Home';
import { connectToDatabase, createTables } from './src/db/db';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {

  const loadData = useCallback(async () => {
    const database = await connectToDatabase();
    // create and seed tables if not exist
    const dataSeeded = await AsyncStorage.getItem('dataSeeded');
    if (dataSeeded === null) {
      await createTables(database);
      await AsyncStorage.setItem('dataSeeded', 'true');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name='Splash'
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={HomePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;