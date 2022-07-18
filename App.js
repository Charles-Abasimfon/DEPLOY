import React, {useState, useEffect} from 'react';
import {AuthContextProvider} from './src/context/auth-context/authContext';
import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './src/screens/drawer/customDrawer';
import Preloader from './src/screens/preloader/preloader';
import Home from './src/screens/home/home';

/* import Signup from './src/screens/auth/signup';
import Login from './src/screens/auth/login';
import LostPassword from './src/screens/auth/lostPassword';
import SearchResult from './src/screens/searchResults/searchResult';
import SearchResultTask from './src/screens/searchResults/searchResultTask';
import NarrowSearch from './src/screens/searchResults/narrowSearch';
import TaskDetail from './src/screens/detailPages/taskDetail';
import OrderDetail from './src/screens/detailPages/orderDetail';
import ProfileDetail from './src/screens/detailPages/profileDetail';
import Earnings from './src/screens/earnings/earnings';
import PayoutHistory from './src/screens/earnings/payoutHistory';
import Invoice from './src/screens/invoices/invoice';
import Dashboard from './src/screens/dashboard/dashboard';
import Task from './src/screens/tasks/tasks';
import ProfileSetting from './src/screens/profileSetting/profileSetting';
import SavedItem from './src/screens/saved/savedItem';
import AvailableTaskDetail from './src/screens/tasks/availableTaskDetail';
import IdentityInformation from './src/screens/profileSetting/identityInformation';
import BillingInformation from './src/screens/profileSetting/billingInformation';
import AccountSetting from './src/screens/profileSetting/accountSetting';
import Disputes from './src/screens/disputes/disputes';
import DisputesDetail from './src/screens/disputes/disputesDetails';
import imagePreview from './src/screens/imagePreview/ImagePreview';
import Checkout from './src/screens/detailPages/Checkout'; */

console.disableYellowBox = true;
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

HomeDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home">
      <Drawer.Screen name="home" component={Home} />
      {/*       <Drawer.Screen name="login" component={Login} />
      <Drawer.Screen name="signup" component={Signup} />
      <Drawer.Screen name="searchResult" component={SearchResult} />
      <Drawer.Screen name="searchResultTask" component={SearchResultTask} />
      <Drawer.Screen name="earnings" component={Earnings} />
      <Drawer.Screen name="payoutHistory" component={PayoutHistory} />
      <Drawer.Screen name="invoice" component={Invoice} />
      <Drawer.Screen name="dashboard" component={Dashboard} />
      <Drawer.Screen name="profileSetting" component={ProfileSetting} />
      <Drawer.Screen
        name="identityInformation"
        component={IdentityInformation}
      />
      <Drawer.Screen name="billingInformation" component={BillingInformation} />
      <Drawer.Screen name="accountSetting" component={AccountSetting} />
      <Drawer.Screen name="task" component={Task} />
      <Drawer.Screen name="savedItem" component={SavedItem} />
      <Drawer.Screen name="disputes" component={Disputes} /> */}
    </Drawer.Navigator>
  );
};

HomeStack = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {showSplash == true ? (
        <Stack.Screen name="preloader" component={Preloader} />
      ) : (
        <>
          <Stack.Screen name="home" component={HomeDrawer} />
          {/*   <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="lostPassword" component={LostPassword} />
          <Stack.Screen name="narrowSearch" component={NarrowSearch} />
          <Stack.Screen name="taskDetail" component={TaskDetail} />
          <Stack.Screen name="orderDetail" component={OrderDetail} />
          <Stack.Screen name="profileDetail" component={ProfileDetail} />
          <Stack.Screen name="profileSetting" component={ProfileSetting} />
          <Stack.Screen name="disputesDetail" component={DisputesDetail} />
          <Stack.Screen name="imagePreview" component={imagePreview} />
          <Stack.Screen name="checkout" component={Checkout} />
          <Stack.Screen
            name="availableTaskDetail"
            component={AvailableTaskDetail}
          /> */}
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <AuthContextProvider>
      <NavigationContainer>{HomeStack()}</NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
