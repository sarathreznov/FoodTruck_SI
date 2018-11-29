import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const SubscribedFoodTrucks = (props) => (

  <div className="dashboard">
    {
      props.subscribedFoodTrucks.map((foodtruck, index) => {
        return (
          <Card key = {index} className = "dashboard__subscribed-cards" >
            <CardImg top width="100%" src={foodtruck.imageUrl} alt="Card image cap" />
            <CardBody>
              <CardText>{foodtruck.foodtruckname}</CardText>
              <CardSubtitle>{foodtruck.vendorusername}</CardSubtitle>
            </CardBody>
          </Card>
        );
      }
    )
    }
    </div>
);

export default SubscribedFoodTrucks;
