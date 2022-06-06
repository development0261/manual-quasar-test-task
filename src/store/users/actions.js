
export function registerUser({ commit },user)
{

    commit('ADD_USERS',user)    
}

export const loginUser = ({ commit },user) =>
{
  commit('AUTH_USER',user);
}

export const logoutUser = ({ commit}) =>
{
    commit('LOGOUT_USER');
}