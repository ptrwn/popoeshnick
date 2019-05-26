/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';
import _ from 'lodash';
// import font awesome icons
import {
  faSpinner,
  faBars,
  faUser,
  faSignOutAlt,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import {
  withStyles,
  Button,
} from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import whyDidYouUpdate from 'why-did-you-update';
import {
  Loader,
  LoginForm,
  DialogSignup,
  DialogForgot,
} from './components';
import Image from './bg.jpg';

import { StartScreen } from './routers/startPage';
import { Profile } from './routers/profile';
// import { Footer } from './components/footer';
import { ROUT_CONST, API_CONST } from './constants';
import * as alkashActions from './__data__/actions/alkashActions';

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
}
// font awesome icons add here
// only added icons will be loaded to bundle
library.add(
  faSpinner,
  faBars,
  faUser,
  faSignOutAlt,
  faUserCog,
);

const styles = {
  app: {
    textAlign: 'center',
  },
  appContainer: {
    minHeight: '100vh',
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
  },
};
const cookies = new Cookies();

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      openSignup: false,
      openForgot: false,
    };
  }

  componentDidMount() {
    const { setAlkash } = this.props.alkashActions;
    this.setState({ loader: true });
    const cookie = cookies.get('session');
    if (cookie) {
      axios.get(API_CONST.PROFILE).then((res) => {
        const { errors, profile, status } = res.data;
        if (status === 'success') {
          setAlkash(profile);
        } else {
          console.log(errors);
        }
      }).catch((error) => {
        console.log(error);
      }).then(() => this.setState({ loader: false }));
    } else {
      this.setState({ loader: false });
    }
  }

  handleLogin = (profile) => {
    this.props.alkashActions.setAlkash(profile);
  };

  handleSendQuery = profile => this.props.alkashActions.setAlkash(profile);

  handleCloseSignup = () => {
    this.setState({ openSignup: false });
  }

  handleOpenSignup = () => {
    this.setState({ openSignup: true });
  }

  handleCloseForgot = () => {
    this.setState({ openForgot: false });
  }

  handleOpenForgot = () => {
    this.setState({ openForgot: true });
  }

  renderContent = (classes) => {
    const {
      alkash
    } = this.props;
    const isAuth = !_.isEmpty(alkash);
    return (
      isAuth
        ? (
          <Router>
            <div className={classes.app}>
              <div className={classes.appContainer}>
                {/* <StartScreen /> */}
                <Route exact path="/" component={StartScreen} />
                <Route path={`/${ROUT_CONST.PROFILE_PAGE}`} component={Profile} />
                {/* TODO <Footer> component */}
                {/* <Footer /> */}
              </div>
            </div>
          </Router>
        )
        : (
          <header className={classes.appHeader}>
            <LoginForm
              onLogin={this.handleLogin}
            />
            <Button
              classes={{ root: classes.button }}
              onClick={this.handleOpenForgot}
            >
              Forgot password?
            </Button>
            <Button
              onClick={this.handleOpenSignup}
            >
            Registration
            </Button>
            <DialogSignup
              // eslint-disable-next-line react/destructuring-assignment
              open={this.state.openSignup}
              onClose={this.handleCloseSignup}
              onSend={this.handleSendQuery}
            />
            <DialogForgot
              // eslint-disable-next-line react/destructuring-assignment
              open={this.state.openForgot}
              onClose={this.handleCloseForgot}
            />
          </header>
        )
    );
  }

  render() {
    const {
      loader,
    } = this.state;
    const {
      classes,
    } = this.props;
    return (
      loader ? <Loader /> : this.renderContent(classes)
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
  alkashActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    alkash: state.alkash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alkashActions: bindActionCreators(alkashActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
