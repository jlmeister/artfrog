import React, { useState } from 'react';
import checkAuth from '../../auth/checkAuth'

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

const Login = ({ history }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost/api/auth', {
      method: 'POST',
      headers: {
        Authorization: window.btoa(username + ":" + password)
      }
    })
    .then(res => {
      if (res.status === 200)
        window.sessionStorage.setItem('adminHasBeenAuthenticated', true)
    })
    .then(res => window.location.assign('/admin'))
    .catch((err) => console.log(err))
  }

  return (
    <>
      <CssBaseline />
      {checkAuth() ? (
        <Redirect to="/admin" />
      ) : (
        <div className={classes.mainBody}>
          <form className="formBox" onSubmit={handleSubmit}>
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
                        value={username}
                        onChange={e => setUsername(e.target.value)}
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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
