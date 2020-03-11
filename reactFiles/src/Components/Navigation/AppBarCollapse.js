import React from 'react';
import { Link } from 'react-router-dom';

// Material UI stuff
import { Button, MenuItem } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import ButtonAppBarCollapse from './ButtonAppBarCollapse';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  links: {
    marginRight: '20px',
    textDecoration: 'none',
    color: 'white',
  },
  linksCollapsed: {
    color: 'black',
    marginRight: 'none',
    textDecoration: 'none',
  },
}));

const styles = theme => ({
  root: {
    position: 'absolute',
    right: 0,
  },
  buttonBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    display: 'flex',
    marginRight: '20px',
  },
});

const AppBarCollapse = props => {
  const classes = useStyles();
  const logout = () => {
    window.sessionStorage.removeItem('adminHasBeenAuthenticated')
    window.location.replace('/admin')
  }

  return (
    <div className={props.classes.root}>
      <ButtonAppBarCollapse>
        <MenuItem>
          <Typography variant="h6">
            <Link to="/admin/classes" className={classes.linksCollapsed}>
              Classes
            </Link>
          </Typography>
        </MenuItem>

        <MenuItem>
          <Typography variant="h6">
            <Link to="/admin/students" className={classes.linksCollapsed}>
              Students
            </Link>
          </Typography>
        </MenuItem>

        <MenuItem>
          <Typography variant="h6">
            <Link to="/admin/teachers" className={classes.linksCollapsed}>
              Teachers
            </Link>
          </Typography>
        </MenuItem>

        <MenuItem>
          <Typography variant="h6">
            <Link to="/admin/board" className={classes.linksCollapsed}>
              Board
            </Link>
          </Typography>
        </MenuItem>

        <MenuItem>
          <Button
            variant="outlined"
            color="secondary"
            onClick={logout}
          >
            LOG OUT
          </Button>
        </MenuItem>
      </ButtonAppBarCollapse>
      <div className={props.classes.buttonBar} id="appbar-collapse">
        <Typography variant="h6">
          <Link to="/admin/classes" className={classes.links}>
            Classes
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/admin/students" className={classes.links}>
            Students
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/admin/teachers" className={classes.links}>
            Teachers
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/admin/board" className={classes.links}>
            Board
          </Link>
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={logout}
        >
          LOG OUT
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(AppBarCollapse);
