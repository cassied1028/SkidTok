import React, {useState} from 'react';
import {View, Alert, Button, TextInput, StyleSheet, Text } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* importing the different screens */}
import FeedScreen from './FeedScreen';
import SearchScreen from './SearchScreen';
import CreateScreen from './CreateScreen';
import ProfileScreen from './ProfileScreen';
import User from './UserClass';


const BottomTab = createBottomTabNavigator();

//code to prompt for username before show rest of app, still working on it
const UsernamePrompt = ( {onUsernameSubmit} ) => {
  const [usernameIn, setUsernameIn] = useState('')

  //code for when the submit button is pressed
  const handleSubmit = () => {
    if (usernameIn.trim() === "") {
      Alert.alert('Error', 'Enter a username');
    } else if (usernameIn.includes(' ')) {
      Alert.alert('Error', 'Username should not contain spaces');
    } else {
      const lowercaseUsername = usernameIn.toLowerCase();
      onUsernameSubmit(lowercaseUsername);
      saveNewUser(lowercaseUsername);
    }
  };

  const saveNewUser = async () => {
    try{ 
      const newUser = new User(usernameIn.toLowerCase())
      AsyncStorage.setItem('userInfo', JSON.stringify(newUser))
      //use this line instead for a string vvv
      //AsyncStorage.setItem('usernameInfo', usernameIn)

    } catch (error) {
      console.log('error')
    }
  };

  // React.useEffect(() => {
  //   try{
  //     const name = await AsyncStorage.getItem('userInfo')
  //   } catch (error){}
  // }, []);

  //the screen to be returned
  return (
    <View style={styles.container}>
      <Text>Welcome! Please enter your username:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.atSign}>@</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={setUsernameIn}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

//main app
const App = () => {

  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (username) => {
    setUsername(username);
  };

  return (
    <NavigationContainer>
      {username === '' ? (
        <UsernamePrompt onUsernameSubmit={handleUsernameSubmit} />
      ) : (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Feed') {
                iconName = 'home-outline';
                } else if (route.name === 'Search') {
                iconName = 'search-outline';
                } else if (route.name === 'Create') {
                iconName = 'add-circle-outline';
                } else if (route.name === 'Profile') {
                iconName = 'person-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            })}
        >
        <BottomTab.Screen name = "Feed" component={FeedScreen} />
        <BottomTab.Screen name = "Search" component={SearchScreen} />
        <BottomTab.Screen name = "Create" component={CreateScreen} />
        <BottomTab.Screen name = "Profile" component={ProfileScreen} />
      </BottomTab.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',  
    justifyContent: 'center', 
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    padding: 7,
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'stretch',
    marginRight: 20,
    marginLeft: 5,
    borderRadius: 5,
    color: 'black',
  },
  atSign: {
    fontSize: 18,
    marginRight: 5,
    marginLeft: 20,
  },
});


export default App;
