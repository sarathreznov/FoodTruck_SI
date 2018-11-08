import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuthenticated,
  userType,
  allowedUserType,
  component: Component,
  ...rest
 }) => (
  <Route {...rest} component={(props) => (
     isAuthenticated && userType===allowedUserType  ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  userType: state.auth.userType
});

export default connect(mapStateToProps)(PrivateRoute);
