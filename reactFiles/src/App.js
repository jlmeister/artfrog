import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import checkAuth from './auth/checkAuth'

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

  ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          checkAuth() ? (
            <Component {...props} />
          ) : (
            <Redirect to="/admin/login" />
          )
        }
      />
    );
  };

  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={this.theme}>
          <Navigation/>
          <Switch>
            <Route
              path="/admin/login"
              render={props => (
                <Login
                  {...props}
                />
              )}
            />
            <this.ProtectedRoute exact path="/admin" component={Panel} />
            <this.ProtectedRoute path="/admin/board" component={Board} />
            <this.ProtectedRoute path="/admin/classes" component={Sections} />
            <this.ProtectedRoute path="/admin/students" component={Students} />
            <this.ProtectedRoute path="/admin/teachers" component={Teachers} />
            <Route component={() => '404 Not Found'} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
