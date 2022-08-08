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
      return movie.displayMovie()
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
        if(movie.getTitle() == title) {
            return movie
        }
    }
  }

  return { addMovie, listMovies, removeMovie, getMovie }
}

const newMovie = (title, genre, rating, watched) => {
  const getTitle = () => title

  const displayMovie = () => {
    return `"${title}", genre: ${genre}, rating: ${rating}, watched: ${watched}`
  }

  const toggleWatched = () => {
    watched = !watched
  }

  return { getTitle, displayMovie, toggleWatched }
}

const myMovies = newLibrary()
const morbius = newMovie("Morbius", "thriller", 10, false)
const tropicThunder = newMovie("Tropic Thunder", "comedy", 10, true)
const shrek = newMovie("Shrek", "anime", 10, true)
myMovies.addMovie(morbius)
myMovies.addMovie(tropicThunder)
myMovies.addMovie(morbius)
myMovies.addMovie(shrek)
console.log(myMovies.listMovies())

const movieToToggle = myMovies.getMovie("Morbixus")
if (movieToToggle) {
    movieToToggle.toggleWatched()
}

myMovies.removeMovie("Tropic Thunder")
myMovies.removeMovie("Chicken Little")
myMovies.removeMovie("Tropic Thunder")

console.log(myMovies.listMovies())

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
