import React from 'react';
import { Grid, CssBaseline, Box, Paper, Typography } from '@material-ui/core';
import StudentCard from './StudentCard';
import ButtonGroup from '../SingleComponents/ButtonGroupStudents';
import SearchField from '../SingleComponents/SearchField';

// Material UI
const EditStudents = props => {
  const {
    students,
    onUpdatedDataBase,
    onSortNameAsc,
    onSortNameDesc,
    onSortCreatedAsc,
    onSortCreatedDesc,
    searchFieldText,
    onSearchSubmit,
    query,
  } = props;

  return (
    <div>
      <CssBaseline>
        <Grid container display="flex" direction="column" alignItems="center">
          <Grid item>
            <SearchField
              searchFieldText={searchFieldText}
              students={students}
              query={query}
              onSearchSubmit={onSearchSubmit}
            />
          </Grid>

          <ButtonGroup
            onSortNameAsc={onSortNameAsc}
            onSortNameDesc={onSortNameDesc}
            onSortCreatedAsc={onSortCreatedAsc}
            onSortCreatedDesc={onSortCreatedDesc}
            onUpdatedDataBase={onUpdatedDataBase}
            students={students}
          />
          <Grid item align="center" xs={12} sm={10} md={8} lg={8} xl={8}>
            {students.length > 0 ? (
              <>
                {students.map(student => (
                  <StudentCard
                    key={student.id}
                    students={student}
                    onUpdatedDataBase={onUpdatedDataBase}
                  />
                ))}
              </>
            ) : (
              <Box marginTop="30px">
                <Paper elevation={4}>
                  <Typography variant="h5">
                    No results. Try your Search Again
                  </Typography>
                </Paper>
              </Box>
            )}
          </Grid>
        </Grid>
      </CssBaseline>
    </div>
  );
};

export default EditStudents;
