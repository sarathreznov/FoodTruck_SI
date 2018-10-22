import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../actions/auth';

export const LoginPage = (props) => (
  <div className="login-background">
    <Link to="/" className="button button--skip">Skip Login</Link>
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Food Truck App!</h1>
        <p>Check out your favorite food trucks!</p>
        <button onClick={props.startLogin} className="button">Login as User</button>
        <button onClick={props.startLogin} className="button button--margin">Login as Vendor</button>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
