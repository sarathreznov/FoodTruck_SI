export default (state = {}, action) => {
  switch(action.type){
    case 'SAVE_ALL_SUBSCRIBED_FOOD_TRUCKS':
    return {
      ...state,
      subscribedFoodtrucks: action.subscribedFoodtrucks
    }
    case 'SAVE_ALL_SUBSCRIBED_EVENTS':
    return {
      ...state,
      subscribedEvents: action.subscribedEvents
    }
    default:
    return state;
  };
};
