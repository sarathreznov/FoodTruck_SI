export default (state = {}, action) => {
  switch(action.type){
    case 'SAVE_ALL_FOOD_TRUCKS':
    return {
      foodtrucks: action.foodtrucks
    }
    default:
    return state;
  };
};
