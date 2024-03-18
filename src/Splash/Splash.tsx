import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#0000BF6F',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'contain'
  },
})

const Splash = ({ navigation }: { navigation: any }) => {
  setTimeout(() => {
    navigation.replace('Home');
  }, 2000);
  return (
    <View style={styles.view}>
      <Image source={require('../../assets/windows-vista-logo.png')} style={styles.image} />
      <ActivityIndicator size='large' color={'#000000'} />
    </View >
  );
};

export default Splash;