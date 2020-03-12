import React from 'react';
import axios from 'axios';
import moment from 'moment';
import EditStudents from './EditStudents';

class StudentsData extends React.Component {
  state = {
    students: [],
    query: '',
  };

  componentDidMount() {
    this.fetchStudents();
  }

  onUpdatedDataBase = () => {
    this.fetchStudents();
  };

  async fetchStudents() {
    try {
      const url = 'http://localhost:80/students';
      const response = await fetch(url);
      const data = await response.json();
      const studentsData = data.students.map(student => ({
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        guardian_first_name: student.guardian_first_name,
        guardian_last_name: student.guardian_last_name,
        student_DOB: moment(student.student_DOB).format('MM-DD-YYYY'),
        phone: student.phone,
        email: student.email,
        address: student.address,
        city: student.city,
        state: student.state,
        zip: student.zip,
        alt_first_name: student.alt_first_name,
        alt_last_name: student.alt_last_name,
        alt_phone: student.alt_phone,
        photo_permission: student.photo_permission,
      }));

      this.setState({ students: studentsData });
    } catch (err) {
      console.log(err);
    }
  }

  onSortNameAsc = () => {
    const newStudents = [...this.state.students];
    newStudents.sort(function(a, b) {
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

    this.setState({ students: newStudents });
  };

  onSortNameDesc = () => {
    const newStudents = [...this.state.students];
    newStudents.sort(function(a, b) {
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

    this.setState({ students: newStudents });
  };

  onSortCreatedAsc = () => {
    const newStudents = [...this.state.students];
    newStudents.sort(function(a, b) {
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

    this.setState({ students: newStudents });
  };

  onSortCreatedDesc = () => {
    const newStudents = [...this.state.students];
    newStudents.sort(function(a, b) {
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

    this.setState({ students: newStudents });
  };

  searchFieldText = e => {
    this.setState({ query: e.target.value });
  };

  onSearchSubmit = e => {
    this.setState({ students: [] });
    const search_query = this.state.query;
    axios.get(`/studentsQuery?q=${search_query}`).then(res => {
      const studentsData = res.data.students.map(student => ({
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        guardian_first_name: student.guardian_first_name,
        guardian_last_name: student.guardian_last_name,
        student_DOB: moment(student.student_DOB).format('MM-DD-YYYY'),
        phone: student.phone,
        email: student.email,
        address: student.address,
        city: student.city,
        state: student.state,
        zip: student.zip,
        alt_first_name: student.alt_first_name,
        alt_last_name: student.alt_last_name,
        alt_phone: student.alt_phone,
        photo_permission: student.photo_permission,
      }));

      this.setState({ students: studentsData });
      this.setState({ query: '' });
    });
  };

  render() {
    const { students, query } = this.state;
    return (
      <div>
        <EditStudents
          students={students}
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

export default StudentsData;
