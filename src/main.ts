import { createNavbar } from "./components/navbar.js";
console.log(createNavbar());
const app = document.querySelector("#app");

if (app) {
  const navbar = createNavbar();
  app.appendChild(navbar);
}
// alert("bhjb");
