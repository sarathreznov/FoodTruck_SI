import React from 'react';
import Header from './Header';
import axios from 'axios';

const FoodTruckDashboard = () => (
  <div>
    <Header />
    <div className="content-container">
      <p>This will be our foodtruck dashboard!{testAxios()}</p>
    </div>
  </div>
);

const testAxios = () => {
  axios({
  method:'get',
  url:'https://evening-eyrie-48193.herokuapp.com/todos',
  headers: {
  	"x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmQyMjZiY2FmYmQ4MzAwMTVlOGQ0ZGMiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQwNDk5MTMzfQ.LZ0sMRISV2sjOLWwaLGvxUu84qXLo8oHZmZE5-Npg70"
    }
})
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });


//   var instance = axios.create({
//   baseURL: 'https://evening-eyrie-48193.herokuapp.com/todos',
//   headers: {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFiMTljMThjMDlhZjAwMTU4ZmI3NTgiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQwNDk1OTYyfQ.fS9wTu8VZKw4Py23z_g8IzO93drmHAN3bEiYx8tlxJo'}
// });
}

export default FoodTruckDashboard;
