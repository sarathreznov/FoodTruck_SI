import React from 'react';
import Modal from 'react-modal';

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
    <div className="update-details-modal__body">
      <input
        type="text"
        placeholder="Food Truck Name"
        className="text-input"
        value = {props.foodtruckname}
      />
      <input
        type="text"
        placeholder="Location"
        className="text-input"
        value = {props.location}
      />
      <input
        type="text"
        placeholder="Phone"
        className="text-input"
        value = {props.phone}
      />
      <input
        type="text"
        placeholder="Opens At"
        className="text-input"
        value = {props.openingHrs}
      />
      <input
        type="text"
        placeholder="Closes At"
        className="text-input"
        value = {props.closingHrs}
      />
      <input
        type="text"
        placeholder="Open on weekends?"
        className="text-input"
        value = {props.isWorkingWeekEnd}
      />
  </div>
    <button className="button" onClick={props.handleClearModal}>Update Details</button>
  </Modal>
);

export default VendorUpdateDetailsModal;
