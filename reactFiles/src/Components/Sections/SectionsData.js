import React from 'react';
import axios from 'axios';
import moment from 'moment';
import EditSections from './EditSections';

class SectionsData extends React.Component {
  state = {
    sections: [],
    query: '',
  };

  componentDidMount() {
    this.fetchSections();
  }

  onUpdatedDataBase = () => {
    this.fetchSections();
  };

  async fetchSections() {
    try {
      const url = 'http://localhost:80/classesCMS';
      const response = await fetch(url);
      const data = await response.json();
      const sectionsData = data.classes.map(section => ({
        id: section.class_id,
        section_name: section.class_name,
        description: section.description,
        date: moment(section.date).format('MM-DD-YYYY'),
        start_time: section.start_time,
        end_time: section.end_time,
      }));

      this.setState({ sections: sectionsData });
    } catch (err) {
      console.log(err);
    }
  }

  onSortNameAsc = () => {
    const newSections = [...this.state.sections];
    newSections.sort(function(a, b) {
      const nameA = a.section_name.toLowerCase();
      const nameB = b.section_name.toLowerCase();
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });

    this.setState({ sections: newSections });
  };

  onSortNameDesc = () => {
    const newSections = [...this.state.sections];
    newSections.sort(function(a, b) {
      const nameA = a.date.toLowerCase();
      const nameB = b.date.toLowerCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });

    this.setState({ sections: newSections });
  };

  onSortCreatedAsc = () => {
    const newSections = [...this.state.sections];
    newSections.sort(function(a, b) {
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

    this.setState({ sections: newSections });
  };

  onSortCreatedDesc = () => {
    const newSections = [...this.state.sections];
    newSections.sort(function(a, b) {
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

    this.setState({ sections: newSections });
  };

  searchFieldText = e => {
    this.setState({ query: e.target.value });
  };

  onSearchSubmit = e => {
    this.setState({ sections: [] });
    const search_query = this.state.query;
    axios.get(`/classesQuery?q=${search_query}`).then(res => {
      console.log(res);
      const sectionsData = res.data.classes.map(section => ({
        id: section.class_id,
        section_name: section.class_name,
        description: section.description,
        date: moment(section.date).format('MM-DD-YYYY'),
        start_time: section.start_time,
        end_time: section.end_time,
      }));

      this.setState({ sections: sectionsData });
      this.setState({ query: '' });
    });
  };

  render() {
    const { sections, query } = this.state;

    return (
      <div>
        <EditSections
          sections={sections}
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

export default SectionsData;
