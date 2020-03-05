import React from 'react';
import { Grid, CssBaseline, Box, Paper, Typography } from '@material-ui/core';
import AddSection from './AddSection';
import SectionsCard from './SectionsCard';
import ButtonGroup from '../SingleComponents/ButtonGroupSections';
import SearchField from '../SingleComponents/SearchField';

// Material UI
const EditSections = props => {
  const {
    sections,
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
              sections={sections}
              onSearchSubmit={onSearchSubmit}
              query={query}
            />
          </Grid>

          <ButtonGroup
            onSortNameAsc={onSortNameAsc}
            onSortNameDesc={onSortNameDesc}
            onSortCreatedAsc={onSortCreatedAsc}
            onSortCreatedDesc={onSortCreatedDesc}
            sections={sections}
            onUpdatedDataBase={onUpdatedDataBase}
          />
          <Grid item align="center" xs={12} sm={10} md={8} lg={8} xl={8}>
            <AddSection onUpdatedDataBase={onUpdatedDataBase} />

            {sections.length > 0 ? (
              <>
                {sections.map(section => (
                  <SectionsCard
                    key={section.id}
                    sections={section}
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

export default EditSections;
