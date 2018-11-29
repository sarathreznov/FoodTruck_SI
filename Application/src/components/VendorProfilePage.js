import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import VendorUpdateDetailsModal from './VendorUpdateDetailsModal';
import FileCreationPage from './FileCreationPage';
import VendorEventCreationModal from './VendorEventCreationModal';
import { createNewEvent, uploadImageToS3, uploadMenuImagesToS3 } from '../actions/events';
import { updateVendorDetails } from '../actions/auth';

export class VendorProfilePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      openEventModal: undefined,
      openModal: undefined,
      file: null,
      menu1: props.menu1Url,
      menu2: props.menu2Url,
      startDate: new Date(),
      endDate: new Date(),
      email: props.email,
      foodtruckname : props.foodtruckname,
      location : props.location,
      address : props.address,
      phone : props.phone,
      openingHrs : props.openingHrs,
      closingHrs : props.closingHrs,
      isWorkingWeekEnd : props.isWorkingWeekEnd
    };
  }

  onFoodTruckNameChange = (e) => {
    const foodtruckname = e.target.value;
    this.setState(()=>({ foodtruckname }));
  };

  onLocationChange = (e) => {
    const location = e.target.value;
    this.setState(()=>({ location }));
  };

  onPhoneChange = (e) => {
    const phone = e.target.value;
    this.setState(()=>({ phone }));
  };

  onOpeningHrsChange = (openingHrs) => {
    this.setState(()=>({ openingHrs }));
  };

  onClosingHrsChange = (closingHrs) => {
    this.setState(()=>({ closingHrs }));
  };

  onIsWorkingWeekEndChange = (e) => {
    const isWorkingWeekEnd = e.target.value;
    this.setState(()=>({ isWorkingWeekEnd }));
  };

  onAddressChange = (e) => {
    const address = e.target.value;
    this.setState(()=>({ address }));
  };

  onVendorDetailsSubmit = (e)  => {
    e.preventDefault();
    const vendorusername = this.state.email;
    const foodtruckname = this.state.foodtruckname;
    const location = this.state.location;
    const address = this.state.address;
    const phone = this.state.phone;
    const openingHrs = this.state.openingHrs;
    const closingHrs = this.state.closingHrs;
    const isWorkingWeekEnd = this.state.isWorkingWeekEnd;
    const menu1 = this.state.menu1;
    const menu2 = this.state.menu2;
    this.props.uploadMenuImagesToS3(menu1, menu2, vendorusername).then((menus) => {
      this.props.updateVendorDetails({
        vendorusername,
        foodtruckname,
        location,
        address,
        phone,
        openingHrs,
        closingHrs,
        isWorkingWeekEnd,
        menu1: menus[0],
        menu2: menus[1]
      })
    })
    .then((message) => console.log("Updated"))
    .catch((e) => {console.log('Something went wrong', e)});
  };

  openModalView = () => {
    this.setState(() => ({openModal: true}));
  };

  openEventModalView = () => {
    this.setState(() => ({openEventModal: true}));
  }

  handleClearModal = () => {
    this.setState(() => ({openModal: undefined}));
  };

  handleClearEventModal = () => {
    this.setState(() => ({openEventModal: undefined}));
  };

  onEventImageChanged = (e) => {
    const file = e.target.files[0];
    this.setState(() => ({file}));
  };

  onMenu1ImageChanged = (e) => {
    const menu1 = e.target.files[0];
    this.setState(() => ({menu1}));
  };

  onMenu2ImageChanged = (e) => {
    const menu2 = e.target.files[0];
    this.setState(() => ({menu2}));
  };

  onStartDateChange = date => this.setState({ startDate : date });

  onEndDateChange = date => this.setState({ endDate : date });

  onEventFormSubmit = (e) => {
    e.preventDefault();
    const eventTitle = e.target.elements.eventTitle.value.trim();
    const eventDescription = e.target.elements.eventDescription.value.trim();
    const eventStartDate = moment(this.state.startDate).format('YYYYMMDDTHHmmss');
    const eventEndDate = moment(this.state.endDate).format('YYYYMMDDTHHmmss');
    const eventImageFile = this.state.file;
    this.props.uploadImageToS3(eventImageFile, this.props.email).then((imageUrl) => {
      return this.props.createNewEvent({
      vendorusername: this.props.email,
      eventTitle,
      eventDescription,
      eventStartDate,
      eventEndDate,
      imageUrl
    });
  })
    .then((message) => console.log(message))
    .catch((e) => {console.log('Something went wrong', e)});
  };

  render(){
    const imageUrl = this.props.imageUrl;
    const name = this.props.name;
    const email = this.state.email;
    const userType = this.props.userType;
    const foodtruckname = this.state.foodtruckname;
    const location = this.state.location;
    const address = this.state.address;
    const phone = this.state.phone;
    const openingHrs = this.state.openingHrs;
    const closingHrs = this.state.closingHrs;
    const isWorkingWeekEnd = this.state.isWorkingWeekEnd;
    const menu1 = this.state.menu1;
    const menu2 = this.state.menu2;
    return (
      <div>
      <div className="content-container">
        <div className="profile-group-column">
          <div className="profile-group-row">
            <img className="profileImage" src={imageUrl} />
            <div className="profile-group-column--user">
              <h1 className="profile-group-column__item"><strong>{foodtruckname}</strong></h1>
              <h2 className="profile-group-column__item"><strong>Email:</strong> {email}</h2>
              <div className="profile-group-row">
              </div>
              <p className="profile-group-smaller-column__item"><strong>Location: </strong> {location}</p>
              <p className="profile-group-smaller-column__item"><strong>Address: </strong> {address}</p>
              <p className="profile-group-smaller-column__item"><strong>Phone: </strong> {phone}</p>
              <p className="profile-group-smaller-column__item"><strong>Time: </strong> {openingHrs} - {closingHrs}</p>
              <p className="profile-group-smaller-column__item"><strong>Open on weekends: </strong> {!isWorkingWeekEnd || isWorkingWeekEnd.toLowerCase() === 'no' || isWorkingWeekEnd.toLowerCase() === 'n' ? 'No' : 'Yes' }</p>
            </div>
          </div>
          <div className="box-layout__box--alternate">
            <button
              className="button button--vendor"
              onClick={this.openModalView}>
              Update details!
            </button>
            <button
              className="button button--vendor"
              onClick={this.openEventModalView}>
              Create Events!
            </button>
          </div>
        </div>
        </div>
        <VendorEventCreationModal
          openModal = {this.state.openEventModal}
          handleClearModal = {this.handleClearEventModal}
          onEventImageChanged = {this.onEventImageChanged}
          onEventFormSubmit = {this.onEventFormSubmit}
          onStartDateChange = {this.onStartDateChange}
          startDate = {this.state.startDate}
          onEndDateChange = {this.onEndDateChange}
          endDate = {this.state.endDate}
        />
        <VendorUpdateDetailsModal
          openModal = {this.state.openModal}
          handleClearModal = {this.handleClearModal}
          foodtruckname = {foodtruckname}
          location = {location}
          address = {address}
          phone = {phone}
          openingHrs = {openingHrs}
          closingHrs = {closingHrs}
          menu1 = {menu1}
          menu2 = {menu2}
          isWorkingWeekEnd = {isWorkingWeekEnd}
          onFoodTruckNameChange = {this.onFoodTruckNameChange}
          onLocationChange = {this.onLocationChange}
          onAddressChange = {this.onAddressChange}
          onPhoneChange = {this.onPhoneChange}
          onOpeningHrsChange = {this.onOpeningHrsChange}
          onClosingHrsChange = {this.onClosingHrsChange}
          onIsWorkingWeekEndChange = {this.onIsWorkingWeekEndChange}
          onVendorDetailsSubmit = {this.onVendorDetailsSubmit}
          onMenu1ImageChanged = {this.onMenu1ImageChanged}
          onMenu2ImageChanged = {this.onMenu2ImageChanged}
          time = {this.state.time}
          onTimeChange = {this.onTimeChange}
        />
        </div>
    )
  }
}

  const mapDispatchToProps = (dispatch) => ({
    createNewEvent: (eventDetails) => dispatch(createNewEvent(eventDetails)),
    uploadImageToS3: (eventImageFile, vendorusername) => dispatch(uploadImageToS3(eventImageFile, vendorusername)),
    uploadMenuImagesToS3: (menu1, menu2, vendorusername) => dispatch(uploadMenuImagesToS3(menu1, menu2, vendorusername)),
    updateVendorDetails: (vendorDetails) => dispatch(updateVendorDetails(vendorDetails))
  });

  const mapStateToProps = (state) => ({
    imageUrl: state.auth.imageUrl,
    email: state.auth.userInfo.email,
    userType: state.auth.userType,
    foodtruckname: state.auth.foodtruckname,
    location: state.auth.location,
    address: state.auth.address,
    phone: state.auth.phone,
    openingHrs: state.auth.openingHrs,
    closingHrs: state.auth.closingHrs,
    isWorkingWeekEnd: state.auth.isWorkingWeekEnd,
    menu1Url: state.auth.menu1Url,
    menu2Url: state.auth.menu2Url
  });

  export default connect(mapStateToProps, mapDispatchToProps)(VendorProfilePage);
