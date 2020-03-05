import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexGrow: '1',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '20px',
  },
});

export default function SortButtons(props) {
  const classes = useStyles();
  const {
    onSortNameAsc,
    onSortNameDesc,
    onSortCreatedAsc,
    onSortCreatedDesc,
    onUpdatedDataBase,
  } = props;

  return (
    <div>
      <ButtonGroup className={classes.box} color="primary">
        <Button onClick={onSortNameAsc}>Class Name ↑</Button>
        <Button onClick={onSortNameDesc}>Class Date ↑</Button>
        <Button onClick={onSortCreatedAsc}>Created ↑</Button>
        <Button onClick={onSortCreatedDesc}>Created ↓</Button>
        <Button onClick={onUpdatedDataBase}>Reload</Button>
      </ButtonGroup>
    </div>
  );
}
