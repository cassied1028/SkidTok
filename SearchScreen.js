import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState(''); 

  const handleSearchTextChange = (text) => {
    setSearchText(text); 
  };

  return (
    <View style = {styles.container}>
      {/* <Text>Search Screen</Text> */}
      <TextInput
        onChangeText={handleSearchTextChange}
        value={searchText}
        style={styles.inputBox}
        placeholder='Search'
        placeholderTextColor='gray'
        backgroundColor='white'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    padding: 7,
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'stretch',
    marginRight: 0,
    marginTop: 0,
    borderRadius: 5,
    color: 'black',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
    backgroundColor: 'white',
  }
});

export default SearchScreen;
