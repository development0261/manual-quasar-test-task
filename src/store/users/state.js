export default function () {
  return {
    users:JSON.parse(localStorage.getItem("users") || "[]"),
    authUser:JSON.parse(localStorage.getItem("authUser") || null),
  }
}
