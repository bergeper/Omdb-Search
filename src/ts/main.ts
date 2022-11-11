import axios from "axios";
import { IMovie } from "./models/IMovie";
import { IOmdbResponse } from "./models/IOmdbResponse";

window.addEventListener("load", () => {
  searchContainer.appendChild(searchHeading);
  searchContainer.appendChild(searchInformation);
  searchDiv.appendChild(searchBar);
  searchDiv.appendChild(searchButton);

  searchContainer.appendChild(searchDiv);
  container.appendChild(searchContainer);
  searchContent.appendChild(searchResultDiv);
  container.appendChild(searchContent);
});

let container: HTMLDivElement = document.getElementById(
  "root"
) as HTMLDivElement;

//Content before Searchbar
let searchContainer: HTMLDivElement = document.createElement("div");
let searchHeading: HTMLHeadElement = document.createElement("h2");
let searchInformation: HTMLParagraphElement = document.createElement("p");

searchContainer.classList.add("hero");
searchHeading.classList.add("hero__heading");
searchInformation.classList.add("hero__info");

searchHeading.innerText = "Hello There!";
searchInformation.innerText = "Search for a movie";

// Search-bar n button
let searchDiv: HTMLDivElement = document.createElement("div");
let searchBar: HTMLInputElement = document.createElement("input");
let searchButton: HTMLButtonElement = document.createElement("button");

searchDiv.classList.add("search");
searchBar.classList.add("search__bar");
searchButton.classList.add("search__btn");

searchButton.type = "sumbit";
searchBar.type = "text";

searchButton.innerHTML = "Search";

//Display Search Result
let searchResultDiv: HTMLDivElement = document.createElement("div");
searchResultDiv.classList.add("result");

//Container for lower section
let searchContent: HTMLDivElement = document.createElement("div");
searchContent.classList.add("content");

// Search for a movie
searchButton.addEventListener("click", () => {
  axios
    .get<IOmdbResponse>(
      "http://omdbapi.com?apikey=8a61fbc3&s=" + searchBar.value
    )
    .then((response) => {
      loadResult(response.data.Search);
      searchBar.value = "";
    });
});

function loadResult(searchMovie: IMovie[]) {
  searchResultDiv.innerHTML = "";
  for (let i = 0; i < searchMovie.length; i++) {
    let searchMovieDiv: HTMLDivElement = document.createElement("div");
    let searchMovieTitle: HTMLHeadingElement = document.createElement("h3");
    let searchMoviePosterDiv: HTMLDivElement = document.createElement("div");
    let searchMoviePoster: HTMLImageElement = document.createElement("img");
    let searchMovieYear: HTMLHeadingElement = document.createElement("h3");

    searchMovieDiv.classList.add("card");
    searchMovieTitle.classList.add("card__title");
    searchMoviePosterDiv.classList.add("card__img");
    searchMoviePoster.classList.add("card__img--img");
    searchMovieYear.classList.add("card__year");

    searchMovieTitle.innerHTML = searchMovie[i].Title;
    searchMoviePoster.src = searchMovie[i].Poster;
    searchMoviePoster.alt = searchMovie[i].Title;
    searchMovieYear.innerHTML = searchMovie[i].Year;

    searchMovieDiv.appendChild(searchMovieTitle);
    searchMovieDiv.appendChild(searchMoviePosterDiv);
    searchMoviePosterDiv.appendChild(searchMoviePoster);
    searchMovieDiv.appendChild(searchMovieYear);

    searchResultDiv.appendChild(searchMovieDiv);
  }
}
