require("../css/picture.css");
const app = document.getElementById("app");

// app.innerHTML = `

// `;

const pictureWrap = document.querySelector(".picture_wrap");
// const temp = pictureWrap.children;

const picture = document.querySelectorAll(".picture");
for (let i = 0; i < picture.length; i++) {
  picture[i].addEventListener("click", function () {
    if (picture[i].getAttribute("class") != "active") {
      for (let j = 0; j < picture.length; j++) {
        picture[j].classList.remove("active");
      }
      picture[i].classList += " active";
    } else {
      picture[i].classList.remove("active");
    }
    document.querySelector(
      ".selected-picture"
    ).innerHTML = `<img src=${picture[i].src}></img>`;
  });
}
