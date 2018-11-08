import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout, isAuthenticated, userType }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
          <Link className="header__title" to="/">
            <h2>Food Truck Fiesta!</h2>
          </Link>
          {
            isAuthenticated ?
            (
              <div>
                <button onClick={startLogout} className="button button--link">Logout</button>
                {
                  (userType)==='customer' ?
                    (<Link to="/customerprofile" className="button button--link">My Profile</Link>)
                    :
                    (<Link to="/vendorprofile" className="button button--link">Foodtruck Profile</Link>)
                }
              </div>
            )
              :
              <Link to="/login" className="button button--link">Login</Link>
          }
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  userType: state.auth.userType
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
