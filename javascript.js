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

const newMovie = (title, genre, rating, watched) => {
  const getTitle = () => title
  const getGenre = () => capitalizeFirstLetter(genre)
  const getWatched = () => {
    if (watched) {
      return "✔ Watched"
    } else {
      return "✘ Not Watched"
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
    getGenre,
    getWatched,
    getGenreImage,
    getRatingPattern,
    displayMovie,
    toggleWatched,
  }
}

const myMovies = newLibrary()
const morbius = newMovie("Morbius", "thriller", 4, false)
const tropicThunder = newMovie("Tropic Thunder", "comedy", 5, true)
const shrek = newMovie("Shrek", "animation", 1, true)
myMovies.addMovie(morbius)
myMovies.addMovie(tropicThunder)
myMovies.addMovie(morbius)
myMovies.addMovie(shrek)
myMovies.addMovie(
  newMovie("Charlie and the Chocolate Factory", "horror", 3, false)
)
myMovies.addMovie(newMovie("Bridesmaids", "comedy", 5, false))
console.log(myMovies.listMovies())

const movieToToggle = myMovies.getMovie("Morbixus")
if (movieToToggle) {
  movieToToggle.toggleWatched()
}

myMovies.removeMovie("Tropic Thunder")
myMovies.removeMovie("Chicken Little")
myMovies.removeMovie("Tropic Thunder")

console.log(myMovies.listMovies())

// TEMP make movie cards for each movie in the library
const appendMovieCard = (movie) => {
  const html = `
    <div class="movie-card">
      <div class="movie-card-text">
        <p style="font-weight: bold">${movie.getTitle()} (Year)</p>
        <p>Genre: ${movie.getGenre()}</p>
        <p class="rating">
          Rating:  
          ${movie.getRatingPattern()}
        </p>
        <p>
          <div class="watched">${movie.getWatched()}</div>
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
      <div class="edit-movie">
        <img src="./images/edit.svg" class="edit-movie-img">
      </div>
    </div>
  `

  const movieCardContainer = document.querySelector(".movie-cards")
  movieCardContainer.innerHTML += html
}

for (const movie of myMovies.listMovies()) {
  appendMovieCard(movie)
}

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
