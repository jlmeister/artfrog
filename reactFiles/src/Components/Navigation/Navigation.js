import React from 'react';
import checkAuth from '../../auth/checkAuth'

// Material UI stuff
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import AppBarCollapse from './AppBarCollapse';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#679488',
    },
    secondary: {
      main: '#DC6866',
    },
  },
});

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  links: {
    marginRight: '20px',
    textDecoration: 'none',
    color: 'white',
  },
}));

function Navigation(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            ArtFrog Academy
          </Typography>
          {checkAuth() && (
            <>
              <AppBarCollapse />
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navigation;
