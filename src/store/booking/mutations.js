export const ADD_BOOKING = (state, booking) => {
    state.bookings.push(JSON.parse(JSON.stringify(booking)));
    localStorage.setItem('bookings',JSON.stringify(state.bookings))
}