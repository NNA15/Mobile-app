import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const StartScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../images/playstore.png')}
          style={styles.image}></ImageBackground>
      </View>
    </View>
    
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'center',
    height: 200,
    width: 200,
  },
});

export default StartScreen;


