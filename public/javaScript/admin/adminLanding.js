const deleteItem = options => {
  console.log('url: ', options.url);
  console.log('id: ', options.id);
  axios({
    method: 'delete',
    url: options.url,
    params: options.id,
  })
    .then((window.location.href = '/admin/panel'))
    // .then(window.location.reload(false))
    // .then(window.location.assign('/admin/panel'))
    .catch(function(error) {
      console.log(error);
    });
};
