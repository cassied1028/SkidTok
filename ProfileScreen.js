import React, {useEffect, useState} from 'react';
import { Button, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Video } from 'expo-av';

const ProfileScreen = () => {
  
  const [username, setUsername] = useState('')
  const [followers, setFollowers] = useState('')
  const [following, setFollowing] = useState('')
  const [currentPosts, setPosts] = useState([])

  const getUsername = async () => {
    try {
      //these 2 lines are for a string vvv
      //const name = await AsyncStorage.getItem('usernameInfo');
      //setUsername(name);
      const userJSON = await AsyncStorage.getItem('userInfo');
      const userObject = JSON.parse(userJSON); // Convert JSON string to object
      setUsername(userObject.username);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('userInfo');
      const userObject = JSON.parse(userJSON);
      setFollowers(userObject.followers);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowing = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('userInfo');
      const userObject = JSON.parse(userJSON);
      setFollowing(userObject.following);
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('userInfo');
      const userObject = JSON.parse(userJSON);
      setPosts(userObject.posts);
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect only gets called if the values in the list change
  useEffect(() => {
    getUsername()
    getFollowers()
    getFollowing()
    getPosts()
  }, [currentPosts]);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {/* top half of screen for profile info */}
      <View style={styles.profileContainer}>
        {/* top portion of the profile container that has profile pic and name */}
        <View style={styles.profileTop}>
          {/* user profile picture */}
          <Image
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/en/0/02/SkidmoreCollegeSeal.png',
            }}
            style={styles.image}
          />
          {/* user name */}
          <Text style={styles.username} adjustsFontSizeToFit numberOfLines={1}>
            @{username}
          </Text>
        </View>

        {/* user's stats */}
        <View style={styles.profileStatsContainer}>
          <Button title = {followers + " Followers"} style={{ borderWidth: 1 }} />
          <Button title={following + " Following"} />
        </View>
        <View style = {styles.horizontalLine}></View>
      </View>

      {/* bottom half of screen for posts */}
      <View style={styles.postsContainer}>
        {/* mapping through the array of posts to be able to print them */}
        {currentPosts.reverse().map((postObj, index) => (
          <View key={index} style={styles.postContainer}>
            <Video
              source={{ uri: postObj.thePost }}
              style={styles.video}
              useNativeControls
              resizeMode="cover"
              marginBottom = {10}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  )};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  post: {
    fontSize: 18,
  },
  profileContainer: {
    flex: 0.5,
    //backgroundColor: 'lightblue',
  },
  profileTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: 'lightblue',
    
  },
  profileInfo: {
    //textAlign: 'center',
  },
  postsContainer: {
    flex: 2,
    alignItems: 'center', // Add this line to center the posts horizontally
    justifyContent: 'center', 
    //backgroundColor: 'lightpink',
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  profileStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    padding: 2,
  },
  image: {
    resizeMode: 'contain',
    height: 80,
    width: 80,
    padding: 5,
    borderRadius: 80,
  },
  username: {
    fontSize: 35,
    flexShrink: 1,
    numberOfLines:1,
    textAlign: 'right',
  },
  video: {
    width: 350,
    height: 350,
  },
});

export default ProfileScreen;
