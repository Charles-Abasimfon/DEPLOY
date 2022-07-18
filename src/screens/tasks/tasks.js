import {View, Text, SafeAreaView, FlatList,Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import styles from '../../style/styles.js';
import {TextInput} from 'react-native-gesture-handler';
import MultiSelect from 'react-native-multiple-select';
import AvaliableTaskCard from '../tasks/avaliableTaskCard';
import {useIsFocused} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as CONSTANT from '../../constants/globalConstants';
import {useSelector, useDispatch} from 'react-redux';
import * as constant from '../../constants/translation';

const task = () => {
  const token = useSelector(state => state.value.token);
  const userDetail = useSelector(state => state.value.userInfo);
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(false);
  const [availableTaskList, setAvailableTaskList] = useState([]);
  const [selectedOrderType, setSelectedOrderType] = useState('');
  const [emptyTask, setEmptyTask] = useState(false);
  const [showOrderType, setShowOrderType] = useState([
    {
      key: 'any',
      val: 'All',
    },
    {
      key: 'hired',
      val: 'Ongoing',
    },
    {
      key: 'completed',
      val: 'Completed',
    },
    {
      key: 'cancelled',
      val: 'Cancelled',
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      getAvailableTask();
    }
  }, [isFocused,selectedOrderType]);
  const getAvailableTask = () => {
    setLoader(true);
    fetch(
      CONSTANT.BaseUrl +
        'get-orders?post_id=' +
        userDetail.profile_id +
        '&order_type=' +
        selectedOrderType.toString(),
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
        console.log('respone', responseJson);
        if (responseJson.length == 0) {
          setEmptyTask(true);
          setAvailableTaskList(responseJson);
          setLoader(false);
        } else{
          setLoader(false);
          setAvailableTaskList(responseJson);
        }
       
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  return (
    <SafeAreaView style={styles.globalContainer}>
      <Header
        title={constant.taskTitle}
        titleColor={'#1C1C1C'}
        backColor={'#F7F7F7'}
        iconColor={'#1C1C1C'}
      />
      {loader && <Spinner visible={true} color={'#000'} />}
      <View style={{backgroundColor: '#FFFFFF'}}>
        {/* <View style={styles.taskSearchConatiner}>
          <View style={styles.taskSearchInput}>
            <TextInput placeholder="Search order here" />
          </View>
          <Feather
            onPress={() => getAvailableTask()}
            name={'search'}
            size={18}
            color={'#888888'}
          />
        </View> */}
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <View
            style={styles.taskSelectView}>
            <MultiSelect
              fontSize={16}
              onSelectedItemsChange={value => setSelectedOrderType(value)}
              uniqueKey="key"
              items={showOrderType}
              selectedItems={selectedOrderType}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText={constant.taskFilter}
              selectText={constant.taskFilter}
              styleMainWrapper={styles.multiSlectstyleMainWrapper}
              styleDropdownMenuSubsection={
                styles.multiSlectstyleDropdownMenuSubsection
              }
              styleListContainer={{
                maxHeight: 150,
              }}
              onChangeInput={text => console.log(text)}
              displayKey="val"
              submitButtonText={constant.Submit}
            />
          </View>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={availableTaskList}
        ListEmptyComponent={
          emptyTask &&(
            <View
            style={styles.NodataFoundContainer}>
            <Image
              resizeMode="contain"
              style={styles.NodataFoundImg}
              source={require('../../../assets/images/empty.png')}
            />
            <Text
              style={styles.NodataFoundText}>
              {constant.NoRecord}
            </Text>
          </View>
          )
        
        }
        keyExtractor={(x, i) => i.toString()}
        renderItem={({item, index}) => <AvaliableTaskCard item={item} />}
      />
    </SafeAreaView>
  );
};

export default task;
