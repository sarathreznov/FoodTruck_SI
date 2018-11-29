import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const FoodTruckList = (props) => (

  <div className="dashboard">
    {
      props.visibleFoodTrucks.map((foodtruck, index) => {
        const subscribed = props.subscribedFoodTrucks[foodtruck.vendorusername];
        return (
    
            <Card className = "dashboard__link" key = {index}>
            <Link to={`/foodtruckinfopage/${foodtruck.vendorusername}`}>
             <CardImg top width="100%" src={foodtruck.imageUrl} alt="Card image cap" />
           </Link>
              <CardBody>
                <CardText><strong>{foodtruck.foodtruckname}</strong></CardText>
                <CardTitle>{foodtruck.operatingLoc}</CardTitle>
                <CardSubtitle>{foodtruck.openingHrs} - {foodtruck.closingHrs}</CardSubtitle>
                {
                  props.userType === 'customer' ?
                  <Button onClick={
                    !subscribed ? () => props.subscribeToFoodTruck(props.email, foodtruck.email)
                    : () => props.unsubscribeFromFoodTruck(props.email, foodtruck.email)
                  }
                          outline color="danger"
                          active={subscribed ? true : false}>
                          {subscribed ? 'Unsubscribe' : 'Subscribe'}
                  </Button>
                  : ''
                }
              </CardBody>
            </Card>

        );
      }
    )
    }
    </div>
);

export default FoodTruckList;
