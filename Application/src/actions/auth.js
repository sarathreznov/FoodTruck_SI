import { firebase, googleAuthProvider } from '../firebase/firebase';
import axios from 'axios';
const url = process.env.URL;
import { fetchAllSubscribedFoodtrucks, fetchAllSubscribedEvents } from './events';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = (userType) => {
  return (dispatch, getState) => {
    let api, userInfo;
    return firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
      api = result.credential.accessToken;
      userInfo = result.user;
      if(userType === 'customer'){
        return saveCustomerToDynamoIfNotPresent(userInfo.email);
      } else if(userType === 'vendor'){
        return saveVendorToDynamoIfNotPresent(userInfo.email);
      }
    }).then((response) => {
      let firstTimeUser;
      if(response){
        firstTimeUser = true;
      }
      else{
        firstTimeUser = false;
      }
      localStorage.setItem('userType', JSON.stringify(userType));
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('firstTimeUser', JSON.stringify(firstTimeUser));
      dispatch(addCurrentUser({
        userType,
        userInfo,
        firstTimeUser
      }));
      if(userType === 'customer'){
        return dispatch(fetchAllSubscribedFoodtrucks(userInfo.email)).then(() => {
          let subscribedFoodtrucks = getState().events.subscribedFoodtrucks;
          return dispatch(fetchAllSubscribedEvents(subscribedFoodtrucks));
        });
      }
      else if(userType === "vendor"){
        dispatch(getVendorDetails(userInfo.email));
      }
    }).catch((e) => {
      console.log('Error in promise chain', e);
    });
  };
};

export const addCurrentUser = ({ userType, token, userInfo, firstTimeUser})=>({
  type: 'ADD_CURRENT_USER',
  userType,
  token,
  userInfo,
  firstTimeUser
});

export const updateVendorDetails = ({
        vendorusername,
        foodtruckname,
        location,
        address,
        phone,
        openingHrs,
        closingHrs,
        isWorkingWeekEnd,
        menu1,
        menu2
      }) => {
    return (dispatch) => {
      return axios({
        method: 'patch',
        url: `${url}/vendors/`,
        data: {
          vendorusername: vendorusername,
          foodtruckname: foodtruckname,
          location: location,
          address: address,
          phone: phone,
          openingHrs: openingHrs,
          closingHrs: closingHrs,
          isWorkingWeekEnd: isWorkingWeekEnd,
          menu1url: menu1,
          menu2url: menu2
        }
      }).then((response) => dispatch(getVendorDetails(vendorusername))
    );
  };
};

export const getVendorDetails = (userEmail) => {
  return (dispatch, getState) => {
      return axios({
        method: 'get',
        url: `${url}/vendors/${userEmail}`
      }).then((response) => {
        if(response){
          const foodtruckname = response.data.result.foodtruckname;
          const location = response.data.result.operatingLoc;
          const address = response.data.result.address;
          const phone = response.data.result.businessPhone;
          const openingHrs = response.data.result.openingHrs;
          const closingHrs = response.data.result.closingHrs;
          const isWorkingWeekEnd = response.data.result.isWorkingWeekEnd;
          const menu1Url = response.data.result.menu1url;
          const menu2Url = response.data.result.menu2url;
          const imageUrl = response.data.result.imageUrl;
          const vendorDetails = {
            foodtruckname,
            location,
            address,
            phone,
            openingHrs,
            closingHrs,
            isWorkingWeekEnd,
            menu1Url,
            menu2Url,
            imageUrl
          };
          return dispatch(addVendorSpecificDetails(vendorDetails));
        }
    });
};
};

export const addVendorSpecificDetails = ({
  foodtruckname,
  location,
  address,
  phone,
  openingHrs,
  closingHrs,
  isWorkingWeekEnd,
  menu1Url,
  menu2Url,
  imageUrl
}) => ({
  type: 'ADD_VENDOR_DETAILS',
    foodtruckname,
    location,
    address,
    phone,
    openingHrs,
    closingHrs,
    isWorkingWeekEnd,
    menu1Url,
    menu2Url,
    imageUrl
});

const saveCustomerToDynamoIfNotPresent = (userEmail) => {
  const userType = 'users';
  return checkIfUserExistsInDynamo(userEmail, userType).then((doesUserExist) => {
    if(!doesUserExist) {
      return axios({
      method: 'post',
      url: `${url}/users/`,
      data: {
        username: userEmail,
        email: userEmail
      }
    });
    }
  }).then(function (response) {
      return response;
    });
};

const saveVendorToDynamoIfNotPresent = (userEmail) => {
  const userType = 'vendors';
  return checkIfUserExistsInDynamo(userEmail, userType).then((doesUserExist) => {
    if(!doesUserExist) {
      return axios({
      method: 'post',
      url: `${url}/vendors/`,
      data: {
        vendorusername: userEmail,
        email: userEmail
      }
    });
    }
  }).then(function (response) {
      return response;
    });
};

const checkIfUserExistsInDynamo = (userEmail, userType) => {
    return axios({
      method: 'get',
      url: `${url}/${userType}/${userEmail}`
    }).then(function(response) {
      if(response.data.result){
        return true;
      } else {
        return false;
      };
  });
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut().then(function () {
    window.location = "https://mail.google.com/mail/u/0/?logout&hl=en";
    // document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost/GoogleVue4";
  }).catch(function (error) {
    console.log(error);
  });
  };
};
