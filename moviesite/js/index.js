import { createCard } from "./createcard.js";
import { searchEvent } from "./searchevent.js";

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
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODdlNjM3ZTFkZDQzMThmYjUzMTRjODNmMDQzNGMxMiIsInN1YiI6IjY2MjhiN2Y3MTc2YTk0MDE0YzgxYTg1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LWD-SlE-6FP5DHc3JEdFWnh1EDCuvVKZYZzoCAJvZiQ",
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
