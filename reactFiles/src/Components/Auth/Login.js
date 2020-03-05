import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

import { Redirect } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#679488',
    },
    secondary: {
      main: '#AD7994',
    },
  },
});

const useStyles = makeStyles({
  mainBody: {
    height: '75vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    backgroundColor: '#DC6866',
  },

  inputField: {
    width: '300px',
  },

  subButton: {
    backgroundColor: '#DC6866',
    width: '300px',
    '&:hover': {
      background: '#679488',
      transition: '.4s',
    },
  },
});

const Login = props => {
  const { logInHandler, isLoggedIn } = props;
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      {isLoggedIn ? (
        <Redirect to="/panel" />
      ) : (
        <div className={classes.mainBody}>
          <form className="formBox">
            <div>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h4">
                    Log In
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ThemeProvider theme={theme}>
                    <TextField
                      variant="outlined"
                      label="User Name"
                      name="username"
                      className={classes.inputField}
                    />
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12}>
                  <ThemeProvider theme={theme}>
                    <TextField
                      variant="outlined"
                      label="Password"
                      name="password"
                      className={classes.inputField}
                    />
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    className={classes.subButton}
                    onClick={e => logInHandler(e)}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
