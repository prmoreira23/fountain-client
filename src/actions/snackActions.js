export const setSnack = (snackObj) => dispatch => {
 dispatch({
  type: 'SET_SNACK',
  payload: snackObj,
 })
}

export const unSetSnack = () => dispatch => {
 dispatch({
  type: 'UNSET_SNACK',
 })
}
