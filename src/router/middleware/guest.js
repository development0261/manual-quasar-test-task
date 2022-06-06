/* eslint-disable */
export default function guest({ next, Router}) {
    if (localStorage.getItem('authUser')) {
      return Router.push('/dashboard');
    }
     return next();
  }