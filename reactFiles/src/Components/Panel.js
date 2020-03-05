import React from 'react';

// Material UI
import 'typeface-roboto';

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 120,
    width: 240,
  },
  top: {
    borderBottom: '1px solid #DC6866',
    backgroundColor: '#679488',
    color: 'white',
  },
  bottom: {
    marginTop: '20px',
  },
}));

function Panel() {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        display="flex"
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '85vh' }}
      >
        <Grid
          item
          display="flex"
          align="center"
          xs={12}
          sm={8}
          md={8}
          lg={4}
          xl={4}
        >
          <Paper variant="outlined" className={classes.paper}>
            <Typography className={classes.top} variant="h5">
              Admin Panel
            </Typography>
            <Typography align="center" className={classes.bottom} variant="h6">
              Navigate with Menu
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Panel;
