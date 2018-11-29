import React from 'react';
import { connect } from 'react-redux';
import { UncontrolledCarousel} from 'reactstrap';
import Header from './Header';

  export class FoodTruckInfoPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      menu1url: props.foodtruck.menu1url,
      menu2url: props.foodtruck.menu2url,
      foodtruckname: props.foodtruck.foodtruckname,
      email: props.foodtruck.email,
      address: props.foodtruck.address ? props.foodtruck.address : '-',
      phone: props.foodtruck.businessPhone ? props.foodtruck.businessPhone : '-',
      imageUrl: props.foodtruck.imageUrl,
      isWorkingWeekEnd: props.foodtruck.isWorkingWeekEnd,
      openingHrs: props.foodtruck.openingHrs ? props.foodtruck.openingHrs : '11:00',
      closingHrs: props.foodtruck.closingHrs ? props.foodtruck.closingHrs : '23:00',
      location: props.foodtruck.operatingLoc ? props.foodtruck.operatingLoc : '-'
    }
  }

  render(){
    const menu1url = this.state.menu1url;
    const menu2url = this.state.menu2url;
    const imageUrl = this.state.imageUrl;
    const foodtruckname = this.state.foodtruckname;
    const email = this.state.email;
    const address = this.state.address;
    const location = this.state.location;
    const phone = this.state.phone;
    const openingHrs = this.state.openingHrs;
    const closingHrs = this.state.closingHrs;
    const isWorkingWeekEnd = this.state.isWorkingWeekEnd;
    let items = [];
    if(this.state.menu1url && this.state.menu2url){
       items = [
        {
          src: this.state.menu1url,
          altText: 'Slide 1',
          caption: '',
          header: 'Page 1'
        },
        {
          src: this.state.menu2url,
          altText: 'Slide 2',
          caption: '',
          header: 'Page 2'
        }
      ];
    }

    return (
      <div>
        <Header />
        <div className="content-container">
          <div className="profile-group-column">
            <div className="profile-group-row">
              <img className="profileImage" src={imageUrl} />
              <div className="profile-group-column--user">
                <h1 className="profile-group-column__item"><strong>{foodtruckname}</strong></h1>
                <h2 className="profile-group-column__item"><strong>Email:</strong> {email}</h2>
                <div className="profile-group-row">
                </div>
                <p className="profile-group-smaller-column__item"><strong>Location: </strong> {location}</p>
                <p className="profile-group-smaller-column__item"><strong>Address: </strong> {address}</p>
                <p className="profile-group-smaller-column__item"><strong>Phone: </strong> {phone}</p>
                <p className="profile-group-smaller-column__item"><strong>Time: </strong> {openingHrs} - {closingHrs}</p>
                <p className="profile-group-smaller-column__item"><strong>Open on weekends: </strong> {!isWorkingWeekEnd || isWorkingWeekEnd.toLowerCase() === 'no' || isWorkingWeekEnd.toLowerCase() === 'n' ? 'No' : 'Yes' }</p>
              </div>
            </div>
            <div>
              {
                items.length > 0 ? (
                  <UncontrolledCarousel
                    items = {items}
                    key = {items.src}
                  />
                  )  : ''
              }
            </div>

      </div>
      </div>
    </div>
    );
  }
}

  const mapStateToProps = (state, props) => ({
    foodtruck: state.foodTrucks.foodtrucks.find((foodtruck) => foodtruck.vendorusername === props.match.params.id)
  });

  export default connect(mapStateToProps)(FoodTruckInfoPage);
