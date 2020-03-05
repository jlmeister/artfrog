import React from 'react';
import { Grid, CssBaseline, Box, Paper, Typography } from '@material-ui/core';
import BoardCard from './BoardCard';
import AddMember from './AddMember';
import ButtonGroup from '../SingleComponents/ButtonGroup';
import SearchField from '../SingleComponents/SearchField';

// Material UI

const EditBoard = props => {
  const {
    board,
    onUpdatedDataBase,
    onSortNameAsc,
    onSortNameDesc,
    onSortCreatedAsc,
    onSortCreatedDesc,
    searchFieldText,
    query,
    onSearchSubmit,
  } = props;

  return (
    <div>
      <CssBaseline>
        <Grid container display="flex" direction="column" alignItems="center">
          <SearchField
            searchFieldText={searchFieldText}
            board={board}
            query={query}
            onSearchSubmit={onSearchSubmit}
          />

          <ButtonGroup
            onSortNameAsc={onSortNameAsc}
            onSortNameDesc={onSortNameDesc}
            onSortCreatedAsc={onSortCreatedAsc}
            onSortCreatedDesc={onSortCreatedDesc}
            onUpdatedDataBase={onUpdatedDataBase}
          />

          <Grid item align="center" xs={12} sm={10} md={8} lg={8} xl={8}>
            <AddMember onUpdatedDataBase={onUpdatedDataBase} />
            {board.length > 0 ? (
              <>
                {board.map(member => (
                  <BoardCard
                    key={member.id}
                    board={member}
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

export default EditBoard;
