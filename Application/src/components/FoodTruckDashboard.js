import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import Header from './Header';
import Search from './Search';

export class FoodTruckDashboard extends React.Component {
  state = {
    // SearchText: ''
    searchText: '',
    searchLocation: 'all',
    visibleFoodTrucks: this.props.foodtrucks
  };

  onSearchTextChange = (e) => {
    const searchText = e.target.value;
    this.setState(() => ({ searchText }));
    this.changeVisibleFoodTrucks(searchText, this.state.searchLocation);
  }

  onSearchLocationChange = (e) => {
    const searchLocation = e.target.value;
    this.setState(() => ({ searchLocation }));
    this.changeVisibleFoodTrucks(this.state.searchText, searchLocation);
  }

  changeVisibleFoodTrucks = (text, location) => {
    const visibleFoodTrucks = this.props.foodtrucks.filter((foodtruck) => {

              const operatingLoc = foodtruck.operatingLoc;
              const address = foodtruck.address;
              const foodtruckname = foodtruck.foodtruckname;
              let textMatch, addressMatch;
              if(text !== ''){
                textMatch = foodtruckname ? foodtruckname.toLowerCase().includes(text.toLowerCase()) : false;
              } else {
                textMatch = true;
              }
              if(location !== 'all'){
                addressMatch = operatingLoc ? operatingLoc.toLowerCase().includes(location.toLowerCase()) : false;
              } else {
                addressMatch = true;
              }
              return textMatch && addressMatch;
            });
    this.setState(() => ({visibleFoodTrucks}));
  };

  render(){
    const visibleFoodTrucks = this.state.visibleFoodTrucks;
    return (
      <div>
        <Header />
        <div className="content-container">
        <Search
          searchText = {this.state.searchText}
          onSearchTextChange = {this.onSearchTextChange}
          onSearchLocationChange = {this.onSearchLocationChange}/>
        <div className="dashboard">
          {
            visibleFoodTrucks.map((foodtruck, index) => (
              <Card key = {index} className = "dashboard__cards" >
                <CardImg top width="100%" src={foodtruck.imageUrl} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{foodtruck.foodtruckname || foodtruck.vendorusername}</CardTitle>
                  <CardSubtitle>{foodtruck.openingHrs} - {foodtruck.closingHrs}</CardSubtitle>
                  <CardText>{foodtruck.operatingLoc}</CardText>
                  <Button outline color="danger">Subscribe</Button>
                </CardBody>
              </Card>
            ))
          }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodtrucks: state.foodTrucks.foodtrucks
});

export default connect(mapStateToProps)(FoodTruckDashboard);


//
// Card.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   inverse: PropTypes.bool,
//   color: PropTypes.string,
//   body: PropTypes.bool,
//   className: PropTypes.string
// };
//
// CardBody.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string
// };
//
// CardColumns.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string
// };
//
// CardDeck.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string
// };
//
// CardFooter.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string
// };
//
// CardGroup.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string
// };
//
// CardHeader.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string
// };
//
// CardImg.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string,
//   // Use top or bottom to position image via "card-img-top" or "card-img-bottom"
//   top: PropTypes.bool,
//   bottom: PropTypes.bool
// };
//
// CardImgOverlay.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string
// };
//
// CardLink.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string,
//   // ref will only get you a reference to the CardLink component, use innerRef to get a reference to the DOM element (for things like focus management).
//   innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
// };
//
// CardSubtitle.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string
// };
//
// CardText.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string
// };
//
// CardTitle.propTypes = {
//   // Pass in a Component to override default element
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   className: PropTypes.string
// };
