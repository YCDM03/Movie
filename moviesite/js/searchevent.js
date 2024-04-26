import { search_input } from "./index.js";
import { movie_list } from "./index.js";

//검색조건에 맞는 Card를 제외한 나머지를 display:none으로 하는 함수(검색한 Card만 보이게끔)
const searchEvent = (e) => {
  // (class=movie_card인)카드를 모아서 배열에 담음
  const card_items = [...document.querySelectorAll(".movie_card")];

  // 사용자가 검색창에 입력한 값
  let value = search_input.value;

  // 검색 조건에 맞는 요소만 모아서 배열로 만듦, 대소문자 구분 없이 입력가능
  let find_items = card_items.filter((e) => {
    return e
      .querySelector(".movie_title")
      .innerHTML.toLowerCase()
      .includes(value.toLowerCase())
      ? true
      : false;
  });

  // 검색 결과가 없을경우 alert
  if (find_items.length == 0 || !value) {
    return alert("찾는 결과가 없습니다.");
  }

  // 모든 카드의 클래스를 초기화하고, display:none
  movie_list.querySelectorAll(".movie_card").forEach((e) => {
    e.classList = "movie_card";
    e.style = "display:none";
  });

  // 검색으로 찾은 카드의 스타일을 초기화하고, 클래스 리스트에 searched추가하고 display 활성화
  find_items.forEach((e) => {
    e.style = "";
    e.classList = "movie_card searched";
  });

  // input창 입력 값 초기화
  // search_input.value = "";
};

export { searchEvent };
