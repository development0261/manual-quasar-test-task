export const ADD_USERS = (state, user) => {
    state.users.push(JSON.parse(JSON.stringify(user)));
    localStorage.setItem('users',JSON.stringify(state.users))
}
export const AUTH_USER = (state, user) => {
    state.authUser = user;
    localStorage.setItem('authUser',JSON.stringify(state.authUser))
}
export const LOGOUT_USER = (state) => {
    state.authUser = null;
    localStorage.removeItem('authUser')
}