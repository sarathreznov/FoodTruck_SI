import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const SubscribedFoodTrucks = (props) => (

  <div className="dashboard">
    {
      props.subscribedFoodTrucks.map((foodtruck, index) => {
        // const subscribed = props.subscribedFoodTrucks[foodtruck.vendorusername];
        return (
          <Card key = {index} className = "dashboard__cards" >
            <CardImg top width="100%" src={foodtruck.imageUrl} alt="Card image cap" />
            <CardBody>
              <CardTitle>{foodtruck.vendorusername}</CardTitle>
              <CardTitle>{foodtruck.foodtruckname}</CardTitle>
              <CardSubtitle>{foodtruck.openingHrs} - {foodtruck.closingHrs}</CardSubtitle>
              <CardText>{foodtruck.operatingLoc}</CardText>
              {/* {
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
              } */}
            </CardBody>
          </Card>
        );
      }
    )
    }
    </div>
);

export default SubscribedFoodTrucks;
