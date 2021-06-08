//Задаем переменные
const API_KEY = "3f170e59-9eeb-4c9f-ba0f-42f9ec2a7fc8";
const API_URL_POPULAR = 
"https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
//Вызываем функцию доступа к базе фильмов
getMovies(API_URL_POPULAR);
//Объявляем ассинхронную функцию
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY, 
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}
//Объявляем функцию выделения цветом поля "рейтинг", в зависимости от оценки
function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote <= 5) {
        return "red";
    } else {
        return "orange";
    }
}
//Объявляем функцию поиска фильмов
function showMovies(data) {
    const moviesEl = document.querySelector(".movies");
// Очищаем предыдущие фильмы
    document.querySelector(".movies").innerHTML = "";
//Объявляем функцию, которая подтягивает информацию о фильме
// и выводит в поле "информация"
    data.films.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
                    <img
                     src="${movie.posterUrlPreview}" 
                    class="movie_cover"
                    alt="${movie.nameRu}"
                    />
                    <div class="movie__cover--darkened"></div>
                </div>
                <div class="movie__info">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.map(
                        (genre) => ` ${genre.genre}`
                    )}</div>
                    ${
                        movie.rating &&
                        `
                    <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
                    `
                    }
                </div>
                `;
                moviesEl.appendChild(movieEl);                
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");
//Объявляем функцию, которая скрывает не отображаемые результаты
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getMovies(apiSearchUrl);

        search.value = "";
    }
});