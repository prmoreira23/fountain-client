export default (state = {}, action) => {
 switch (action.type) {
  case 'SET_SNACK':
    return action.payload;
  case 'UNSET_SNACK':
   return {};
  default:
   return state;
 }
}
