import axios from 'axios';
const url = process.env.URL;

export const fetchAllFoodtrucks = () => {
  return (dispatch) => {
    return axios({
    method: 'get',
    url: `${url}/vendors/`
  }).then((response) => dispatch(saveAllFoodtrucks(response.data.result.Items)));
};
}

export const saveAllFoodtrucks = (foodtrucks) => ({
    type: 'SAVE_ALL_FOOD_TRUCKS',
    foodtrucks
  });
