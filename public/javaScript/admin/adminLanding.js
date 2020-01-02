const deleteItem = options => {
  console.log('url: ', options.url);
  console.log('id: ', options.id);
  axios({
    method: 'delete',
    url: options.url,
    params: options.id,
  })
    .then(function(response) {
      window.location.assign('/adminLanding');
    })
    .catch(function(error) {
      console.log(error);
    });
};
