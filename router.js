// template

const homeTemplate = require("./pages/home.hbs");
const alarmTemplate = require("./pages/alarm.hbs");
const memoTemplate = require("./pages/memo.hbs");
const pictureTemplate = require("./pages/picture.hbs");

const Home = homeTemplate();
const Alarm = alarmTemplate();
const Memo = memoTemplate();
const Picture = pictureTemplate();

// const { eventLoad } = require("./index.js");

const routes = {
  "/": Home,
  "/alarm": Alarm,
  "/memo": Memo,
  "/picture": Picture,
};

// entry point
function initialRoutes(el) {
  renderHTML(el, routes["/"]);
  window.onpopstate = () => renderHTML(el, routes[window.location.pathname]);
}

// set browser history
function historyRouterPush(pathName, el) {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(el, routes[pathName]);
}

// render
function renderHTML(el, route) {
  el.innerHTML = route;
}

module.exports = {
  initialRoutes,
  historyRouterPush,
};
