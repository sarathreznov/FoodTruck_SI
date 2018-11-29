import React from 'react';
import { connect } from 'react-redux';

import SubscribedFoodTrucks from './SubscribedFoodTrucks';

export class CustomerProfilePage extends React.Component {

  render(){
    const imageUrl = this.props.imageUrl;
    const name = this.props.name;
    const email = this.props.email;
    const userType = this.props.userType;
    const subscribedFoodTrucks = this.props.subscribedFoodTrucks;
    const foodtrucks = this.props.foodtrucks;
    const subscribedFoodTruckDetails = [];
    const hashSubscribedFoodTrucks = {};
    if(subscribedFoodTrucks){
      for(let foodtruck of subscribedFoodTrucks){
        hashSubscribedFoodTrucks[foodtruck.vendorusername] = true;
      }
    }
    for(let foodtruck of foodtrucks){
      if(hashSubscribedFoodTrucks[foodtruck.vendorusername]){
        subscribedFoodTruckDetails.push(foodtruck);
      }
    }

    return (
      <div className="content-container">
        <div className="profile-group-row-user">
          <img className="profileImage" src={imageUrl} />
          <div className="profile-group-column--user">
            <h2 className="profile-group-column__item">{name}</h2>
            <h4 className="profile-group-column__item"><strong>email:</strong> {email}</h4>
          </div>
        </div>
        <div className="profile-group-column">
          <h4 className="profile-group-column__item">My favorite food trucks</h4>
          <SubscribedFoodTrucks
            subscribedFoodTrucks = {subscribedFoodTruckDetails}
          />
        </div>
      </div>
    )
  }
}

  const mapStateToProps = (state) => ({
    imageUrl: state.auth.userInfo.photoURL,
    name: state.auth.userInfo.displayName,
    email: state.auth.userInfo.email,
    userType: state.auth.userType,
    subscribedFoodTrucks: state.events.subscribedFoodtrucks,
    foodtrucks: state.foodTrucks.foodtrucks
  });

  export default connect(mapStateToProps)(CustomerProfilePage);
