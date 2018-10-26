import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout, isAuthenticated }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
          <Link className="header__title" to="/">
            <h2>Food Truck App!</h2>
          </Link>
          {
            isAuthenticated ?
              <button onClick={startLogout} className="button button--link">Logout</button>
              :
              <Link to="/login" className="button button--link">Login</Link>
          }
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
// We export the connected version of the component so that we can render
// this version instead wherever we use this component.
