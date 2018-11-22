import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import DashboardPage from '../components/FoodTruckDashboard';
import LoginPage from '../components/LoginPage';
import CustomerProfilePage from '../components/CustomerProfilePage';
import VendorProfilePage from '../components/VendorProfilePage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={DashboardPage} exact={true} />
        <PublicRoute path="/login" component={LoginPage} />
        <PrivateRoute path="/customerprofile" allowedUserType={'customer'} component={CustomerProfilePage} />
        <PrivateRoute path="/vendorprofile" allowedUserType={'vendor'} component={VendorProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
