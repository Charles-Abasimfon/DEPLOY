import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import styles from '../../style/styles';
import Feather from 'react-native-vector-icons/Feather';
import FormButton from '../../components/FormButton';
import {useIsFocused} from '@react-navigation/native';
import FreelancerCard from './homeCards/freelancerCard';
import TaskCard from './homeCards/taskCard';
import CategoryCard from './homeCards/categoryCard';
import SelectonCategoryCard from './homeCards/SkelectonCategoryCard';
import SkeletonFreelancerCard from './homeCards/SkeletonFreelancerCard';
import SkeletonTaskCard from './homeCards/SkeletonTaskCard';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../components/Header';
import * as CONSTANT from '../../constants/globalConstants';
import RBSheet from 'react-native-raw-bottom-sheet';
import {decode} from 'html-entities';
import * as constant from '../../constants/translation';

const Home = ({navigation, route}) => {
  const isFocused = useIsFocused();

  const [text, setText] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState('');
  const [selectedCategoriesSlug, setSelectedCategoriesSlug] = useState('');
  const [freelancers, setFreelancers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [categoriesSpinner, setCategoriesSpinner] = useState(true);
  const [hideCategory, setHideCategory] = useState(false);
  const [loader, setLoader] = useState(false);
  const [hideFreelancer, setHideFreelancer] = useState(false);
  const [hideTaskCard, setHideTaskCard] = useState(false);
  const [freelancerSpinner, setFreelancerSpinner] = useState(true);
  const [taskCardSpinner, setTaskCardSpinner] = useState(true);
  const rbSheet = useRef();

  useEffect(() => {
    getCategories();
    getFreelancers();
    getSettings();
    getTasks();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getsavedItems('sellers');
      getsavedItems('tasks');
      getVerification();
      userBalance();
      setSelectedCategories('');
      setText('');
      getSettings();
    }
  }, [isFocused]);

  const userBalance = () => {};

  const getSettings = async () => {};

  const getVerification = () => {
    // setLoader(true);
  };

  const getsavedItems = async type => {
    var savedSellers = [];
    var savedTasks = [];
  };

  const getCategories = async () => {};

  const getFreelancers = async () => {};

  const getTasks = async () => {};

  const handelSelectedCategory = value => {
    setSelectedCategories(decode(value.name));
    setSelectedCategoriesSlug(value.slug);
    rbSheet.current.close();
  };

  const handelSearchItem = text => {
    const formattedQuery = text.toLowerCase();
    const newData = categories.filter(item => {
      return item.name.toLowerCase().includes(formattedQuery);
    });
    setSearchCategories(newData);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <StatusBar
        backgroundColor="#0A0F26"
        barStyle="light-content"
      /> */}
      <Header
        title={constant.homeTitle}
        titleColor={'#FFFFFF'}
        backColor={'#0A0F26'}
        iconColor={'#FFFFFF'}
      />
      {loader && <Spinner visible={true} color={'#000'} />}
      <ScrollView
        contentContainerStyle={{width: '100%'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.homeTextContainer}>
          <Text style={styles.homeTextStyle}>
            {constant.homeWorkTogether} {'\n'}
            <Text style={styles.homeTextStyleTwo}>
              {constant.homeOpportunities}
            </Text>
          </Text>
          <View style={styles.homeSearchParentInputStyle}>
            <Feather
              style={styles.homeSearchIconStyle}
              name={'search'}
              size={20}
              color={'#999999'}
            />
            <TextInput
              style={styles.homeSearchInputStyle}
              placeholderTextColor={'#999999'}
              onChangeText={text => setText(text)}
              value={text}
              placeholder={constant.homeLookingFor}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.homeSearchCateogryParentStyle}
            onPress={() => rbSheet.current.open()}>
            <Feather
              style={styles.homeSearchIconStyle}
              name={'layers'}
              size={20}
              color={'#999999'}
            />

            {selectedCategories == '' ? (
              <Text style={styles.homeSearchCateogryTextStyle}>
                {constant.homeSelectCategory}
              </Text>
            ) : (
              <Text style={styles.homeSearchSelectedCateogryText}>
                {selectedCategories}
              </Text>
            )}

            <Feather
              style={styles.homeSearchIconStyle}
              name={'chevron-right'}
              size={20}
              color={'#999999'}
            />
          </TouchableOpacity>
          <View style={{marginVertical: 10}}>
            <FormButton
              buttonTitle={constant.homeSearch}
              backgroundColor={CONSTANT.primaryColorTwo}
              textColor={'#fff'}
              onPress={() =>
                navigation.navigate('searchResult', {
                  text: text,
                  location: '',
                  sellerType: [],
                  englishLevel: [],
                  sellerType: selectedCategoriesSlug,
                })
              }
            />
          </View>
        </View>

        {!hideCategory && (
          <>
            <View style={styles.homeCatParentStyle}>
              <Text style={styles.homeCatHeadingTextStyle}>
                {constant.homeExploreCategories}
              </Text>
              {/* <Text
                style={[styles.homeCatExploreTextStyle, {color: '#1DA1F2'}]}>
                Explore all
              </Text> */}
            </View>
            {categoriesSpinner ? (
              <View style={{flexDirection: 'row', padding: 10}}>
                <SelectonCategoryCard />
                <SelectonCategoryCard />
                <SelectonCategoryCard />
                <SelectonCategoryCard />
              </View>
            ) : (
              <View style={{flexDirection: 'row', padding: 10}}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={categories}
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity activeOpacity={0.9}>
                      {item.parent == 0 && <CategoryCard item={item} />}
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            <View style={styles.homeFreelancerUnderLine} />
          </>
        )}
        {!hideFreelancer && (
          <>
            <View
              style={{
                padding: 10,
              }}>
              <Text style={styles.homeCatHeadingTextStyle}>
                {constant.homeVerifiedFreelancers}
              </Text>
            </View>
            {freelancerSpinner ? (
              <>
                <SkeletonFreelancerCard />
                <SkeletonFreelancerCard />
                <SkeletonFreelancerCard />
                <SkeletonFreelancerCard />
              </>
            ) : (
              <>
                <FlatList
                  scrollEnabled={false}
                  data={freelancers}
                  ListFooterComponent={
                    <View style={{margin: 10}}>
                      <FormButton
                        buttonTitle={'Explore all freelancers'}
                        backgroundColor={'#F7F7F7'}
                        textColor={'#1C1C1C'}
                        iconName={'arrow-right'}
                        onPress={() =>
                          navigation.navigate('searchResult', {
                            text: '',
                            location: '',
                            sellerType: [],
                            englishLevel: [],
                          })
                        }
                      />
                    </View>
                  }
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity activeOpacity={0.1}>
                      <FreelancerCard item={item} />
                    </TouchableOpacity>
                  )}
                />
              </>
            )}
          </>
        )}
        {!hideTaskCard && (
          <>
            <View
              style={{
                padding: 10,
              }}>
              <Text style={styles.homeCatHeadingTextStyle}>
                {constant.homePostedTasks}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              {taskCardSpinner ? (
                <>
                  <SkeletonTaskCard widthval={190} mainWidth={190} />
                  <SkeletonTaskCard widthval={190} mainWidth={190} />
                  <SkeletonTaskCard widthval={190} mainWidth={190} />
                  <SkeletonTaskCard widthval={190} mainWidth={190} />
                  <SkeletonTaskCard widthval={190} mainWidth={190} />
                  <SkeletonTaskCard widthval={190} mainWidth={190} />
                </>
              ) : (
                <>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={tasks}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({item, index}) => (
                      <TouchableOpacity activeOpacity={0.9}>
                        <TaskCard
                          imageWidth={160}
                          widthValue={160}
                          item={item}
                        />
                      </TouchableOpacity>
                    )}
                  />
                </>
              )}
            </View>
            <View style={{margin: 10}}>
              <FormButton
                buttonTitle={constant.homeExploreAll}
                backgroundColor={'#F7F7F7'}
                textColor={'#1C1C1C'}
                iconName={'arrow-right'}
                onPress={() =>
                  navigation.navigate('searchResultTask', {
                    text: '',
                    location: '',
                    category: '',
                    sub_category: '',
                    services: [],
                    max: '',
                    min: '',
                  })
                }
              />
            </View>
          </>
        )}
      </ScrollView>
      <RBSheet
        ref={rbSheet}
        height={Dimensions.get('window').height * 0.75}
        duration={250}
        customStyles={{
          container: {
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: 'transparent',
          },
        }}>
        <View style={styles.RBSheetParentStyle}>
          <View style={styles.RBSheetheaderStyle}>
            <Feather
              onPress={() => rbSheet.current.close()}
              style={styles.RBSheetCloseIconStyle}
              name={'arrow-left'}
              size={20}
              color={'#1C1C1C'}
            />
            <Text style={styles.RBSheetHeaderTextStyle}>
              {constant.homeSelectCategory}
            </Text>
          </View>
          <TouchableOpacity style={styles.homeRBSheetSearchStyle}>
            <Feather
              style={{textAlign: 'center'}}
              name={'search'}
              size={20}
              color={'#999999'}
            />
            <TextInput
              style={styles.homeRBSheetSearchTextStyle}
              placeholderTextColor={'#999999'}
              onChangeText={handelSearchItem}
              placeholder={constant.homeSearchCategory}
            />
          </TouchableOpacity>
          <FlatList
            style={{paddingHorizontal: 30}}
            showsVerticalScrollIndicator={true}
            data={searchCategories}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity activeOpacity={0.3}>
                  {item.parent == 0 && (
                    <Text
                      style={styles.homeRBSheetListTextStyle}
                      onPress={() => handelSelectedCategory(item)}>
                      {decode(item.name)}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default Home;
