import React, { useState } from 'react';
import axios from 'axios';

// Material UI
import {
  Typography,
  CssBaseline,
  Button,
  Box,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  form: {
    width: '100%',
  },
  button: {
    marginBottom: '15px',
    width: '240px',
  },
});

const AddMember = props => {
  const { onUpdatedDataBase } = props;
  const classes = useStyles();

  const [member, setMember] = useState({
    first_name: '',
    last_name: '',
    bio: '',
  });

  const saveHandler = e => {
    const { first_name, last_name, bio } = member;
    const data = {
      first_name,
      last_name,
      bio,
    };
    const dataJSON = JSON.stringify(data);

    axios({
      method: 'post',
      url: 'http://localhost:80/about',
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataJSON,
    })
      .then(function(response) {
        setMember({ first_name: '', last_name: '', bio: '' });
        onUpdatedDataBase();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <>
      <CssBaseline>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              className={classes.cardTitle}
              bgcolor="rgba(186, 130, 159, .2)"
              borderRadius="8px"
              padding={3}
              display="flex"
              justifyContent="center"
              flexGrow={1}
            >
              <Typography variant="h4">Add A Board Member</Typography>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form className={classes.form} noValidate autoComplete="off">
              <Box
                p={1}
                display="flex"
                alignItems="center"
                borderBottom="1px solid grey"
              >
                <Box marginRight="10px">
                  <Typography variant="h6">
                    <strong>First Name: </strong>
                  </Typography>
                </Box>
                <Box flexGrow={1} textAlign="left">
                  <TextField
                    label="First Name"
                    variant="outlined"
                    autoFocus
                    value={member.first_name}
                    onChange={e =>
                      setMember({ ...member, first_name: e.target.value })
                    }
                    placeholder="First Name"
                  />
                </Box>
              </Box>
              <Box
                p={1}
                display="flex"
                alignItems="center"
                borderBottom="1px solid grey"
              >
                <Box marginRight="10px">
                  <Typography variant="h6">
                    <strong>Last Name: </strong>
                  </Typography>
                </Box>
                <Box flexGrow={1} textAlign="left">
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    autoFocus
                    value={member.last_name}
                    onChange={e =>
                      setMember({ ...member, last_name: e.target.value })
                    }
                    placeholder="Last Name"
                  />
                </Box>
              </Box>

              <Box
                p={1}
                display="flex"
                alignItems="center"
                borderBottom="1px solid grey"
                className={classes.bioBox}
                flexGrow={1}
              >
                <Box marginRight="10px">
                  <Typography variant="h6">
                    <strong>Bio: </strong>
                  </Typography>
                </Box>
                <Box flexGrow={1} textAlign="left">
                  <TextField
                    multiline
                    rows={3}
                    fullWidth
                    className={classes.bioSection}
                    label="Bio"
                    variant="outlined"
                    autoFocus
                    value={member.bio}
                    onChange={e =>
                      setMember({ ...member, bio: e.target.value })
                    }
                    placeholder="Bio"
                  />
                </Box>
              </Box>

              <Box padding={2}>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  startIcon={<SaveAltIcon />}
                  className={classes.button}
                  onClick={saveHandler}
                >
                  Save New Member
                </Button>
              </Box>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </CssBaseline>
    </>
  );
};

export default AddMember;
