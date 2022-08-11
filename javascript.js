const genreImageList = {
  action: "./images/icons-03.svg",
  mystery: "./images/icons-04.svg",
  classic: "./images/icons-05.svg",
  default: "./images/icons-06.svg",
  drama: "./images/icons-07.svg",
  horror: "./images/icons-08.svg",
  comedy: "./images/icons-09.svg",
  sports: "./images/icons-10.svg",
  scifi: "./images/icons-11.svg",
  musical: "./images/icons-12.svg",
  fantasy: "./images/icons-14.svg",
  romance: "./images/icons-15.svg",
  animation: "./images/icons-17.svg",
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const newLibrary = () => {
  const movies = []

  const addMovie = (movie) => {
    for (const existingMovie of movies) {
      if (existingMovie.getTitle() == movie.getTitle()) {
        // Do not add movie to library
        return
      }
    }

    movies.push(movie)
  }

  const listMovies = () => {
    return movies.map((movie) => {
      return movie
    })
  }

  const removeMovie = (title) => {
    const movieTitles = movies.map((movie) => {
      return movie.getTitle()
    })

    const removeIndex = movieTitles.indexOf(title)
    if (removeIndex == -1) {
      //Movie is not in library, do nothing
      console.log("Can't find movie lmao", title)
      return
    } else {
      movies.splice(removeIndex, 1)
    }
  }

  const getMovie = (title) => {
    for (const movie of movies) {
      if (movie.getTitle() == title) {
        return movie
      }
    }
  }

  return { addMovie, listMovies, removeMovie, getMovie }
}

const newMovie = (title, year, genre, rating, watched) => {
  const getTitle = () => title
  const getYear = () => {
    if(year) {
      return `(${year})`
    } else {
      return ""
    }
  }
  
  const getGenre = () => capitalizeFirstLetter(genre)
  const getWatched = () => {
    if (watched) {
      return "Watched"
    } else {
      return "Not Watched"
    }
  }
  const getWatchedThings = () => {
    if (watched) {
      return ["#5fc195", "./images/checkmark.svg"]
    } else {
      return ["#c15f5f", "./images/cross.svg"]
    }
  }

  const getGenreImage = () => {
    if (genreImageList[genre]) {
      return genreImageList[genre]
    } else {
      return genreImageList["default"]
    }
  }

  const getRatingPattern = () => {
    let text = ""
    for (let i = 1; i <= rating; i++) {
      text += `<img src="./images/blueberry.svg" class="blueberry" />`
    }
    return text
  }

  const displayMovie = () => {
    return `"${title}", genre: ${genre}, rating: ${rating}, watched: ${watched}`
  }

  const toggleWatched = () => {
    watched = !watched
  }

  return {
    getTitle,
    getYear,
    getGenre,
    getWatched,
    getWatchedThings,
    getGenreImage,
    getRatingPattern,
    displayMovie,
    toggleWatched,
  }
}

const myMovies = newLibrary()
const morbius = newMovie("Morbius", 2022, "action", 5, false)
const tropicThunder = newMovie("Tropic Thunder", 2008, "comedy", 5, true)
const shrek = newMovie("Shrek", 2001, "animation", 5, true)
myMovies.addMovie(morbius)
myMovies.addMovie(tropicThunder)
myMovies.addMovie(morbius)
myMovies.addMovie(shrek)
myMovies.addMovie(
  newMovie("Charlie and the Chocolate Factory", 2005, "horror", 3, false)
)
myMovies.addMovie(newMovie("Bridesmaids", 2011, "comedy", 5, false))
myMovies.addMovie(newMovie("The Notebook", 2004, "romance", 3, true))
myMovies.addMovie(newMovie("Citizen Kane", 1941, "classic", 2, true))
console.log(myMovies.listMovies())

const movieToToggle = myMovies.getMovie("Morbixus")
if (movieToToggle) {
  movieToToggle.toggleWatched()
}

console.log(myMovies.listMovies())

// TEMP make movie cards for each movie in the library
const appendMovieCard = (movie) => {
  const html = `
    <div class="movie-card" data-title="${movie.getTitle()}">
      <div class="movie-card-text">
        <p style="font-weight: bold">${movie.getTitle()}  ${movie.getYear()}</p>
        <p>Genre: ${movie.getGenre()}</p>
        <p class="rating">
          Rating:  
          ${movie.getRatingPattern()}
        </p>
        <p>
          <div class="watched"> 
          <div class="watched-icon-container" style="background-color: ${
            movie.getWatchedThings()[0]
          };" >
            <img src=${movie.getWatchedThings()[1]} class="watched-icon">
          </div>
          <div class="watched-text">${movie.getWatched()}</div>
          </div>
        </p>
      </div>
      <div class="movie-card-img">
        <img class="film-svg" src="./images/film.svg" />
        <div class="genre-svg-container">
          <img class="genre-svg" src=${movie.getGenreImage()} />
        </div>
      </div>
      <div class="remove-movie">
        <img src="./images/trash.svg" class="remove-movie-img">
      </div>
      
    </div>
  `

  const movieCardContainer = document.querySelector(".movie-cards")
  movieCardContainer.innerHTML += html
}

const refreshMovieDisplay = () => {
  const movieCardContainer = document.querySelector(".movie-cards")
  movieCardContainer.innerHTML = ""

  for (const movie of myMovies.listMovies()) {
    appendMovieCard(movie)
  }
}

const connectWatchedFunction = () => {
  const watchedIcons = document.getElementsByClassName("watched-icon-container")
  for (const icon of watchedIcons) {
    icon.addEventListener("click", whatHappensWhenYouClickWatched)
  }
}

const whatHappensWhenYouClickWatched = (event) => {
  const container = event.target.closest(".movie-card")
  const movie = myMovies.getMovie(container.dataset.title)
  movie.toggleWatched()
  updatePage()
}

const connectRemoveFunction = () => {
  const removeIcons = document.getElementsByClassName("remove-movie")
  for (const icon of removeIcons) {
    icon.addEventListener("click", whatHappensWhenYouClickRemove)
  }
}

const whatHappensWhenYouClickRemove = (event) => {
  const container = event.target.closest(".movie-card")
  myMovies.removeMovie(container.dataset.title)
  updatePage()
}

const updatePage = () => {
  refreshMovieDisplay()
  connectWatchedFunction()
  connectRemoveFunction()
}

updatePage()

// Get the modal
const modal = document.querySelector(".modal")

// Get the button that opens the modal
const addMovieButton = document.getElementById("add-movie-btn")

// Get the <span> element that closes the modal
const closeButton = document.getElementsByClassName("close")[0]

// When the user clicks the button, open the modal
addMovieButton.addEventListener("click", () => {
  modal.style.display = "block"
})

// When the user clicks on <closeButton> (x), close the modal
closeButton.addEventListener("click", () => {
  closeForm()
})

const submitForm = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = new FormData(form)

  const title = formData.get("movie-title")
  const year = formData.get("movie-year")
  const genre = formData.get("movie-genre")
  const rating = formData.get("movie-rating")
  let watched = false
  if (formData.get("movie-watched")) {
    watched = true
  }
  const movie = newMovie(title, year, genre, rating, watched)

  myMovies.addMovie(movie)
  updatePage()
  form.reset()
  closeForm()
}

const closeForm = () => {
  modal.style.display = "none"
}

const movieForm = document.getElementById("add-movie-form")
movieForm.addEventListener("submit", submitForm)

// Object constructor example
// function Book(author, title, pages, read) {
//     this.author = author
//     this.title = title
//     this.pages = pages
//     this.read = read
// }

// Book.prototype.displayBooks = function () {
//     console.log(`${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}`)
// }

// Book.prototype.addBookToLibrary = function () {

// }

// const sampleBook = new Book("me", "my life", 200, true)
// sampleBook.displayBooks()

// const book2 = new Book("Briney", "Cute Book", 900, false)
// book2.displayBooks()
// sampleBook.displayBooks()

// Class example
// class Booky {

//     constructor(author, title, pages, read) {
//         this.author = author
//         this.title = title
//         this.pages = pages
//         this.read = read
//     }

//     displayBooks() {
//         console.log(`${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}`)
//     }
// }

// const booky = new Booky("Acey", "Cuter book", 300, true)
// booky.displayBooks()
