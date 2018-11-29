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
      <div className="profile-group-column">
        <input
          type="text"
          placeholder="Event Name"
          className="event-input"
          name="eventTitle"
        />

        <input
          type="text"
          placeholder="Event Description"
          className="event-input"
          name="eventDescription"
        />

        <label htmlFor="eventImage" className="button button--modal">Event Image</label>
        <div className = "image-inputs">


        <div className = "image-input-div profile-group-column">
          <label htmlFor="startsAt">Starts At:</label>
          <DateTimePicker
            onChange={props.onStartDateChange}
            value={props.startDate}
            calendarClassName = "image-input"
            clockClassName = "image-input"
            className = "image-input"
            id="startsAt"
          />
        </div>

        <div className = "image-input-div profile-group-column">
          <label htmlFor="endsAt">Ends At:</label>
          <DateTimePicker
            onChange={props.onEndDateChange}
            value={props.endDate}
            calendarClassName = "image-input"
            clockClassName = "image-input"
            className = "image-input"
            id="endsAt"
          />
        </div>
        </div>
        <FileCreationPage
          onImageChanged = {props.onEventImageChanged}
          id = "eventImage"
        />

        <button type="submit" className="button" onClick={props.handleClearModal}>Create Event!</button>
      </div>
    </form>

  </Modal>
);

export default VendorEventCreationModal;
