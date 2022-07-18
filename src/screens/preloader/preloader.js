import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import styles from '../../style/styles';

const Preloader = () => {
  return (
    <SafeAreaView style={styles.preloaderMainView}>
      <View
        style={{
          height: 320,
          width: 320,
          borderRadius: 320 / 2,
          backgroundColor: '#FFFFFF40',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 280,
            width: 280,
            borderRadius: 280 / 2,
            backgroundColor: '#FFFFFF60',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 240,
              width: 240,
              borderRadius: 120,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: 190, height: 120}}
              source={require('../../../assets/images/logo.png')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Preloader;
