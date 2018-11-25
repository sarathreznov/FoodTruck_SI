import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const Events = (props) => (

  <div className="event-container">
    <p className="event__title">Events coming up soon!</p>
    {
      props.subscribedEvents.map((event, index) => (
        <Card key = {index} className = "event__cards" >
          <CardImg top width="100%" src={event.eventImage} alt="Card image cap" />
          <CardBody>
            <CardTitle>{event.vendorusername}</CardTitle>
            <CardTitle>{event.eventTitle}</CardTitle>
            <CardTitle>
              {moment(event.eventStartDate, 'MM-DD-YYYY').format('MMMM Do, YYYY')} -
              {moment(event.eventEndDate, 'MM-DD-YYYY').format('MMMM Do, YYYY')}
            </CardTitle>
            <CardSubtitle>{event.eventDescription}</CardSubtitle>
          </CardBody>
        </Card>
      ))
    }
  </div>
);

export default Events;
