import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddContactScreen from './screens/AddContactScreen';
import ViewContactScreen from './screens/ViewContactScreen';
import EditContactScreen from './screens/EditContactScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Contacts" component={HomeScreen} />
        <Stack.Screen name="Add Contact" component={AddContactScreen} />
        <Stack.Screen name="View Contact" component={ViewContactScreen} />
        <Stack.Screen name="Edit Contact" component={EditContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
