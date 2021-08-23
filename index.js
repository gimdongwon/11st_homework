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
      const backBtn = document.querySelector(".back-btn");
      const memoBtn = document.querySelector(".memo-btn");
      const alarmBtn = document.querySelector(".alarm-view-btn");
      if (pathName !== "/") {
        menu.className += " none";
        backBtn.classList.remove("none");
        if (pathName == "/memo") {
          memoBtn.classList.remove("none");
          require("./js/memo.js");
        } else if (pathName == "/alarm") {
          alarmBtn.classList.remove("none");
          require("./js/alram.js");
        } else {
          alarmBtn.className += " none";
          require("./js/picture.js");
        }
      } else {
        menu.classList.remove("none");
        backBtn.className += " none";
        memoBtn.className += " none";
        alarmBtn.className += " none";
      }
    });
  });
}

window.onload = () => eventLoad();
