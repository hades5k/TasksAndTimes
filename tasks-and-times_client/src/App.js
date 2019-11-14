import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// TIER
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import teal from '@material-ui/core/colors/teal';
import deepOrange from '@material-ui/core/colors/deepOrange';

import './App.css';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: teal[100],
      main: teal[500],
      dark: teal[900],
      contrastText: '#fff'
    },
    secondary: {
      light: deepOrange[100],
      main: deepOrange[500],
      dark: deepOrange[900],
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
});

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch className="container">
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
