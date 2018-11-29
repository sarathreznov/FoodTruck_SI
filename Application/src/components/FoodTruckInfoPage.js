import React from 'react';
import { connect } from 'react-redux';
import { UncontrolledCarousel} from 'reactstrap';
import Header from './Header';

  export class FoodTruckInfoPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      foodtruck : props.foodtruck ?  props.foodtruck : {}
    }

  }

  // getProfileImage = () => {
  //   this.setState(() => ({photoURL: this.props.imageUrl}));
  // };

  componentDidMount(){
    console.log(this.state.foodtruck);
  }

  render(){
    // const imageUrl = this.props.imageUrl;
    // const menuUrl = this.props.menuUrl;
    // let menuUrls = [];
    // if(menuUrl){
    //
    //   for(let i = 0; i<menuUrl.length; i++){
    //     for(let j = 0; j<menuUrl[i].length;j++){
    //         menuUrls.push(menuUrl[i][j]);
    //     }
    //   }
    // }

    const items = [
      {
        src: this.state.foodtruck.menu1url,
        altText: 'Slide 1',
        caption: 'Slide 1',
        header: 'Slide 1 Header'
      },
      {
        src: this.state.foodtruck.menu2url,
        altText: 'Slide 2',
        caption: 'Slide 2',
        header: 'Slide 2 Header'
      }
    ];

    const name = "Halal";
    const title = "Event title";
    const eventDetail = "Event title and some details";
    const email = "halah@uncc.edu";
    const foodtruckname = "Halal 2";
    const location = "UNCC";
    const phone = "XYZ";
    const openingHrs = "6am";
    const closingHrs = "6:30am";
    const isWorkingWeekEnd = "Yes";
    return (
      <div>
        <Header />
        <div className="content-container">
          <div className="profile-group-row">
            <img className="profileImage" src={this.state.foodtruck.imageUrl} />
            <div className="profile-group-column">
              <h2 className="profile-group-column__item">{name}</h2>
              <h4 className="profile-group-column__item">Email:{email}</h4>
              <div className="profile-group-row">
                <h4 className="profile-group-row__item">Food Truck details</h4>
              </div>
              <p className="profile-group-smaller-column__item"><strong>Food Truck Name:</strong> {foodtruckname}</p>
              <p className="profile-group-smaller-column__item"><strong>Location: </strong> {location}</p>
              <p className="profile-group-smaller-column__item"><strong>Phone: </strong> {phone}</p>
              <p className="profile-group-smaller-column__item"><strong>Time: </strong> {openingHrs} - {closingHrs}</p>
              <p className="profile-group-smaller-column__item"><strong>Open on weekends: </strong> {isWorkingWeekEnd ? 'Yes' : 'No' }</p>
            </div>

          </div>
          {
          //   items.map((item, index) => {
          //     return (
          //     <UncontrolledCarousel
          //       items = {items}
          //       key = {index}
          //       >
          //       {/* <img src={item.src} alt={item.altText} /> */}
          //     </UncontrolledCarousel>
          //   );
          // })
          <UncontrolledCarousel
                items = {items}
                key = {items.src}
              />
        }


      </div>
      </div>
    );
  }
}


  const mapStateToProps = (state, props) => ({
    foodtruck: state.foodTrucks.foodtrucks.find((foodtruck) => foodtruck.vendorusername === props.match.params.id)
    // imageUrl: state.auth.imageUrl,
    // name: state.auth.userInfo.displayName,
    // email: state.auth.userInfo.email,
    // userType: state.auth.userType,
    // foodtruckname: state.auth.foodtruckname,
    // location: state.auth.location,
    // phone: state.auth.phone,
    // openingHrs: state.auth.openingHrs,
    // closingHrs: state.auth.closingHrs,
    // isWorkingWeekEnd: state.auth.isWorkingWeekEnd,
    // menuUrl: state.auth.menuUrl,
    // menuImage: state.auth.menuImage
  });

  export default connect(mapStateToProps)(FoodTruckInfoPage);
