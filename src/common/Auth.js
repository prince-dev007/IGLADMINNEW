export const getIsLoggedIn = () => localStorage.getItem('isAuth') === 'true' ? true : false;
export const logIn = () => localStorage.setItem('isAuth', true);
export const logOut = () => localStorage.setItem('isAuth', false);