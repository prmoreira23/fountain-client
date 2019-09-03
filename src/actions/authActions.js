export const login = (auth) => dispatch => {
 dispatch({
  type: 'LOGIN',
  payload: auth
 })
}

export const logout = () => dispatch => {
 dispatch({
  type: 'LOGOUT',
 })
}
