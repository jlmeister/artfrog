const convertDate = () => {
  let classDate = document.getElementById('classDate').innerHTML;
  console.log(classDate);
  const date = moment(classDate).format('MM-DD-YYYY');
  console.log(date);
  classDate = date;
};

convertDate();
