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
      props.subscribedEvents.filter((event) => moment().diff(moment(event.eventEndDate), 'days')<0).map((event, index) => (
        <Card key = {index} className = "event__cards" >
          <CardImg top width="100%" src={event.eventImage} alt="Card image cap" />
          <CardBody>
            <CardText><strong>{event.eventTitle}</strong></CardText>
            <CardText>
              <strong>
                {moment(event.eventStartDate, 'YYYYMMDDTHHmmss').format('MMM Do, YYYY')} -
                {moment(event.eventEndDate, 'YYYYMMDDTHHmmss').format('MMM Do, YYYY')}
              </strong>
            </CardText>
            <a className = "button button--modal" href = {"http://www.google.com/calendar/event?action=TEMPLATE&text="+ event.eventTitle
                   + "&dates=" + event.eventStartDate + "/" + event.eventEndDate + "&details=" + event.eventDescription
                   + "&location="+ "Student Union" + "&trp=false&sprop=&sprop=name:"} target='_blank'>Add to calender</a>
          </CardBody>
        </Card>
      ))
    }
  </div>
);

export default Events;
