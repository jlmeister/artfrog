import React, { useState } from 'react';
import axios from 'axios';

import {
  Typography,
  CssBaseline,
  Button,
  Box,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

const useStyles = makeStyles({
  form: {
    width: '100vw',
  },
  button: {
    marginBottom: '15px',
    width: '240px',
  },
});

const BoardCard = props => {
  const { board, onUpdatedDataBase } = props;

  const classes = useStyles();

  // Edit State
  const [isInEditMode, setIsInEditMode] = useState(false);
  const toggleIsInEditMode = () => setIsInEditMode(!isInEditMode);

  // Local Board Members Info State
  const [member, setMember] = useState({
    first_name: board.first_name,
    last_name: board.last_name,
    bio: board.bio,
    id: board.id,
  });

  const cancelHandler = e => {
    setMember({
      ...member,
      first_name: board.first_name,
      last_name: board.last_name,
      bio: board.bio,
      id: board.id,
    });
    toggleIsInEditMode();
  };

  const saveHandler = e => {
    const { first_name, last_name, bio, id } = member;
    const data = {
      first_name,
      last_name,
      bio,
      id,
    };
    const dataJSON = JSON.stringify(data);
    // console.log('UPDATE SAVE: ', data);
    axios({
      method: 'put',
      url: '/about',
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataJSON,
    })
      .then(function(response) {
        console.log(response);
        toggleIsInEditMode();
        onUpdatedDataBase();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const deleteConfirmation = e => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: e => deleteHandler(e),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const deleteHandler = e => {
    const { id } = board;
    const data = {
      id,
    };
    const dataJSON = JSON.stringify(data);

    axios({
      method: 'delete',
      url: '/about',
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataJSON,
    })
      .then(function(response) {
        console.log(response);
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
              <Typography variant="h4">
                {board.first_name} {board.last_name}
              </Typography>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails display="flex">
            <form className={classes.form} noValidate autoComplete="off">
              {isInEditMode ? (
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
                    />
                  </Box>
                </Box>
              ) : (
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
                    <Typography variant="h6">{board.first_name}</Typography>
                  </Box>
                </Box>
              )}

              {isInEditMode ? (
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
                      label="Last Name"
                      variant="outlined"
                      value={member.last_name}
                      onChange={e =>
                        setMember({ ...member, last_name: e.target.value })
                      }
                    />
                  </Box>
                </Box>
              ) : (
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
                  <Box>
                    <Typography variant="h6">{board.last_name}</Typography>
                  </Box>
                </Box>
              )}

              {isInEditMode ? (
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
                      value={member.bio}
                      onChange={e =>
                        setMember({ ...member, bio: e.target.value })
                      }
                    />
                  </Box>
                </Box>
              ) : (
                <Box
                  p={1}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  borderBottom="1px solid grey"
                >
                  <Box marginRight="10px">
                    <Typography variant="h6">
                      <strong>Bio: </strong>
                    </Typography>
                  </Box>
                  <Box variant="h6" flexGrow={1} textAlign="left" padding={1}>
                    <Typography>{board.bio}</Typography>
                  </Box>
                </Box>
              )}
              {isInEditMode ? (
                <Box padding={2} display="flex" flexDirection="column">
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    startIcon={<CancelOutlinedIcon />}
                    onClick={e => cancelHandler(e)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    startIcon={<SaveAltIcon />}
                    onClick={saveHandler}
                  >
                    Save
                  </Button>
                </Box>
              ) : (
                <Box padding={2} display="flex" flexDirection="column">
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={toggleIsInEditMode}
                  >
                    Edit
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    className={classes.button}
                    onClick={deleteConfirmation}
                  >
                    Delete {board.first_name} {board.last_name}
                  </Button>
                </Box>
              )}
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </CssBaseline>
    </>
  );
};

export default BoardCard;
