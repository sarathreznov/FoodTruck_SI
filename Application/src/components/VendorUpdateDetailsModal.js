import React from 'react';
import Modal from 'react-modal';
import TimePicker from 'react-time-picker';

import FileCreationPage from './FileCreationPage';

const VendorUpdateDetailsModal = (props) => (
  <Modal
    isOpen = {props.openModal} //Open/Close state of modal depends on this state which is changed to boolean
    onRequestClose = {props.handleClearModal} // Required for closing modal on clicking ESC or outside modal
    contentLabel = "Update details"
    ariaHideApp={false}
    closeTimeoutMS={200} // Required for closing transition of modal
    className="update-details-modal" // Required for overriding css of modal
    >
    <h1 className="update-details-modal__title">Update details</h1>
    <form className="update-details-modal__body" onSubmit={props.onVendorDetailsSubmit}>
      <div className="profile-group-column">
        <input
          type="text"
          placeholder="Food Truck Name"
          className="text-input"
          value = {props.foodtruckname}
          onChange = {props.onFoodTruckNameChange}
        />
        <input
          type="text"
          placeholder="Location"
          className="text-input"
          value = {props.location}
          onChange = {props.onLocationChange}
        />
        <input
          type="text"
          placeholder="Address"
          className="text-input"
          value = {props.address}
          onChange = {props.onAddressChange}
        />
        <input
          type="text"
          placeholder="Phone"
          className="text-input"
          value = {props.phone}
          onChange = {props.onPhoneChange}
        />
        {/* <input
          type="text"
          placeholder="Opens At"
          className="text-input"
          value = {props.openingHrs}
          onChange = {props.onOpeningHrsChange}
        />
        <input
          type="text"
          placeholder="Closes At"
          className="text-input"
          value = {props.closingHrs}
          onChange = {props.onClosingHrsChange}
        /> */}
        <div className = "time-input">
          <TimePicker
            value={props.openingHrs}
            onChange={props.onOpeningHrsChange}
          />
        </div>
        <div className = "time-input">
          <TimePicker
            value={props.closingHrs}
            onChange={props.onClosingHrsChange}
          />
        </div>
        <input
          type="text"
          placeholder="Open on weekends?"
          className="text-input"
          value = {props.isWorkingWeekEnd}
          onChange = {props.onIsWorkingWeekEndChange}
        />
        <label htmlFor="menu1" className="button">Menu Image 1</label>
        <FileCreationPage
          onImageChanged = {props.onMenu1ImageChanged}
          id = "menu1"
        />
        <label htmlFor="menu2" className="button">Menu Image 2</label>
        <FileCreationPage
          onImageChanged = {props.onMenu2ImageChanged}
          id = "menu2"
        />
        <button type="submit" className="button" onClick={props.handleClearModal}>Update Details</button>
      </div>
  </form>

  </Modal>
);

export default VendorUpdateDetailsModal;
