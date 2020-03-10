import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

// Material UI
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';

// Components
import Navigation from './Components/Navigation/Navigation';
import Login from './Components/Auth/Login';
import Board from './Components/Board/BoardData';
import Sections from './Components/Sections/SectionsData';
import Students from './Components/Students/StudentsData';
import Teachers from './Components/Teachers/TeachersData';
import Panel from './Components/Panel';

class App extends React.Component {
  state = {
    isLoggedIn: true,
  };

  theme = createMuiTheme({
    palette: {
      primary: {
        main: '#679488',
      },
      secondary: {
        main: '#AD7994',
      },
    },
  });

  logInHandler = e => {
    e.preventDefault();
    this.setState({ isLoggedIn: true });
  };

  logOutHandler = () => {
    this.setState({ isLoggedIn: false });
  };

  ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          this.state.isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <BrowserRouter>
        <ThemeProvider theme={this.theme}>
          <Navigation
            isLoggedIn={isLoggedIn}
            logOutHandler={this.logOutHandler}
          />
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  logInHandler={e => this.logInHandler(e)}
                  isLoggedIn={isLoggedIn}
                />
              )}
            />
            <this.ProtectedRoute exact path="/" component={Panel} />
            <this.ProtectedRoute path="/board" component={Board} />
            <this.ProtectedRoute path="/classes" component={Sections} />
            <this.ProtectedRoute path="/students" component={Students} />
            <this.ProtectedRoute path="/teachers" component={Teachers} />
            <Route path="/*" component={() => '404 Not Found'} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
