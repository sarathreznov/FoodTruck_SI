import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const FoodTruckList = (props) => (

  <div className="dashboard">
    {
      props.visibleFoodTrucks.map((foodtruck, index) => (
        <Card key = {index} className = "dashboard__cards" >
          <CardImg top width="100%" src={foodtruck.imageUrl} alt="Card image cap" />
          <CardBody>
            <CardTitle>{foodtruck.vendorusername}</CardTitle>
            <CardTitle>{foodtruck.foodtruckname}</CardTitle>
            <CardSubtitle>{foodtruck.openingHrs} - {foodtruck.closingHrs}</CardSubtitle>
            <CardText>{foodtruck.operatingLoc}</CardText>
            {
              props.userType === 'customer' ?
              <Button onClick={() => props.subscribeToFoodTruck(props.email, foodtruck.email)}
                      outline color="danger"
                      active={props.subscribedFoodTrucks[foodtruck.vendorusername] ? true : false}>
                      Subscribe
              </Button> : ''
            }
          </CardBody>
        </Card>
      ))
    }
    </div>
);

export default FoodTruckList;
