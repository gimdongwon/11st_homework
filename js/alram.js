require("../css/alram.css");

const alramBtn = document.querySelector(".alram-create-btn");
const alramUList = document.querySelector(".alram_list");
const alramList = alramUList.getElementsByTagName("li");
const alramViewBtn = document.querySelector(".alarm-view-btn");

alramViewBtn.addEventListener("click", function () {
  document.querySelector(".alram_wrap").classList.remove("none");
});

alramBtn.addEventListener("click", function () {
  const alramFrom = document.getElementById("alram-form");
  const reserved_time = alramFrom.childNodes[3].value;
  const time = parseInt(reserved_time.slice(0, 2));
  const minute = reserved_time.slice(3, 5);
  const day = time <= 12 ? "오전" : "오후";
  const result =
    day + " " + (time <= 12 ? time : time - 12) + "시 " + minute + "분";

  // alram 등록
  createAlarm(result, reserved_time);
  document.querySelector(".alram_wrap").className += " none";
});

function saveLocal() {
  // localStorage 등록
  const localItem = [];
  for (let i = 0; i < alramList.length; i++) {
    localItem.push(
      alramList[i].innerText.slice(0, alramList[i].innerText.length - 2)
    );
  }
  localStorage.setItem("alram", JSON.stringify(localItem));
}

function createAlarm(result, reserved_time) {
  // alarm 글 등록
  const content = result;
  const li = document.createElement("li");
  const button = document.createElement("button");
  li.className += "alramList";
  button.className += "alramDelete";
  const textNode = document.createTextNode(content);
  const buttonNode = document.createTextNode("삭제");
  li.appendChild(textNode);
  button.appendChild(buttonNode);

  button.addEventListener("click", function () {
    alramUList.removeChild(alramList[[alramList.length - 1]]);
    saveLocal();
    // clearTimeout(check); // index를 넘어주면 무한루프 빠짐.. 노드는 삭제하나 알람이 안 멈춤.
  });

  li.appendChild(button);
  document.querySelector(".alram_list").appendChild(li);

  // alram alert 설정
  let delay = 1000 * 30; // 30초에 한번씩 확인
  function check() {
    if (
      new Date().getHours().toString() + new Date().getMinutes().toString() ==
      reserved_time.slice(0, 2) + minute
    ) {
      alert(`${reserved_time.slice(0, 2)}시 ${minute}분 입니다.!`);
      // alert 확인하고 alram 삭제
      for (let i = 0; i < alramList.length; i++) {
        if (
          alramList[i].innerText.indexOf(
            (new Date().getHours() > 12
              ? new Date().getHours() - 12
              : new Date().getHours()
            ).toString() +
              "시 " +
              new Date().getMinutes().toString()
          ) > -1
        ) {
          alramUList.removeChild(alramList[[i]]);
        }
      }
      clearTimeout(check);
    } else {
      setTimeout(check, delay);
    }
  }
  setTimeout(check, delay);
  saveLocal();
}

if (localStorage.getItem("alram")) {
  const localItem = JSON.parse(localStorage.getItem("alram"));
  for (let i = 0; i < localItem.length; i++) {
    let reserved_time = "";
    if (localItem[i].slice(0, 2) === "오전") {
      reserved_time =
        "0" + localItem[i].slice(3, 4) + ":" + localItem[i].slice(6, 8);
    } else {
      reserved_time =
        (parseInt(localItem[i].slice(3, 5)) + 12).toString() +
        ":" +
        localItem[i].slice(6, 8);
    }
    createAlarm(localItem[i], reserved_time);
  }
}
