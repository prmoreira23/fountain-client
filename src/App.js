import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import AppRouter from './routes/app-router';
import AuthAdapter from './services/auth-services';
import { login } from './actions/authActions';
import { getToken } from './utils/auth';
import SnackBar from './components/shared/snack-bar';
import { unSetSnack } from './actions/snackActions';

const mapDispatchToProps = dispatch => ({
 loginAction: (auth) => dispatch(login(auth)),
 unSetSnack: () => dispatch(unSetSnack()),
});

const mapStateToProps = state => {
  return { ...state };
};

class App extends React.Component {
  componentWillMount() {
    const token = getToken();
    if (token) {
       AuthAdapter.currentUser()
         .then(user => {
           if (!user.error) {
             this.props.loginAction({ user });
           }
         });
     }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.unSetSnack();
  }

  render() {
    const { snack } = this.props;
    const { message, variant, open } = snack;
    return (
      <React.Fragment>
        <AppRouter />
        { !isEmpty(snack) && <SnackBar message={message} variant={variant} handleClose={this.handleClose} open={open} /> }
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
