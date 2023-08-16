import React, {useRef} from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const FeedScreen = () => {
  //const videoUri = 
  const videoRef = useRef(null);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
      videoRef.current.setPositionAsync(0); // Reset the video position to the beginning
      videoRef.current.playAsync(); // Start playing the video again
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('./assets/videoDemo.mp4')}
        style={styles.video}
        useNativeControls
        shouldPlay={true}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
      <Text style={styles.username}>@zachking</Text>

      {/* Arrow pointing right */}
      <View style={styles.rightArrow}>
        <Ionicons name="ios-arrow-forward" size={40} color="rgba(29, 29, 29, 0.8)" />
      </View>

      {/* Arrow pointing left */}
      <View style={styles.leftArrow}>
        <Ionicons name="ios-arrow-back" size={40} color="rgba(29, 29, 29, 0.8)" />
      </View>


    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 0.3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    left: 10,
    top: 10,
  },
  video: {
    height: Dimensions.get('window').height,
    width: 390,
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  leftArrow: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
});
