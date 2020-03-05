import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '15px',
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
        <Button onClick={onSortNameAsc}>Last Name ↑</Button>
        <Button onClick={onSortNameDesc}>Last Name ↓</Button>
        <Button onClick={onSortCreatedAsc}>Created ↑</Button>
        <Button onClick={onSortCreatedDesc}>Created ↓</Button>
        <Button onClick={onUpdatedDataBase}>Reload</Button>
      </ButtonGroup>
    </div>
  );
}
