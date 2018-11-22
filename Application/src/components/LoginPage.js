import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../actions/auth';

const startUserLogin = (props, userType) => {
  props.startLogin(userType);
}

export const LoginPage = (props) => (
  <div className="login-background">
    <Link to="/" className="button button--skip">Skip Login</Link>
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Food Truck Fiesta!</h1>
        <p>Check out your favorite food trucks!</p>
        <button onClick={startUserLogin.bind(null, props, 'customer')} className="button">Login as User</button>
        <button onClick={startUserLogin.bind(null, props, 'vendor')} className="button button--margin">Login as Vendor</button>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: (userType) => dispatch(startLogin(userType))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
