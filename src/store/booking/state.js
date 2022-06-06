export default function () {
  return {
    bookings:JSON.parse(localStorage.getItem("bookings") || "[]"),
  }
}
