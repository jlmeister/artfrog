import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

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

const AddSection = props => {
  const { onUpdatedDataBase } = props;
  const classes = useStyles();

  // Local Section Info State
  const [section, setSection] = useState({
    class_id: '',
    class_name: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
  });

  const saveHandler = e => {
    const data = {
      class_name: section.class_name,
      description: section.description,
      date: moment(section.date).format('YYYY-MM-DD'),
      start_time: section.start_time,
      end_time: section.end_time,
    };
    const dataJSON = JSON.stringify(data);
    console.log('UPDATE SAVE: ', data);
    axios({
      method: 'post',
      url: '/classes',
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataJSON,
    })
      .then(function(response) {
        console.log(response);
        onUpdatedDataBase();
        setSection({
          class_id: '',
          class_name: '',
          description: '',
          date: '',
          start_time: '',
          end_time: '',
        });
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
              <Typography variant="h4">Add A Class</Typography>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails display="flex">
            <form className={classes.form} noValidate autoComplete="off">
              <Box
                p={1}
                display="flex"
                alignItems="center"
                borderBottom="1px solid grey"
              >
                <Box marginRight="10px">
                  <Typography variant="h6">
                    <strong>Class Name: </strong>
                  </Typography>
                </Box>
                <Box flexGrow={1} textAlign="left">
                  <TextField
                    label="Class Name"
                    variant="outlined"
                    autoFocus
                    value={section.class_name}
                    onChange={e =>
                      setSection({ ...section, class_name: e.target.value })
                    }
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
                    <strong>Description: </strong>
                  </Typography>
                </Box>
                <Box flexGrow={1} textAlign="left">
                  <TextField
                    multiline
                    rows={3}
                    fullWidth
                    label="Description"
                    variant="outlined"
                    value={section.description}
                    onChange={e =>
                      setSection({ ...section, description: e.target.value })
                    }
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
                    <strong>Start Date: </strong>
                  </Typography>
                </Box>
                <Box flexGrow={1} textAlign="left">
                  <TextField
                    variant="outlined"
                    type="date"
                    value={section.date}
                    onChange={e =>
                      setSection({ ...section, date: e.target.value })
                    }
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
                    <strong>Start Time: </strong>
                  </Typography>
                </Box>
                <Box flexGrow={1} textAlign="left">
                  <TextField
                    variant="outlined"
                    type="time"
                    value={section.start_time}
                    onChange={e =>
                      setSection({ ...section, start_time: e.target.value })
                    }
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
                    <strong>End Time: </strong>
                  </Typography>
                </Box>
                <Box flexGrow={1} textAlign="left">
                  <TextField
                    variant="outlined"
                    type="time"
                    value={section.end_time}
                    onChange={e =>
                      setSection({ ...section, end_time: e.target.value })
                    }
                  />
                </Box>
              </Box>

              <Box padding={2} display="flex" flexDirection="column">
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
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </CssBaseline>
    </>
  );
};

export default AddSection;
