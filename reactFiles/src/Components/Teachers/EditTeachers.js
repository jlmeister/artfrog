import React from 'react';
import { Grid, CssBaseline, Box, Paper, Typography } from '@material-ui/core';
import TeacherCard from './TeacherCard';
import AddTeacher from './AddTeacher';
import ButtonGroup from '../SingleComponents/ButtonGroup';
import SearchField from '../SingleComponents/SearchField';

// Material UI

const EditTeachers = props => {
  const {
    teachers,
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
              teachers={teachers}
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
          />
          <Grid item align="center" xs={12} sm={10} md={8} lg={8} xl={8}>
            <AddTeacher onUpdatedDataBase={onUpdatedDataBase} />

            {teachers.length > 0 ? (
              <>
                {teachers.map(teacher => (
                  <TeacherCard
                    key={teacher.id}
                    teachers={teacher}
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

export default EditTeachers;
