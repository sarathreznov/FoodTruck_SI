import React from 'react';
import { connect } from 'react-redux';

import VendorUpdateDetailsModal from './VendorUpdateDetailsModal';

export class VendorProfilePage extends React.Component {

  state = {
    openModal: undefined
  };
  // getProfileImage = () => {
  //   this.setState(() => ({photoURL: this.props.imageUrl}));
  // };

  openModalView = () => {
    this.setState(() => ({openModal: true}));
  };

  handleClearModal = () => {
    this.setState(() => ({openModal: undefined}));
  };

  componentDidMount(){
    // this.getProfileImage();
  }

  render(){
    const imageUrl = this.props.imageUrl;
    const name = this.props.name;
    const email = this.props.email;
    const userType = this.props.userType;
    const foodtruckname = this.props.foodtruckname;
    const location = this.props.location;
    const phone = this.props.phone;
    const openingHrs = this.props.openingHrs;
    const closingHrs = this.props.closingHrs;
    const isWorkingWeekEnd = this.props.isWorkingWeekEnd;
    return (
      <div>
      <div className="content-container">
        <div className="profile-group-row">
          <img className="profileImage" src={imageUrl} />
          <div className="profile-group-column">
            <h2 className="profile-group-column__item">{name}</h2>
            <h4 className="profile-group-column__item">Email: {email}</h4>
            <div className="profile-group-row">
              <h4 className="profile-group-row__item">Food Truck details</h4>
              <button className="button button--without-border" onClick={this.openModalView}>Update details</button>
            </div>
            <p className="profile-group-smaller-column__item"><strong>Food Truck Name:</strong> {foodtruckname}</p>
            <p className="profile-group-smaller-column__item"><strong>Location: </strong> {location}</p>
            <p className="profile-group-smaller-column__item"><strong>Phone: </strong> {phone}</p>
            <p className="profile-group-smaller-column__item"><strong>Time: </strong> {openingHrs} - {closingHrs}</p>
            <p className="profile-group-smaller-column__item"><strong>Open on weekends: </strong> {isWorkingWeekEnd ? 'Yes' : 'No' }</p>
          </div>
        </div>
        </div>
        <VendorUpdateDetailsModal
          openModal = {this.state.openModal}
          handleClearModal = {this.handleClearModal}
          foodtruckname = {foodtruckname}
          location = {location}
          phone = {phone}
          openingHrs = {openingHrs}
          closingHrs = {closingHrs}
          isWorkingWeekEnd = {isWorkingWeekEnd}
        />
        </div>

    )
  }
}

  const mapStateToProps = (state) => ({
    imageUrl: state.auth.imageUrl,
    name: state.auth.userInfo.displayName,
    email: state.auth.userInfo.email,
    userType: state.auth.userType,
    foodtruckname: state.auth.foodtruckname,
    location: state.auth.location,
    phone: state.auth.phone,
    openingHrs: state.auth.openingHrs,
    closingHrs: state.auth.closingHrs,
    isWorkingWeekEnd: state.auth.isWorkingWeekEnd,
    menuUrl: state.auth.menuUrl
  });

  export default connect(mapStateToProps)(VendorProfilePage);
