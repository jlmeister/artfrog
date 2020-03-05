import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField, Box, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
  subButton: {
    marginLeft: 5,
    height: 55,
  },
}));

export default function SearchField(props) {
  const classes = useStyles();
  const { searchFieldText, query, onSearchSubmit } = props;

  const [error, setError] = useState(false);

  const clickHandler = () => {
    if (query.length < 3) {
      setError(true);
    } else {
      setError(false);
      onSearchSubmit();
    }
  };

  return (
    <div>
      <Box className={classes.root} display="flex" align="center" width="75vw">
        {error ? (
          <TextField
            fullWidth
            error
            value={query}
            helperText="Enter at least 3 letters."
            variant="outlined"
            onChange={e => searchFieldText(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search By Name"
            value={query}
            onChange={e => searchFieldText(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.subButton}
          onClick={clickHandler}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}
