const login = (username, password) => {
  fetch('http://localhost/api/auth', {
    method: 'POST',
    headers: {
      Authorization: window.btoa(username + ":" + password)
    }
  })
    .then(res => {
      if (res.status === 200)
        window.sessionStorage.setItem('adminHasBeenAuthenticated', true)
  })
  .catch((err) => console.log(err))
}

export default login;