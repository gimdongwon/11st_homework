require("../css/home.css");

const backBtn = document.querySelector(".back-btn");
const clock = document.querySelector(".clock");

// 뒤로가기

const back = `<span class="history" route="/">뒤로</span>`;

backBtn.innerHTML = back;

// 시간

function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();
  clock.innerHTML = `<div class="clock">${year}년 ${
    month + 1
  }월 ${day}일 ${hour}시 ${minute}분 ${seconds}초</div>`;
}

setInterval(getTime, 1000);

// drag&drop

$(function () {
  $("#sortable").sortable({
    axis: "x",
    stop: function (event, ui) {
      const linkBoxItem = document.querySelectorAll(".link-box");
      let temp = [];
      linkBoxItem.forEach((item) => {
        temp.push(item.children[0].innerText);
      });
      localStorage.setItem("link-box", JSON.stringify(temp));
    },
  }); // 수평 정렬이니 axis를 x로 설정
  $("#sortable").disableSelection(); // 글씨만 나가는 경우 방지
});

// local storage 순서 저장

if (!localStorage.getItem("link-box")) {
  localStorage.setItem("link-box", JSON.stringify(["알람", "메모", "사진"]));
} else {
  // dom 렌더링 순서 캐치하기 위해 setTimeout 사용.
  setTimeout(() => {
    const temp = document.querySelectorAll(".link-box");
    const item = JSON.parse(localStorage.getItem("link-box"));
    const translate = {
      알람: "/alarm",
      메모: "/memo",
      사진: "/picture",
    };
    for (let i = 0; i < temp.length; i++) {
      temp[i].children[0].innerText = item[i];
      temp[i].children[0].attributes[1].nodeValue = translate[item[i]];
    }
  });
}
