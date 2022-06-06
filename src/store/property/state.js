export default function () {
  return {
    properties:JSON.parse(localStorage.getItem("properties") || "[]"),
  }
}
