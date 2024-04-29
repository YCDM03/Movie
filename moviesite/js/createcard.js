import { img_url } from "./index.js";
import { movie_list } from "./index.js";

//main에 들어갈 카드를 만드는 함수
//img, title, overview, vote average, id등 총 5가지(이상)의 데이터가 element에 담겨 전달
//5가지의 데이터로 동적으로 만든 html태그의 내용을 채운 후 Card로 만들어 movie_list에 append함
export function createCard(element) {
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
