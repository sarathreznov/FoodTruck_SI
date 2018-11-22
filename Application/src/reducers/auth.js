export default (state = {}, action) => {
  switch(action.type){
    case 'LOGIN':
    return {
      ...state,
      uid: action.uid
    };
    case 'LOGOUT':
    return {};
    case 'ADD_CURRENT_USER':
    return {
      ...state,
      userType: action.userType,
      token: action.token,
      userInfo: action.userInfo,
      firstTimeUser: action.firstTimeUser
    };
    case 'ADD_VENDOR_DETAILS':
    return {
      ...state,
      foodtruckname: action.foodtruckname,
      location: action.location,
      phone: action.phone,
      openingHrs: action.openingHrs,
      closingHrs: action.closingHrs,
      isWorkingWeekEnd: action.isWorkingWeekEnd,
      menuUrl: action.menuUrl,
      imageUrl: action.imageUrl
    };
    default:
    return state;
  };
};
