import React from 'react';
import { connect } from 'react-redux';

export class CustomerProfilePage extends React.Component {

  state = {
    // photoURL: ''
  };

  // getProfileImage = () => {
  //   this.setState(() => ({photoURL: this.props.imageUrl}));
  // };

  componentDidMount(){
    // this.getProfileImage();
  }

  render(){
    const imageUrl = this.props.imageUrl;
    const name = this.props.name;
    const email = this.props.email;
    const userType = this.props.userType;
    return (
      <div className="content-container">
        <div className="profile-group-row">
          <img className="profileImage" src={imageUrl} />
          <div className="profile-group-column">
            <h2 className="profile-group-column__item">{name}</h2>
            <h4 className="profile-group-column__item">email: {email}</h4>
            <h4 className="profile-group-column__item">My favorite food trucks</h4>
            <ul className="profile-group-column__item">
                  <li>
                    <span>Food Truck 1</span>&nbsp; &nbsp;
                    <span>Delete</span>
                  </li>
                  <li>
                    <span>Food Truck 2</span>&nbsp; &nbsp;
                    <span>Delete</span>
                  </li>
                  <li>
                    <span>Food Truck 3</span>&nbsp; &nbsp;
                    <span>Delete</span>
                  </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

}

  const mapStateToProps = (state) => ({
    imageUrl: state.auth.userInfo.photoURL,
    name: state.auth.userInfo.displayName,
    email: state.auth.userInfo.email,
    userType: state.auth.userType
  });

  export default connect(mapStateToProps)(CustomerProfilePage);
