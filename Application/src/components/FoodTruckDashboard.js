import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Header from './Header';
import Search from './Search';
import Events from './Events';
import FoodTruckList from './FoodTruckList';
import { addToCustomerInterest } from '../actions/events';

export class FoodTruckDashboard extends React.Component {
  state = {
    searchText: '',
    searchLocation: 'all',
    visibleFoodTrucks: this.props.foodtrucks
  };

  onSearchTextChange = (e) => {
    const searchText = e.target.value;
    this.setState(() => ({ searchText }));
    this.changeVisibleFoodTrucks(searchText, this.state.searchLocation);
  }

  onSearchLocationChange = (e) => {
    const searchLocation = e.target.value;
    this.setState(() => ({ searchLocation }));
    this.changeVisibleFoodTrucks(this.state.searchText, searchLocation);
  }

  changeVisibleFoodTrucks = (text, location) => {
    const visibleFoodTrucks = this.props.foodtrucks.filter((foodtruck) => {
    const operatingLoc = foodtruck.operatingLoc;
    const address = foodtruck.address;
    const foodtruckname = foodtruck.foodtruckname;
    let textMatch, addressMatch;
    if(text !== ''){
      textMatch = foodtruckname ? foodtruckname.toLowerCase().includes(text.toLowerCase()) : false;
    } else {
      textMatch = true;
    }
    if(location !== 'all'){
      addressMatch = operatingLoc ? operatingLoc.toLowerCase().includes(location.toLowerCase()) : false;
    } else {
      addressMatch = true;
    }
    return textMatch && addressMatch;
  });
    this.setState(() => ({visibleFoodTrucks}));
  };

  subscribeToFoodTruck = (customer, foodtruck) => {
    this.props.addToCustomerInterest(customer, foodtruck);
  }

  render(){
    const visibleFoodTrucks = this.state.visibleFoodTrucks;
    const events = this.props.events;
    let subscribedEvents = [];
    if(events){
      for(let i = 0; i<events.length; i++){
        for(let j = 0; j<events[i].length;j++){
          subscribedEvents.push(events[i][j]);
        }
      }
    }
    const subscribedFoodTrucks = this.props.subscribedFoodtrucks;

    const hashSubscribedFoodTrucks = {};
    if(subscribedFoodTrucks){
      for(let foodtruck of subscribedFoodTrucks){
        hashSubscribedFoodTrucks[foodtruck.vendorusername] = true;
      }
    }
    return (
      <div>
      <Header />
      <div className="complete-container">
        <div className="content-container">
        <Search
          searchText = {this.state.searchText}
          onSearchTextChange = {this.onSearchTextChange}
          onSearchLocationChange = {this.onSearchLocationChange}
        />
        <FoodTruckList
          visibleFoodTrucks = {visibleFoodTrucks}
          subscribedFoodTrucks = {hashSubscribedFoodTrucks}
          userType = {this.props.userType}
          email = {this.props.email}
          subscribeToFoodTruck = {this.subscribeToFoodTruck}
        />
        </div>
        {(this.props.userType === 'customer' && subscribedEvents.length > 0) ?
          <Events
            subscribedEvents = {subscribedEvents}
          />
          : '' }
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCustomerInterest: (customer, foodtruck) => dispatch(addToCustomerInterest(customer, foodtruck))
})

const mapStateToProps = (state) => ({
  foodtrucks: state.foodTrucks.foodtrucks,
  userType: state.auth.userType,
  email: state.auth.userInfo ? state.auth.userInfo.email : undefined,
  subscribedFoodtrucks: state.auth.userInfo ? state.events.subscribedFoodtrucks : [],
  events: state.events.subscribedEvents
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodTruckDashboard);
