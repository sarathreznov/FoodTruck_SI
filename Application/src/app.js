import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { login, logout, addCurrentUser, getVendorDetails } from './actions/auth';
import { fetchAllFoodtrucks,  } from './actions/foodtrucks';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';



const store = configureStore();

const jsx = (
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);
let hasRendered = false;

const renderApp = () => {
  if(!hasRendered){
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    let token;
    user.getIdToken().then(function(accessToken) {
      token = accessToken;
    });
    store.dispatch(login(user.uid));
    let userType = JSON.parse(localStorage.getItem('userType'));
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let firstTimeUser = JSON.parse(localStorage.getItem('firstTimeUser'));
    if(userType && userInfo){
      store.dispatch(addCurrentUser({
        userType,
        token,
        userInfo,
        firstTimeUser
      }));

    if(userType === 'vendor'){
      store.dispatch(getVendorDetails(userInfo.email));
    }
  }
    // store.dispatch(fetchAllFoodtrucks(

    store.dispatch(fetchAllFoodtrucks()).then(() => {
      renderApp();
      if(history.location.pathname.toLowerCase() === '/customerprofile' && userType === 'vendor'){
        history.push('/');
      }
      if(history.location.pathname.toLowerCase() === '/vendorprofile' && userType === 'customer'){
        history.push('/');
      }
    });
  }
  else {
    store.dispatch(logout());
    localStorage.removeItem('userType');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('firstTimeUser');
    store.dispatch(fetchAllFoodtrucks()).then(() => {
      renderApp();
    });
  }
});
