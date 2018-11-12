import React from 'react';
import { connect } from 'react-redux';

export const Search = (props) => (

  <div className="input-group">
    <div className="input-group__item">
      <input
        type="text"
        className="text-input text-input--alt"
        value={props.searchText}
        onChange ={props.onSearchTextChange}
        placeholder="Search foodtrucks"
      />
    </div>
    <div className="input-group__item">
      <select
        className="select"
        value={props.searchLocation}
        onChange={props.onSearchLocationChange}>
        <option value="all">All</option>
        <option value="atkins">Atkins</option>
        <option value="student union">Student Union</option>
      </select>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Search);
