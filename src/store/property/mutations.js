export const ADD_PROPERTY = (state, property) => {
    state.properties.push(JSON.parse(JSON.stringify(property)));
    localStorage.setItem('properties',JSON.stringify(state.properties))
}