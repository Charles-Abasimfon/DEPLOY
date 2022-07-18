import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import styles from '../../style/styles.js';
import * as CONSTANT from '../../constants/globalConstants';
import {useSelector, useDispatch} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';
import {ScrollView} from 'react-native-gesture-handler';
import {decode} from 'html-entities';
import {useIsFocused} from '@react-navigation/native';
import * as constant from "../../constants/translation"

const invoice = () => {
  const isFocused = useIsFocused();
  const [invoiceList, setInvoiceList] = useState([]);
  const [loader, setLoader] = useState(false);
  const token = useSelector(state => state.value.token);
  const userDetail = useSelector(state => state.value.userInfo);
  const [emptyInvoiceList, setEmptyInvoiceList] = useState(false);
  const [invoicePath, setInvoicePath] = useState('');

  useEffect(() => {
    if (isFocused) {
      getInvoices();
    }
  }, [isFocused]);
  const getInvoices = () => {
    setLoader(true);
    fetch(CONSTANT.BaseUrl + 'invoices-list?post_id=' + userDetail.profile_id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length == 0) {
          setEmptyInvoiceList(true)
          setLoader(false);
        } else {
          setLoader(false);
          setInvoiceList(responseJson);
        }
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };

  const downloadInvoice = item => {
    setLoader(true);
    fetch(
      CONSTANT.BaseUrl +
        'get-invoice?post_id=' +
        userDetail.profile_id +
        '&order_id=' +
        item.order_id,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.type == 'success') {
          setInvoicePath(responseJson.invoice_detail.file_path);
          checkPermission(responseJson.invoice_detail.file_url,responseJson.invoice_detail.file_path);
        }
        console.log('responseJson', responseJson);
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };

  const checkPermission = async (link,path) => {
    if (Platform.OS === 'ios') {
      console.log('link', link);
      setLoader(false);
      downloadMedia(link,path);
    } else {
      setLoader(false);
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('permission granted..');
          downloadMedia(link,path);
        } else {
          Alert.alert(constant.invoiceAlertPermission);
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  const downloadMedia = (link,path) => {
    let URL = link;
    let date = new Date();
    let ext = '.zip';
    const {config, fs} = RNFetchBlob;
    let options;
    let PictureDir = fs.dirs.PictureDir;
    options = Platform.select({
      ios: {
        fileCache: true,
        path:
          PictureDir +
          '/Taskbot/Taskbot Documents/' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        appendExt: ext,
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true, // <-- this is the only thing required
          notification: true,
          path:
            PictureDir +
            '/Taskbot/Taskbot Documents/' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Document',
        },
      },
    });
    config(options)
      .fetch('GET', URL)
      .then(res => {
         removeInvoicePDF(path)
        console.log('Success', res);
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(res.data);
        }
      });
  };

  const removeInvoicePDF = (path) => {
    console.log(CONSTANT.BaseUrl +
      'remove-invoicepdf?post_id=' +
      userDetail.profile_id +
      '&file_path=' +
      path)
    fetch(
      CONSTANT.BaseUrl +
        'remove-invoicepdf?post_id=' +
        userDetail.profile_id +
        '&file_path=' +
        path,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.globalContainer}>
      <Header
        title={constant.invoiceTitle}
        titleColor={'#1C1C1C'}
        backColor={'#F7F7F7'}
        iconColor={'#1C1C1C'}
      />
      {loader && <Spinner visible={true} color={'#000'} />}
      <View style={styles.invoiceInfoTextParentStyle}>
        <Text style={styles.invoiceInfoTextStyle}>
          {constant.invoiceDescription}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          scrollEnabled={false}
          data={invoiceList}
          keyExtractor={(x, i) => i.toString()}
          ListEmptyComponent={
            emptyInvoiceList &&(
              <View
                style={styles.invoiceEmptyView}>
                <Image
                  resizeMode="contain"
                  style={styles.invoiceEmptyImg}
                  source={require('../../../assets/images/empty.png')}
                />
                <Text
                  style={styles.invoiceEmptyText}>
                  {constant.NoRecord}
                </Text>
              </View>
            )
          }
          renderItem={({item, index}) => (
            <View style={styles.invoiceParentStyle}>
              <View style={styles.invoiceRowParentStyle}>
                <Text style={styles.invoiceLableTextStyle}>{constant.invoiceText}</Text>

                <Text style={styles.invoiceValueTextStyle}>
                  {item.order_id}
                </Text>
              </View>

              <View style={styles.invoicePayoutSeparatorStyle} />

              <View style={styles.invoiceRowParentStyle}>
                <Text style={styles.invoiceLableTextStyle}>{constant.invoicePayment}</Text>

                <Text style={styles.invoiceClientNameValueTextStyle}>
                  {item.payemnt_type}
                </Text>
              </View>

              <View style={styles.invoicePayoutSeparatorStyle} />

              <View style={styles.invoiceRowParentStyle}>
                <Text style={styles.invoiceLableTextStyle}>{constant.invoiceDate}</Text>

                <Text style={styles.invoiceValueTextStyle}>
                  {item.data_created}
                </Text>
              </View>

              <View style={styles.invoicePayoutSeparatorStyle} />

              <View style={styles.invoiceRowParentStyle}>
                <Text style={styles.invoiceLableTextStyle}>{constant.invoiceAmount}</Text>

                <Text style={styles.invoiceValueTextStyle}>
                  {decode(item.amount)}
                </Text>
              </View>
              <View style={styles.invoicePayoutSeparatorStyle} />

              <TouchableOpacity
                onPress={() => downloadInvoice(item)}
                style={styles.invoiceDownloadParentStyle}>
                <Text style={styles.incoiceDownloadTextStyle}>
                {constant.invoiceDownload}
                </Text>
                <Feather name={'download'} size={18} color={'#1DA1F2'} />
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default invoice;
