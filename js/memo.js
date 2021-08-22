require("../css/memo.css");

const app = document.getElementById("app");

app.innerHTML = `
<div class="memo_wrap none">
    <form class="memo_form" onsubmit="return false;">
      <label for="content"></label>
      <input
        id="memo_content"
        type="text"
        placeholder="메모를 입력하세요."
        value=""
      />
      <button class="memo-create-btn none"></button>
    </form>
</div>
<div class="memo_list_wrap">
  <ul class="memo_list"></ul>
</div>
`;

// input 창 보이기
document.querySelector(".memo-btn").addEventListener("click", function () {
  document.querySelector(".memo_wrap").classList.remove("none");
});

// 메모 생성 이벤트 등록
const memoCreateBtn = document.querySelector(".memo-create-btn");
memoCreateBtn.addEventListener("click", createMemo);

function createMemo() {
  // input 값 가져오기
  let form_data = document.querySelector(".memo_form");

  // input을 게시글로 생성
  const content = form_data.childNodes[3].value;
  const li = document.createElement("li");
  li.className += "memoList";
  const textNode = document.createTextNode(content);
  li.appendChild(textNode);
  document.querySelector(".memo_list").appendChild(li);
  form_data.childNodes[3].value = "";

  // 완료 후 input창 제거
  document.querySelector(".memo_wrap").className += " none";

  // localStorage에 저장
  const memos = document.querySelectorAll(".memo_list");
  localStorage.setItem("memos", JSON.stringify(memos[0].childNodes));
}

if (localStorage.getItem("memos")) {
  console.log(JSON.parse(localStorage.getItem("memos")));
}
