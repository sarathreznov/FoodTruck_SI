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
};

export const removeCustomerInterest = (customer, foodtruck) => {
  return (dispatch, getState) => {
    return axios({
    method: 'delete',
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
};

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
};

const saveAllSubscribedFoodtrucks = (subscribedFoodtrucks) => ({
    type: 'SAVE_ALL_SUBSCRIBED_FOOD_TRUCKS',
    subscribedFoodtrucks
  });

export const fetchAllSubscribedEvents = (subscribedFoodtrucks) => {
  return (dispatch, getState) => {
  let promises = [];
  subscribedFoodtrucks.forEach(({vendorusername}) => {
    promises.push(axios({
    method: 'get',
    url: `${url}/events/${vendorusername}`
  }));
  });
  return axios.all(promises).then((results) => {
      let subscribedEvents = [];
      results.forEach((response) => {
        subscribedEvents.push(response.data.result);
      });
      return dispatch(saveAllSubscribedEvents(subscribedEvents));
  });
};
};

const saveAllSubscribedEvents = (subscribedEvents) => ({
    type: 'SAVE_ALL_SUBSCRIBED_EVENTS',
    subscribedEvents
  });

  export const uploadMenuImagesToS3 = (menu1, menu2, vendorusername) => {
    return (dispatch, getState) => {
    let promises = [];
    let numberOfMenuPages = 2;
    for(let i=0 ; i<numberOfMenuPages; i++){
      console.log(i);
      promises.push(axios({
      method: 'get',
      url: `${url}/vendors/uploadeventimage`,
      params: {
        vendorusername
      }
    }));
    }
    return axios.all(promises).then((results) => {
      results.forEach((response) => console.log(response));
        // let subscribedEvents = [];
        // results.forEach((response) => {
        //   subscribedEvents.push(response.data.result);
        // });
        // return dispatch(saveAllSubscribedEvents(subscribedEvents));
    });


   //  return axios({
   //    method: 'get',
   //    url: `${url}/vendors/uploadeventimage`,
   //    params: {
   //      vendorusername
   //    }
   //  }).then((response) => {
   //        const uploadUrl = response.data.url;
   //        const imageUrl = response.data.key;
   //        return axios({
   //        method: 'put',
   //        url: `${uploadUrl}`,
   //        data: eventImageFile,
   //        headers: {
   //         'Content-Type': eventImageFile.type
   //        }
   //    }).then(() => `https://s3.amazonaws.com/foodtruck-vendor-info/${imageUrl}`)
   // }).catch((e) => {
   //   console.log('Something went wrong', e);
   // });

  };
  };

export const uploadImageToS3 = (eventImageFile, vendorusername) => {
  return (dispatch, getState) => {
  return axios({
    method: 'get',
    url: `${url}/vendors/uploadeventimage`,
    params: {
      vendorusername
    }
  }).then((response) => {
        const uploadUrl = response.data.url;
        const imageUrl = response.data.key;
        return axios({
        method: 'put',
        url: `${uploadUrl}`,
        data: eventImageFile,
        headers: {
         'Content-Type': eventImageFile.type
        }
    }).then(() => `https://s3.amazonaws.com/foodtruck-vendor-info/${imageUrl}`)
 }).catch((e) => {
   console.log('Something went wrong', e);
 });

};
};

export const createNewEvent = ({vendorusername, eventTitle, eventDescription, eventStartDate, eventEndDate, imageUrl}) => {
  return (dispatch, getState) => {
     return axios({
      method: 'post',
      url: `${url}/events/`,
      data: {
        vendorusername,
        eventTitle,
        eventDescription,
        eventStartDate ,
        eventEndDate,
        eventImage: imageUrl
      }
    });
};
};
