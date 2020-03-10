import React from 'react';
import axios from 'axios';
import EditBoard from './EditBoard';

class BoardData extends React.Component {
  state = {
    board: [],
    query: '',
  };

  componentDidMount() {
    this.fetchBoard();
  }

  onUpdatedDataBase = () => {
    this.fetchBoard();
  };

  async fetchBoard() {
    try {
      const url = 'http://localhost:80/aboutCMS';
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      const boardData = data.board.map(member => ({
        id: member.id,
        first_name: member.first_name,
        last_name: member.last_name,
        bio: member.bio,
      }));
      // console.log('board fetch: ', boardData);
      this.setState({ board: boardData });
    } catch (err) {
      console.log(err);
    }
  }

  onSortNameAsc = () => {
    const newBoard = [...this.state.board];
    newBoard.sort(function(a, b) {
      const nameA = a.last_name.toLowerCase();
      const nameB = b.last_name.toLowerCase();
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });
    // console.log(newStudents);
    this.setState({ board: newBoard });
  };

  onSortNameDesc = () => {
    const newBoard = [...this.state.board];
    newBoard.sort(function(a, b) {
      const nameA = a.last_name.toLowerCase();
      const nameB = b.last_name.toLowerCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
    // console.log(newStudents);
    this.setState({ board: newBoard });
  };

  onSortCreatedAsc = () => {
    const newBoard = [...this.state.board];
    newBoard.sort(function(a, b) {
      const numA = a.id;
      const numB = b.id;
      if (numA > numB) {
        return 1;
      }
      if (numA < numB) {
        return -1;
      }
      return 0;
    });
    // console.log(newStudents);
    this.setState({ board: newBoard });
  };

  onSortCreatedDesc = () => {
    const newBoard = [...this.state.board];
    newBoard.sort(function(a, b) {
      const numA = a.id;
      const numB = b.id;
      if (numA < numB) {
        return 1;
      }
      if (numA > numB) {
        return -1;
      }
      return 0;
    });
    // console.log(newStudents);
    this.setState({ board: newBoard });
  };

  searchFieldText = e => {
    this.setState({ query: e.target.value });
  };

  onSearchSubmit = e => {
    this.setState({ board: [] });
    const search_query = this.state.query;
    axios.get(`/aboutQuery?q=${search_query}`).then(res => {
      // console.log(res);
      const boardData = res.data.board.map(member => ({
        id: member.id,
        first_name: member.first_name,
        last_name: member.last_name,
        bio: member.bio,
      }));
      // console.log('board fetch: ', boardData);
      this.setState({ board: boardData });
      this.setState({ query: '' });
    });
  };

  render() {
    const { board, query } = this.state;
    // console.log('in render: ', board);
    return (
      <div>
        <EditBoard
          board={board}
          onUpdatedDataBase={this.onUpdatedDataBase}
          onSortNameAsc={this.onSortNameAsc}
          onSortNameDesc={this.onSortNameDesc}
          onSortCreatedAsc={this.onSortCreatedAsc}
          onSortCreatedDesc={this.onSortCreatedDesc}
          searchFieldText={this.searchFieldText}
          onSearchSubmit={this.onSearchSubmit}
          query={query}
        />
      </div>
    );
  }
}

export default BoardData;
