import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const FileCreationPage = (props) => (
  <div>
    <input style={{display: 'none'}} type="file" accept="image/*" onChange = {props.onImageChanged} id= {props.id}/>
  </div>
);

export default FileCreationPage;
