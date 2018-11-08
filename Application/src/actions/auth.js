import { firebase, googleAuthProvider } from '../firebase/firebase';
import axios from 'axios';
const url = 'http://localhost:3000';

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
      // dispatch(getVendorDetails(userInfo.email));
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

export const getVendorDetails = (userEmail) => {
  return (dispatch, getState) => {
      return axios({
        method: 'get',
        url: `${url}/vendors/${userEmail}`
      }).then(function(response) {
        if(response){
          const foodtruckname = response.data.result.foodtruckname;
          const location = response.data.result.operatingLoc;
          const phone = response.data.result.businessPhone;
          const openingHrs = response.data.result.openingHrs;
          const closingHrs = response.data.result.closingHrs;
          const isWorkingWeekEnd = response.data.result.isWorkingWeekEnd;
          const menuUrl = response.data.result.menu1url;
          const vendorDetails = {
            foodtruckname,
            location,
            phone,
            openingHrs,
            closingHrs,
            isWorkingWeekEnd,
            menuUrl
          };
          dispatch(addVendorSpecificDetails(vendorDetails));
        }
    });
};
};

export const addVendorSpecificDetails = ({
  foodtruckname,
  location,
  phone,
  openingHrs,
  closingHrs,
  isWorkingWeekEnd,
  menuUrl
}) => ({
  type: 'ADD_VENDOR_DETAILS',
    foodtruckname,
    location,
    phone,
    openingHrs,
    closingHrs,
    isWorkingWeekEnd,
    menuUrl
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
    // window.location = "https://mail.google.com/mail/u/0/?logout&hl=en";
    // document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost/GoogleVue4";
  }).catch(function (error) {
    console.log(error);
  });
  };
};

// firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });
