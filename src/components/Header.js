import React, {useContext} from 'react';
import {AuthContext} from '../context/auth-context/authContext';
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import styles from '../style/styles';

const header = ({title, titleColor, img, backColor, iconColor, backIcon}) => {
  const {user} = useContext(AuthContext);

  const navigationforword = useNavigation();

  return (
    <View style={[styles.headerMainView]}>
      {!backIcon ? (
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => navigationforword.openDrawer()}
          style={styles.headerDrawerIcon}>
          <Feather name="menu" type="menu" color={iconColor} size={25} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => {
            navigationforword.goBack();
            // navigationforword.reset({
            //   index: 0,
            //   routes: [{name: 'home'}],
            // });
          }}
          style={styles.headerDrawerIcon}>
          <Feather
            name="chevron-left"
            type="chevron-left"
            color={iconColor}
            size={25}
          />
        </TouchableOpacity>
      )}
      <Text
        style={{
          color: titleColor,
          fontSize: 18,
          fontFamily: 'Urbanist-SemiBold',
        }}>
        {title}
      </Text>

      <TouchableOpacity
        onPress={() => {
          isEmpty != true &&
            navigationforword.navigate('imagePreview', {
              imageData: profileImage,
            });
        }}>
        <Image
          style={styles.headerPhoto}
          source={{
            uri: user.profileImage,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default header;
