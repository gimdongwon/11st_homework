// load css
require("./css/style.css");
require("./css/home.css");
require("./css/memo.css");
require("./css/alram.css");
require("./css/picture.css");

// load js
require("./js/home.js");

const { picture } = require("./js/picture.js");
const { alarm } = require("./js/alarm.js");
const { memo } = require("./js/memo.js");

// router setting
const { historyRouterPush, initialRoutes } = require("./router.js");

// app dicisiion
const historyAppDiv = document.querySelector("#app");

initialRoutes(historyAppDiv);

window.onload = () => {
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
          memo();
        } else if (pathName == "/alarm") {
          alarmBtn.classList.remove("none");
          alarm();
        } else {
          picture();
        }
      } else {
        menu.classList.remove("none");
        backBtn.className += " none";
        memoBtn.className += " none";
        alarmBtn.className += " none";
      }
    });
  });
};
