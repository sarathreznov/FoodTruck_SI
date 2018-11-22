import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import Header from './Header';
import Search from './Search';
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
    console.log('events in dashboard', subscribedEvents);
    const subscribedFoodtrucks = this.props.subscribedFoodtrucks;
    console.log(subscribedFoodtrucks);
    const hashSubscribedFoodtrucks = {};
    if(subscribedFoodtrucks){
      for(let foodtruck of subscribedFoodtrucks){
        hashSubscribedFoodtrucks[foodtruck.vendorusername] = true;
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
          onSearchLocationChange = {this.onSearchLocationChange}/>
        <div className="dashboard">
          {
            visibleFoodTrucks.map((foodtruck, index) => (
              <Card key = {index} className = "dashboard__cards" >
                <CardImg top width="100%" src={foodtruck.imageUrl} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{foodtruck.vendorusername}</CardTitle>
                  <CardTitle>{foodtruck.foodtruckname}</CardTitle>
                  <CardSubtitle>{foodtruck.openingHrs} - {foodtruck.closingHrs}</CardSubtitle>
                  <CardText>{foodtruck.operatingLoc}</CardText>
                  {
                    this.props.userType === 'customer' ?
                    <Button onClick={() => this.subscribeToFoodTruck(this.props.email, foodtruck.email)}
                            outline color="danger"
                            active={hashSubscribedFoodtrucks[foodtruck.vendorusername] ? true : false}>
                            Subscribe
                    </Button> : ''
                  }
                </CardBody>
              </Card>
            ))
          }
          </div>
        </div>
        {this.props.userType === 'customer' ?
        <div className="event-container">

          <p className="event__title">Events coming up soon!</p>
          {
            subscribedEvents.map((event, index) => (
              <Card key = {index} className = "event__cards" >
                <CardImg top width="100%" src={event.eventImage} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{event.vendorusername}</CardTitle>
                  <CardTitle>{event.eventTitle}</CardTitle>
                  <CardTitle>
                    {moment(event.eventStartDate).format('MMMM Do, YYYY')} -
                    {moment(event.eventEndDate).format('MMMM Do, YYYY')}
                  </CardTitle>
                  <CardSubtitle>{event.eventDescription}</CardSubtitle>
                </CardBody>
              </Card>
            ))
          }
        </div>
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
