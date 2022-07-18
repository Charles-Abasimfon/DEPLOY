import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {AuthContext} from '../../context/auth-context/authContext';
import * as CONSTANT from '../../constants/globalConstants';
import * as constant from '../../constants/translation';
import FormButton from '../../components/FormButton';
import {decode} from 'html-entities';
import RBSheet from 'react-native-raw-bottom-sheet';
import FormInput from '../../components/FormInput';
import {useIsFocused} from '@react-navigation/native';
import styles from '../../style/styles';
import Feather from 'react-native-vector-icons/Feather';

const customDrawer = ({navigation, props}) => {
  const {user} = useContext(AuthContext);
  const RBSheetAddCredit = useRef();
  const isFocused = useIsFocused();
  const [settings, setSettings] = useState({});
  const [selectedSetting, setSelectedSetting] = useState('');
  const [show, setShow] = useState(true);
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const isEmpty = true;

  useEffect(() => {
    if (isFocused) {
      userBalance();
    }
  }, [isFocused]);

  const handelSetting = value => {
    switch (value) {
      case 'profile':
        return (
          navigation.navigate('profileSetting'), setSelectedSetting('profile')
        );
      case 'identityInformation':
        return (
          navigation.navigate('identityInformation'),
          setSelectedSetting('identityInformation')
        );
      case 'billingInformation':
        return (
          navigation.navigate('billingInformation'),
          setSelectedSetting('billingInformation')
        );
      case 'accountSetting':
        return (
          navigation.navigate('accountSetting'),
          setSelectedSetting('accountSetting')
        );
      default:
        break;
    }
  };

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
  };

  const userBalance = () => {
    setSpinner(true);
  };

  const switchUser = () => {
    setLoader(true);
  };

  const addWallet = () => {
    if (amount != '') {
      setLoading(true);
    } else {
      Alert.alert(constant.OopsText, constant.orderDetailsAlertError);
    }
  };

  const openWallatRbsheet = () => {
    setAmount('');
    RBSheetAddCredit.current.open();
  };

  return (
    <SafeAreaView style={styles.drawerMainStyle}>
      <View style={styles.drawerUserHeaderParentStyle}>
        <View style={styles.draweruserImageHeaderStyle}>
          <Image
            style={styles.drawerUserImageStyle}
            source={{uri: user.profileImage}}
          />
        </View>
        <View style={styles.draweruserDetailParentStyle}>
          <Text style={styles.drawerNameStyle}>{user.name}</Text>
          <View style={{flexDirection: 'row'}}>
            {settings.switch_user == '1' && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  userDetail.user_type == 'sellers'
                    ? switchUser()
                    : userDetail.user_type == 'buyers'
                    ? switchUser()
                    : console.log('NotLogin')
                }>
                <Text style={styles.drawerManageProfileTextStyle}>
                  {isEmpty
                    ? 'Greetings'
                    : userDetail.user_type == 'sellers'
                    ? constant.customDrawerSwitchBuyer
                    : constant.customDrawerSwitchSeller}
                </Text>
              </TouchableOpacity>
            )}
            {loader && <ActivityIndicator size="small" color="#1C1C1C" />}
          </View>
        </View>
      </View>
      <View style={styles.drawerSeparatorStyle} />
      {!isEmpty && (
        <View style={styles.drawerWalletContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.drawerCreditCard}>
              <Feather
                name={'credit-card'}
                size={24}
                color={CONSTANT.primaryColor}
              />
            </View>
            <View style={styles.draweruserDetailParentStyle}>
              <Text style={styles.drawerNameStyle}>
                {constant.customDrawerBalance}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {spinner ? (
                  <ActivityIndicator
                    size="small"
                    color={CONSTANT.primaryColor}
                  />
                ) : (
                  <Text style={styles.drawerCreditBlance}>
                    {decode(wallet)}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              verify == '1'
                ? openWallatRbsheet()
                : Alert.alert(
                    constant.OopsText,
                    constant.taskDetailsVerificationAccess,
                  );
            }}>
            <Feather
              style={{marginRight: 10}}
              name={'briefcase'}
              size={24}
              color={CONSTANT.primaryColor}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.drawerSeparatorStyle} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isEmpty && (
          <TouchableOpacity
            onPress={() => navigation.navigate('dashboard')}
            style={styles.drawerItemParentStyle}>
            <Feather name={'flag'} size={18} color={'#999999'} />
            <Text style={styles.drawerItemTextStyle}>
              {constant.customDrawerDashboard}
            </Text>
          </TouchableOpacity>
        )}
        {isEmpty && (
          <TouchableOpacity
            onPress={() => navigation.navigate('home')}
            style={styles.drawerItemParentStyle}>
            <Feather name={'home'} size={18} color={'#999999'} />
            <Text style={styles.drawerItemTextStyle}>
              {constant.customDrawerHome}
            </Text>
          </TouchableOpacity>
        )}
        {isEmpty && (
          <TouchableOpacity
            onPress={() => navigation.navigate('signup')}
            style={styles.drawerItemParentStyle}>
            <Feather name={'edit-3'} size={18} color={'#999999'} />
            <Text style={styles.drawerItemTextStyle}>
              {constant.customDrawerSignup}
            </Text>
          </TouchableOpacity>
        )}
        {isEmpty && (
          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            style={styles.drawerItemParentStyle}>
            <Feather name={'user'} size={18} color={'#999999'} />
            <Text style={styles.drawerItemTextStyle}>
              {constant.customDrawerLogin}
            </Text>
          </TouchableOpacity>
        )}

        {!isEmpty && (
          <TouchableOpacity
            style={styles.drawerItemParentStyle}
            onPress={() => navigation.navigate('home')}>
            <Feather name={'home'} size={18} color={'#999999'} />
            <Text style={styles.drawerItemTextStyle}>
              {constant.customDrawerHome}
            </Text>
          </TouchableOpacity>
        )}

        {!isEmpty && userDetail.user_type != 'buyers' && (
          <TouchableOpacity
            style={styles.drawerItemParentStyle}
            onPress={() => navigation.navigate('earnings')}>
            <Feather name={'dollar-sign'} size={18} color={'#999999'} />
            <Text style={styles.drawerItemTextStyle}>
              {constant.customDrawerEarnings}
            </Text>
          </TouchableOpacity>
        )}

        {!isEmpty && (
          <TouchableOpacity
            style={styles.drawerItemParentStyle}
            onPress={() => navigation.navigate('task')}>
            <Feather name={'briefcase'} size={18} color={'#999999'} />
            <Text style={styles.drawerItemTextStyle}>
              {constant.customDrawerManageTasks}
            </Text>
          </TouchableOpacity>
        )}

        {!isEmpty && (
          <>
            <TouchableOpacity
              onPress={() => setShow(!show)}
              style={[
                styles.drawerItemParentStyle,
                {justifyContent: 'space-between'},
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Feather name={'settings'} size={18} color={'#999999'} />
                <Text style={styles.drawerItemTextStyle}>
                  {constant.customDrawerSettings}
                </Text>
              </View>

              <Feather
                style={{marginRight: 15, width: '10%'}}
                name={show ? 'minus' : 'plus'}
                type={show ? 'minus' : 'plus'}
                size={18}
                color={'#1C1C1C'}
              />
            </TouchableOpacity>
            {show && (
              <View style={styles.drawerSettingConatiner}>
                <TouchableOpacity
                  onPress={() => handelSetting('profile')}
                  style={styles.drawerSubSettingsContainer}>
                  <View
                    style={[
                      styles.drawerSubSettingsIconStyle,
                      {
                        borderColor:
                          selectedSetting == 'profile' ? '#22C55E' : '#999',
                        backgroundColor:
                          selectedSetting == 'profile' ? '#22C55E' : '#fff',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.drawerItemTextStyle,
                      {
                        color:
                          selectedSetting == 'profile' ? '#1C1C1C' : '#999',
                      },
                    ]}>
                    {constant.customDrawerProfileSettings}
                  </Text>
                </TouchableOpacity>
                <View style={styles.drawerSettingSeprater} />
                <TouchableOpacity
                  onPress={() => handelSetting('identityInformation')}
                  style={styles.drawerSubSettingsContainer}>
                  <View
                    style={[
                      styles.drawerSubSettingsIconStyle,
                      {
                        borderColor:
                          selectedSetting == 'identityInformation'
                            ? '#22C55E'
                            : '#999',
                        backgroundColor:
                          selectedSetting == 'identityInformation'
                            ? '#22C55E'
                            : '#fff',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.drawerItemTextStyle,
                      {
                        color:
                          selectedSetting == 'identityInformation'
                            ? '#1C1C1C'
                            : '#999',
                      },
                    ]}>
                    {constant.customDrawerIdentityVerification}
                  </Text>
                </TouchableOpacity>
                <View style={styles.drawerSettingSeprater} />
                <TouchableOpacity
                  onPress={() => handelSetting('billingInformation')}
                  style={styles.drawerSubSettingsContainer}>
                  <View
                    style={[
                      styles.drawerSubSettingsIconStyle,
                      {
                        borderColor:
                          selectedSetting == 'billingInformation'
                            ? '#22C55E'
                            : '#999',
                        backgroundColor:
                          selectedSetting == 'billingInformation'
                            ? '#22C55E'
                            : '#fff',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.drawerItemTextStyle,
                      {
                        color:
                          selectedSetting == 'billingInformation'
                            ? '#1C1C1C'
                            : '#999',
                      },
                    ]}>
                    {constant.customDrawerBillingInformation}
                  </Text>
                </TouchableOpacity>
                <View style={styles.drawerSettingSeprater} />
                <TouchableOpacity
                  onPress={() => handelSetting('accountSetting')}
                  style={styles.drawerSubSettingsContainer}>
                  <View
                    style={[
                      styles.drawerSubSettingsIconStyle,
                      {
                        borderColor:
                          selectedSetting == 'accountSetting'
                            ? '#22C55E'
                            : '#999',
                        backgroundColor:
                          selectedSetting == 'accountSetting'
                            ? '#22C55E'
                            : '#fff',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.drawerItemTextStyle,
                      {
                        color:
                          selectedSetting == 'accountSetting'
                            ? '#1C1C1C'
                            : '#999',
                      },
                    ]}>
                    {constant.customDrawerAccountSettings}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {!isEmpty && (
          <TouchableOpacity
            style={styles.drawerItemParentStyle}
            onPress={() => navigation.navigate('disputes')}>
            <Feather name={'refresh-cw'} size={18} color={'#999999'} />
            <Text style={styles.drawerItemTextStyle}>
              {constant.customDrawerDisputes}
            </Text>
          </TouchableOpacity>
        )}

        {!isEmpty && (
          <TouchableOpacity
            style={styles.drawerItemParentStyle}
            onPress={() => navigation.navigate('invoice')}>
            <Feather name={'shopping-bag'} size={18} color={'#999999'} />
            <Text style={styles.drawerItemTextStyle}>
              {constant.customDrawerInvoices}
            </Text>
          </TouchableOpacity>
        )}

        {!isEmpty && (
          <TouchableOpacity
            style={styles.drawerItemParentStyle}
            onPress={() => navigation.navigate('savedItem')}>
            <Feather name={'heart'} size={18} color={'#999999'} />
            <Text style={styles.drawerItemTextStyle}>
              {constant.customDrawerSavedItems}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {!isEmpty && (
        <TouchableOpacity
          style={styles.drawerLogoutParentStyle}
          onPress={() => logout()}>
          <Feather name={'power'} size={18} color={'#EF4444'} />
          <Text style={styles.drawerLogoutTextStyle}>
            {constant.customDrawerLogout}
          </Text>
        </TouchableOpacity>
      )}
      <RBSheet
        ref={RBSheetAddCredit}
        height={Dimensions.get('window').height * 0.5}
        duration={250}
        customStyles={{
          container: {
            paddingVertical: 15,
            paddingHorizontal: 15,
            backgroundColor: 'transparent',
          },
        }}>
        <View style={styles.RBSheetParentStyleTwo}>
          <View style={styles.RBSheetheaderStyleTwo}>
            <Text style={styles.RBSheetHeaderTextStyle}>
              {constant.customDrawerAddCredit}
            </Text>
            <Feather
              onPress={() => RBSheetAddCredit.current.close()}
              style={styles.RBSheetCloseIconStyle}
              name={'x'}
              size={20}
              color={'#1C1C1C'}
            />
          </View>

          <ScrollView
            style={{paddingHorizontal: 20, paddingVertical: 10}}
            showsVerticalScrollIndicator={false}>
            <FormInput
              labelValue={amount}
              onChangeText={val => setAmount(val)}
              inputType={'numeric'}
              placeholderText={'Enter amount'}
            />
            <FormButton
              onPress={() => addWallet()}
              buttonTitle={'Add funds now'}
              backgroundColor={CONSTANT.primaryColor}
              iconName={'arrow-right'}
              textColor={'#fff'}
              loader={loading}
            />
            <View style={styles.RbSheetAddCreditDescConatainer}>
              <Text style={styles.RbSheetAddCreditAsterisk}>*</Text>
              <Text style={styles.RbSheetAddCreditDescription}>
                {constant.customDrawerWoocommerce}
              </Text>
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default customDrawer;
