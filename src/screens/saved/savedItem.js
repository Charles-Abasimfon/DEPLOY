import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Header from '../../components/Header';
import * as CONSTANT from '../../constants/globalConstants';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../../style/styles.js';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import TaskCard from '../home/homeCards/taskCard';
import {SwipeListView} from 'react-native-swipe-list-view';
import FreelancerCard from '../home/homeCards/freelancerCard';
import {ScrollView} from 'react-native-gesture-handler';
import {BarIndicator} from 'react-native-indicators';
import * as constant from "../../constants/translation"

const savedItem = () => {
  const token = useSelector(state => state.value.token);
  const userDetail = useSelector(state => state.value.userInfo);
  const [selectedPlan, setSelectedPlan] = useState('sellers');
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [savedSeller, setSavedSeller] = useState([]);
  const [savedTask, setSavedTask] = useState([]);
  const [emptyFreelancerList, setEmptyFreelancerList] = useState(false);
  const isFocused = useIsFocused();
  const [page, setpage] = useState(2);
  const [taskPage, setTaskpage] = useState(2);
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const onEndReachedCalledDuringMomentum = useRef(true);

  useEffect(() => {
    if (isFocused) {
      getSavedSeller();
      getSavedTask();
    }
  }, [isFocused]);

  const getSavedSeller = () => {
    setLoader(true);
    fetch(
      CONSTANT.BaseUrl +
        'sellers/get_sellers?show_posts=20&profile_id=' +
        userDetail.profile_id +
        '&type=saved',

      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length == 0) {
          setEmptyFreelancerList(true);
          setLoader(false);
        } else {
          setEmptyFreelancerList(false);
          setSavedSeller(responseJson);
          setLoader(false);
        }
      })

      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const getSavedTask = () => {
    fetch(
      CONSTANT.BaseUrl +
        'tasks/get_tasks?show_posts=20&profile_id=' +
        userDetail.profile_id +
        '&type=saved',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length == 0) {
          setLoader(false);
        } else {
          setSavedTask(responseJson.tasks);
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const RemoveToSaveList = (type, id) => {
    console.log(type, id);
    setLoader(true);
    axios
      .post(
        CONSTANT.BaseUrl + 'update-saveditem',
        {
          post_id: userDetail.profile_id,
          action: 'taskbot_saved_items',
          item_id: id,
          type: type,
          option: '',
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      .then(async response => {
        if (response.data.type == 'success') {
          setLoader(false);
          if (type == 'sellers') {
            getSavedSeller();
          } else {
            getSavedTask();
          }
          // Alert.alert('Success', response.data.message_desc);
        } else if (response.data.type == 'error') {
          setLoader(false);
          Alert.alert(constant.OopsText, response.data.message_desc);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log(error);
      });
  };
  // const loadMoreData = ()=>{
  //   console.log("Reached")
  // }
  const loadMoreData = async () => {
    console.log('Reached');
    setPageLoader(true);
    fetch(
      CONSTANT.BaseUrl +
        'sellers/get_sellers?profile_id=' +
        userDetail.profile_id +
        '&type=saved' +
        '&page_number=' +
        page.toString(),

      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        setpage(page + 1);
        let users = responseJson;
        setSavedSeller(savedSeller.concat(users));
        setRefreshFlatList(!refreshFlatlist);
        setPageLoader(false);
      })

      .catch(error => {
        setPageLoader(false);
        console.error(error);
      });
  };
  const onEndReachedHandler = () => {
    if (!onEndReachedCalledDuringMomentum.current) {
      loadMoreData();
      onEndReachedCalledDuringMomentum.current = true;
    }
  };



  const loadMoreTasksData = async () => {
    console.log('Reached');
    setPageLoader(true);
    fetch(
      CONSTANT.BaseUrl +
        'sellers/get_sellers?profile_id=' +
        userDetail.profile_id +
        '&type=saved' +
        '&page_number=' +
        taskPage.toString(),

      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        setTaskpage(page + 1);
        let users = responseJson;
        setSavedTask(savedTask.concat(users));
        setLoader(false);
        setPageLoader(false)
        setRefreshFlatList(!refreshFlatlist);
      })

      .catch(error => {
        setLoader(false);
        setPageLoader(false)
        console.error(error);
      });
  };
  const onEndReachedTaskHandler = () => {
    if (!onEndReachedCalledDuringMomentum.current) {
      loadMoreTasksData();
      onEndReachedCalledDuringMomentum.current = true;
    }
  };
  return (
    <SafeAreaView style={styles.globalContainer}>
      <Header
        title={constant.savedItemTitle}
        titleColor={'#1C1C1C'}
        backColor={'#F7F7F7'}
        iconColor={'#1C1C1C'}
      />
      {loader && <Spinner visible={true} color={'#000'} />}

      <View style={styles.savedItemMainView}>
        <TouchableOpacity
          onPress={() => setSelectedPlan('sellers')}
          style={[
            styles.savedItemSingleView,
            {
              backgroundColor: selectedPlan == 'sellers' ? '#fff' : '#F7F7F7',
              borderBottomWidth: selectedPlan == 'sellers' ? 0 : 1,
            },
          ]}>
          <Text
            style={[
              styles.savedItemSingleViewText,
              {
                color: selectedPlan == 'sellers' ? '#1C1C1C' : '#999999',
              },
            ]}>
           {constant.savedItemSellers}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedPlan('tasks')}
          style={[
            styles.savedItemSingleView,
            {
              backgroundColor: selectedPlan == 'tasks' ? '#fff' : '#F7F7F7',
              borderBottomWidth: selectedPlan == 'tasks' ? 0 : 1,
            },
          ]}>
          <Text
            style={[
              styles.savedItemSingleViewText,
              {
                color: selectedPlan == 'tasks' ? '#1C1C1C' : '#999999',
              },
            ]}>
            {constant.savedItemTasks}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <ScrollView style={{flexDirection: 'column'}}> */}
      {selectedPlan == 'sellers' ? (
        <>
          {!emptyFreelancerList ? (
            <>
              <SwipeListView
                data={savedSeller}
                renderItem={({item, index}) => <FreelancerCard item={item} />}
                onEndReached={() => onEndReachedHandler()}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => {
                  onEndReachedCalledDuringMomentum.current = false;
                }}
                renderHiddenItem={({item, index}) => (
                  <View
                    style={styles.savedItemHiddenConatiner}>
                    <TouchableOpacity
                      onPress={() =>
                        RemoveToSaveList('sellers', item.profile_id)
                      }>
                      <Feather
                        style={{
                          margin: 5,
                          padding: 15,
                          backgroundColor: '#EF4444',
                        }}
                        name={'trash-2'}
                        size={28}
                        color={'#fff'}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                leftOpenValue={0}
                rightOpenValue={-75}
              />
              {pageLoader == true && (
                <View style={{marginBottom: 20}}>
                  <BarIndicator count={5} size={20} color={'#0A0F26'} />
                </View>
              )}
            </>
          ) : (
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
          )}
        </>
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
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
            }
            data={savedTask}
            keyExtractor={(x, i) => i.toString()}
            extraData={refreshFlatlist}
            onEndReached={() => onEndReachedTaskHandler()}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum.current = false;
            }}
            renderItem={({item, index}) => (
              <TaskCard
                imageWidth={'100%'}
                showRemoveBtn={true}
                item={item}
                RemoveItem={RemoveToSaveList}
              />
            )}
          />
          {pageLoader == true && (
            <View style={{marginBottom: 20}}>
              <BarIndicator count={5} size={20} color={'#0A0F26'} />
            </View>
          )}
        </>
      )}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default savedItem;
