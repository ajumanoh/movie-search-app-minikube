const API_URL_PREFIX = 'https://api.themoviedb.org/3/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w200';
const VIDEO_URL_PREFIX = 'https://www.youtube.com/embed/';

/* Greet user based on the time */
const time = new Date().getHours();
let greeting;
let userName = '<%= user %>'
if (time < 12) {
    greeting = "Good Morning";
} else if (time < 16) {
    greeting = "Good Afternoon";
} else {
    greeting = "Good Evening";
}
document.getElementById("greet").innerHTML = greeting;

//generate api url based on user action. Path varies for movie list and video
function generateUrl(path, apiKey) {
    return `${API_URL_PREFIX}${path}?api_key=${apiKey}`;
}

// Select Element from Document Object Model (DOM)
const searchButton = document.querySelector('#search');
const movieName = document.querySelector('#movieName');
const movieSearchable = document.querySelector('#movies-searchable')

/* Logic to search movie when search button is clicked after typing the movie name */
searchButton.onclick = function (event) {

    event.preventDefault();   // This is to prevent the page from getting refreshed after button click

    getApiKey()
        .then(apiKey => setUrl(apiKey))
        .then(newUrl => fetchMovie(newUrl))
        .catch(err => console.log("Error getting API Key: " + err));

    //Set api url to fetch movie list
    function setUrl(apiKey) {
        const path = 'search/movie';
        return generateUrl(path, apiKey) + '&query=' + movieName.value;
    }

    //fetch movie list
    function fetchMovie(newUrl) {
        fetch(newUrl)
            .then((res) => res.json())
            .then(searchMovies)
            .catch((error) => {
                console.log('Error:', error);
            });
        movieName.value = '';   //Clear the movie name after clicking the search button
    }
}

// get api key from server
async function getApiKey() {
    return await fetch('/apikey')
        .then(res => res.json())
        .then(json => json.apiKey)
        .catch((error) => console.log('Error: ', error));
};

function searchMovies(data) {
    movieSearchable.innerHTML = '';  // This is to clear the old dynamically generated html. Else the prior results stays in the page 
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
}

// Create movie sections for all the movies return from the API
function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
        <section class="section">
            ${movieSection(movies)}
        </section>
        <div class="content" "content-display">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

/* Prefix the image URL from API with the movie poster path. 
Followed the API documentation present in API site.
*/
function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {      /* Some images doesn't exist in the path returned by the API. Excluding those... */
            return `<img 
                src=${IMAGE_URL + movie.poster_path} 
                data-movie-id=${movie.id}/>`;
        }
    })

}

// Embed video when user clicks on a particular image 
document.onclick = function (event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        const movieId = target.dataset.movieId;
        const section = event.target.parentElement; // section
        const content = section.nextElementSibling; // content
        content.classList.add('content-display');

        getApiKey()
            .then(apiKey => setUrl(apiKey))
            .then(data => fetchVideo(data))
            .catch(err => console.log("Error getting Video: " + err));

        function setUrl(apiKey) {
            const path = `/movie/${movieId}/videos`;
            return generateUrl(path, apiKey);
        }

        //fetch movie videos
        function fetchVideo(url) {
            fetch(url)
                .then((res) => res.json())
                .then((data) => createVideoTemplate(data, content))
                .catch((error) => {
                    console.log('Error:', error);
                });
        }

    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
}

// Video Template creation logic.
function createVideoTemplate(data, content) {
    content.innerHTML = '<p id="content-close">X</p>';
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');

    for (let i = 0; i < videos.length; i++) {
        const video = videos[i]; // video
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}

// To embed youtube link and video from the API
function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `${VIDEO_URL_PREFIX}${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}
