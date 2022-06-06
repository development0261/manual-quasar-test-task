
/* eslint-disable */
export default function auth({ next, Router}) {
    if (!localStorage.getItem('authUser')) {
      return Router.push('/login');
    }
    return next();
  }