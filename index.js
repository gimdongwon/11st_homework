// load css
require("./css/style.css");

// load js
require("./js/home.js");

// router setting
const { historyRouterPush, initialRoutes } = require("./router.js");

// app dicisiion
const historyAppDiv = document.querySelector("#app");

initialRoutes(historyAppDiv);

function eventLoad() {
  const historyLinker = document.querySelectorAll("span.history");

  historyLinker.forEach((el) => {
    el.addEventListener("click", (evt) => {
      const pathName = evt.target.getAttribute("route");
      historyRouterPush(pathName, historyAppDiv);
      const menu = document.querySelector(".menu");
      if (pathName !== "/") {
        menu.className += " none";
      } else {
        menu.classList.remove("none");
      }
    });
  });
}

window.onload = () => eventLoad();
