const checkAuth = () => JSON.parse(window.sessionStorage.getItem('adminHasBeenAuthenticated')) === true

export default checkAuth;