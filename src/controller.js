import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import movieView from './views/movieView.js';
import movieDetailsView from './views/movieDetailsView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';

function removeBlur(img) {
  img.classList.remove('lazy-loading');
}
async function loadMovies(currentPage = 1) {
  try {
    //1) renderSpinner
    movieView.renderSpinner('Loading Data Please Wait');
    // 2)load movies
    //model.getMovies
    const data = await model.getMovies(undefined, undefined, currentPage);
    console.log(data);
    //render movies on UI
    movieView.render(data);
    // removeBlur();
    movieView.addHandler(removeBlur);
    //movieView.renderPagination(model.state);
    //render pagination
    paginationView.renderPagination(model.state);
    //pass the handler function
    paginationView.addHandlerPagination(updateCurrentPageState);
    //render the bookmark
    bookmarkView.render(model.state.bookmarks);
  } catch (error) {
    //view.renderError();
    console.error(error);
    movieView.renderError();
  }
}
function updateCurrentPageState(target) {
  // model.updateCurrentPage(prev, next);
  model.updateCurrentPage(target);
  loadMovies(model.state.currentPage);
  getMovieByQuery(model.state.currentPage);
}

//find movie by id
async function loadMovieById() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    //model.getMovies

    const data = await model.getMovies(id);
    //continue from here
    //render the movie by id
    movieDetailsView.render(data);
    //initialize bookmarkView ParentElement
    bookmarkView.init();
    //pass the handler function
    bookmarkView.addHandlerBookmark(addBookMark);
    //redner the bookmarks
    bookmarkView.render(model.state.bookmarks);
  } catch (error) {
    console.log(error);
    movieDetailsView.renderError(
      'Cannot Find The Movie Details You are looking for! Try another one'
    );
  }
}

function addBookMark() {
  //model.addBookMark

  //check if the current movie is bookmark or not
  const isBookMarked = model.addBookMark(model.state.movie);
  movieDetailsView.update(
    model.state.bookmarks[
      model.state.bookmarks.findIndex(
        movie => movie.id === model.state.movie[0].id
      )
    ]
  );
  //if not bookmark just remove from bookmark array
  model.unBookMark(model.state.movie, isBookMarked);
  //render the updated bookmark view
  bookmarkView.render(model.state.bookmarks);
}

//getMoviesByQuery
async function getMovieByQuery(pageNo = 1) {
  try {
    const query = movieView.userSearch.value.trim();
    if (!query) return;
    const data = await model.getMoviesByQuery(query, pageNo);
    //render the movie
    movieView.render(data);
    //pass the handler function
    movieView.addHandler(removeBlur);
    //render the pagination
    paginationView.renderPagination(model.state);
    //pass the handler function
    paginationView.addHandlerPagination(updateCurrentPageState);
  } catch (error) {
    movieView.renderError(
      "Can't Find the Movie you are looking for! Please Try another Keyword"
    );
  }
}
//when search by query
movieView.addSearchHandler(getMovieByQuery);
function init() {
  movieView.addLoadHandler(loadMovies);
  movieView.addLoadMovieHandler(loadMovieById);
  movieDetailsView.addLoadHandler(loadMovieById);
}
init();
