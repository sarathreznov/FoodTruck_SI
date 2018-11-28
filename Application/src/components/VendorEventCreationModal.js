import React from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

import FileCreationPage from './FileCreationPage';

 const VendorEventCreationModal = (props) => (
  <Modal
    isOpen = {props.openModal}
    onRequestClose = {props.handleClearModal}
    contentLabel = "Create event"
    ariaHideApp={false}
    closeTimeoutMS={200}
    className="update-details-modal"
    >
    <h1 className="update-details-modal__title">Create event!</h1>
    <form className="update-details-modal__body" onSubmit={props.onEventFormSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        className="text-input"
        name="eventTitle"
      />

      <DateTimePicker
        onChange={props.onStartDateChange}
        value={props.startDate}
        calendarClassName = "text-input"
      />

      <DateTimePicker
        onChange={props.onEndDateChange}
        value={props.endDate}
        calendarClassName = "text-input"
      />

      <input
        type="text"
        placeholder="Event Description"
        className="text-input"
        name="eventDescription"
      />

      <label htmlFor="eventImage" className="button">Event Image</label>
      <FileCreationPage
        onImageChanged = {props.onEventImageChanged}
        id = "eventImage"
      />

      <button type="submit" className="button" onClick={props.handleClearModal}>Create Event!</button>
  </form>

  </Modal>
);

export default VendorEventCreationModal;
