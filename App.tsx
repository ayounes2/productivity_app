import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import Splash from './src/Splash/Splash';
import { connectToDatabase, createTables } from './src/db/db';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DomainListPage from './src/DomainList/DomainList';
import ActivityListPage from './src/Activity/ActivityList';

const Stack = createNativeStackNavigator();

const App = () => {

  const loadData = useCallback(async () => {
    // create and seed tables if not exist
    const dataSeeded = await AsyncStorage.getItem('dataSeeded');
    if (dataSeeded === null) {
      const db = await connectToDatabase();
      await createTables(db);
      await AsyncStorage.setItem('dataSeeded', 'true');
      db.close()
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
          name='DomainList'
          component={DomainListPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ActivityList'
          component={ActivityListPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;