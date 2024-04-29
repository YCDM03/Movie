import token from "./config/token.js";

//img, title, overview, vote average, id등 총 5가지(이상)의 데이터가 element에 담겨 전달
//5가지의 데이터로 동적으로 만든 html태그의 내용을 채운 후 Card로 만들어 movie_list에 append함
function createCard(element) {
  let movie_card = document.createElement("div");
  movie_card.className = "movie_card";

  let img = document.createElement("img");
  img.className = "poster";
  img.setAttribute("src", img_url + element.backdrop_path);
  img.setAttribute("alt", element.title);
  img.id = element.id;

  let movie_title = document.createElement("div");
  movie_title.className = "movie_title";
  movie_title.innerHTML = element.title;

  let movie_overview = document.createElement("div");
  movie_overview.className = "movie_overview";
  movie_overview.innerHTML = element.overview;

  let vote_average = document.createElement("div");
  vote_average.className = "vote_average";
  vote_average.innerHTML = "rating : " + "⭐" + element.vote_average;

  movie_card.addEventListener("click", (e) => {
    alert("영화 id : " + element.id);
  });
  movie_list.appendChild(movie_card);
  movie_card.append(img, movie_title, movie_overview, vote_average);
}

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
};

//index.html에서 가져온 태그들
const movie_list = document.querySelector(".movie_list");
const search_input = document.querySelector(".search_input");
const search_btn = document.querySelector(".search_btn");
const body = document.querySelector("body");

//DOM구축 후 검색창에 focus하는 코드
document.addEventListener("DOMContentLoaded", (e) => {
  search_input.focus();
});

//검색 input창에서 엔터 입력으로도 검색이 되게끔 하는 코드
//검색 input창에서 엔터 입력시 검색창의 버튼을 누르는 것과 같음
search_btn.addEventListener("click", searchEvent);
search_input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    search_btn.click();
  }
});

//img가져올 때 기본 경로(img 경로 구성:1+2+3, 그중 1번)
const img_url = "https://image.tmdb.org/t/p/w500/";

//fetch옵션
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: token,
  },
};

//fetch요청, 영화api사이트의 1page의 내용을 받아 createCard함수로 화면에 카드를 만들어 뿌려줌
const result = fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    let results = data.results;
    results.forEach((element) => {
      createCard(element);
    });
  })
  .catch((err) => console.error(err));

export { img_url, movie_list, search_input };
