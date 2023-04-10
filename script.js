const API_URL ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7ce0b8667ca92d471f15bae89df8711e&page=1'
const IMG_path = 'https://image.tmdb.org/t/p/w1280'
const Search_url ='https://api.themoviedb.org/3/search/movie?api_key=7ce0b8667ca92d471f15bae89df8711e&query="'

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

async function getMovie(url){
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}
getMovie(API_URL)

const showMovies = (movies) => {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {title,poster_path,vote_average,overview } = movie
        const movieElm = document.createElement('div')
        movieElm.classList.add('movie')
        movieElm.innerHTML = `
            <img src="${IMG_path + poster_path}"  alt="${title}">
            <div class="movie-info">
                <h4>${title}</h4>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieElm)
    });
}
const getClassByRate = (vote) =>{
    if (vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}
form.addEventListener('submit',(e) =>{
    e.preventDefault()
    const searchTerms = search.value 
    if(searchTerms && searchTerms !==''){
        getMovie(Search_url + searchTerms)
        search.value = ''

    }else{
        window.location.reload()
    }
})