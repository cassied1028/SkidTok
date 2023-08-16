import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, TextInput, SafeAreaView, Image, Alert,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Camera} from 'expo-camera'; /*expo install expo-camera*/
import { Video } from 'expo-av'; //
import { MediaLibrary } from 'expo-media-library';

import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

import Post from './PostClass';

const CreateScreen = () => {
  let cameraRef = useRef();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [hasCameraPermission, setHasCameraPermission] = useState();

  const [recording, setRecording] = useState(false);
  const [video, setVideo] = useState(null);
  const [cameraReference, setCameraRef] = useState(null);

  const [posts, setPosts] = useState([]);
  const [showPostConfirmation, setShowPostConfirmation] = useState(false);
  const [username, setUsername] = useState('')

  // const handlePost = () => {
  //   const newPost = new Post(username, video);
  //   setPosts(prevPosts => [...prevPosts, newPost]);
  //   setVideo(null); // Clear the video state
  //   setShowPostConfirmation(true); // Show post confirmation message
  
  //   setTimeout(() => {
  //     setShowPostConfirmation(false);
  //   }, 2000);
  // };

  const handlePost = () => {
    Alert.alert(
      '⚠️Privacy Warning⚠️',
      'Make sure your video does not contain any personal information. This may include your:\n•home address\n•license plate\n•birthday\n•email address\n•current location',
      [
        {
          text: 'Go Back',
          style: 'cancel',
        },
        {
          text: 'Post Anyway',
          onPress: () => {
            const newPost = new Post(username, video);
            setPosts(prevPosts => [...prevPosts, newPost]);
            setVideo(null); // Clear the video state
          },
        },
      ],
      { cancelable: false }
    );
  };

  const getUsername = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('userInfo');
      const userObject = JSON.parse(userJSON); // Convert JSON string to object
      setUsername(userObject.username);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPosts = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('userInfo');
      const userObject = JSON.parse(userJSON);
      userObject.posts = posts; // Update the posts array in the userObject
      await AsyncStorage.setItem('userInfo', JSON.stringify(userObject)); // Save the updated userObject
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermissions.status === 'granted');
    })();
    getUsername();
    updateUserPosts();
  }, [posts]);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  const toggleCameraType = () => {
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const startRecording = async () => {
    setRecording(true);
    try {
      const { uri } = await cameraReference.recordAsync();
      setVideo(uri);
    } catch (error) {
      console.log(error);
    }
  };
  
  const stopRecording = () => {
    setRecording(false);
    cameraReference.stopRecording();
  };

  //screen shown after a video is taken:
  if (video) {
    return (
      <SafeAreaView style={styles.container}>
        <Video source={{ uri: video }} style={styles.preview} useNativeControls resizeMode="contain" />
        <View style={styles.buttonContainerPostScreen}>
          <TouchableOpacity style={styles.discardButton} onPress={() => setVideo(null)}>
            <Icon name="trash" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }


  //screen shown before/while video is being taken
  return (
    <View style={styles.container}>
        {showPostConfirmation && (
          <Text style={styles.postConfirmation}>Post created successfully!</Text>
        )}
      <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)} type={cameraType} />
      <View style={styles.buttonContainer}>
        {recording ? (
          <TouchableOpacity style={styles.stopRecordingButton} onPress={stopRecording}>
            <Icon name="stop" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.startRecordingButton} onPress={startRecording}>
            <Icon name="circle" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.cameraToggle} onPress={toggleCameraType}>
        <Icon name="refresh" size={24} color="black" />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainerPostScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will evenly distribute the buttons horizontally
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 0, // Add some bottom padding to separate the buttons from the bottom of the screen
    bottom: 55
  },
  discardButton: {
    position: 'absolute',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff5',
    left: 10, 
  },
  postButton: {
    position: 'absolute',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#fff5',
    right: 10, 
  },
  buttonText: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  cameraToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#fff5',
  },
  startRecordingButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'red',
    marginRight: 10,
  },
  stopRecordingButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
  },
  preview: {
    flex: 1,
    alignSelf: 'stretch',
  },
  postConfirmation: {
    marginTop: 10,
    alignSelf: 'center',
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateScreen;
