import axios from 'axios';
const url = process.env.URL;

export const addToCustomerInterest = (customer, foodtruck) => {
  return (dispatch, getState) => {
    return axios({
    method: 'post',
    url: `${url}/interests/`,
    data: {
      customerusername: customer,
      vendorusername: foodtruck
    }
  }).then(() => dispatch(fetchAllSubscribedFoodtrucks(customer)))
    .then(() => {
    const subscribedFoodtrucks = getState().events.subscribedFoodtrucks;
    return dispatch(fetchAllSubscribedEvents(subscribedFoodtrucks));
    });
};
}

export const fetchAllSubscribedFoodtrucks = (customerusername) => {
  return (dispatch) => {
    return axios({
    method: 'get',
    url: `${url}/interests/`,
    params: {
      customerusername
    }
  }).then((response) => dispatch(saveAllSubscribedFoodtrucks(response.data.result.Items)));
};
}

const saveAllSubscribedFoodtrucks = (subscribedFoodtrucks) => ({
    type: 'SAVE_ALL_SUBSCRIBED_FOOD_TRUCKS',
    subscribedFoodtrucks
  });

export const fetchAllSubscribedEvents = (subscribedFoodtrucks) => {
  return (dispatch, getState) => {
  let promises = [];
  subscribedFoodtrucks.forEach(({vendorusername}) => {
    // let params = {
    //   vendorusername
    // };
    promises.push(axios({
    method: 'get',
    url: `${url}/events/${vendorusername}`
  }));
  });
  return axios.all(promises).then((results) => {
      let subscribedEvents = [];
      results.forEach((response) => {
        console.log(response.data.result);
        subscribedEvents.push(response.data.result);
          // mainObject[response.identifier] = response.value;
      });
      return dispatch(saveAllSubscribedEvents(subscribedEvents));
  });
}
}

const saveAllSubscribedEvents = (subscribedEvents) => ({
    type: 'SAVE_ALL_SUBSCRIBED_EVENTS',
    subscribedEvents
  });


  // var mainObject = {},
  //     promises = [];
  //
  // myArrayOfData.forEach(function(singleElement){
  //   myUrl = singleElement.webAddress;
  //   promises.push(axios.get(myUrl))
  // });
  //
  // axios.all(promises).then(function(results) {
  //     results.forEach(function(response) {
  //         mainObject[response.identifier] = response.value;
  //     })
  // });
