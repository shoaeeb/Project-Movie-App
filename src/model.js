import { async } from 'regenerator-runtime';
import { sendJson, sendJson2 } from './helper.js';

//loaded movies  and rendered in the ui //done
//load movie by id //done  now render movie in the ui done

//add watch later/bookmark done //use local storage
//render from local storage the bookmarks if available//done
//search by query//done
//pagination

export const state = {
  movies: {
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  },
  results: [],
  bookmarks: [],
  movie: [],
  currentPage: 1,
  prevPage: 0,
  nextPage: 2,
};

function createObject(data) {
  const results = data.map(movie => {
    return {
      id: movie.id,
      adult: movie.adult,
      imgPath: movie.backdrop_path,
      title: movie.original_title,
      releaseDate: movie.release_date,
      popularity: movie.popularity,
      overview: movie.overview,
    };
  });
  return results;
}

export async function getMovies(id = undefined, res = undefined, pageNo = 1) {
  try {
    //if id present search by id if not then just search all movies
    let data = id ? await sendJson(id) : await sendJson(undefined, pageNo);
    if (res) data = res;
    //added && !res
    if (id && !res) return getMovieById(data);
    state.movies.page = data.page;
    const results = createObject(data.results);
    if (!id) {
      state.movies.results.push(...results);
      state.results.push(results);

      state.movies.totalPages = data.total_pages;
      state.movies.totalResults = data.total_results;
    }
    //check if the local storage is null or not
    const storage = getLocalStorage();
    if (storage) state.bookmarks = storage;
    console.log(state.movies);

    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMovieById(data) {
  try {
    const res = await data;
    console.log(res);
    const result = createObjectFromId(res);
    state.movie = [];
    state.movie.push(result);
    console.log(state.movie);
    return result;
  } catch (error) {
    throw error;
  }
}
function createObjectFromId(data) {
  const genres = data.genres.map(genre => genre.name);
  const languages = data.spoken_languages.map(lang => lang.english_name);
  const bookmark = state.bookmarks.find(eachMovie => eachMovie.id === data.id)
    ? true
    : false;
  return {
    id: data.id,
    adult: data.adult,
    imgPath: data.backdrop_path,
    url: data.homepage,
    genres,
    description: data.overview,
    title: data.original_title,
    revenue: data.revenue,
    status: data.status,
    tagline: data.tagline,
    releaseDate: data.release_date,
    languages,
    budget: data.budget,
    bookmark: bookmark,
  };
}
//getMoviesByQueries
export async function getMoviesByQuery(query, pageNo = 1) {
  try {
    const res = await sendJson2(query, pageNo);
    const results = getMovies(undefined, res);
    return results;
  } catch (error) {
    throw error;
  }
}
//addBookMark
export function addBookMark(movie) {
  //if the movie is not bookmarked then bookmark
  if (!state.bookmarks.find(eachMovie => eachMovie.id === movie[0].id)) {
    console.log('true');
    state.bookmarks.push({ ...movie[0], bookmark: true });
    storeLocalStorage();
    return true;
  }
  //update
  state.bookmarks[
    state.bookmarks.findIndex(eachMovie => movie[0].id === eachMovie.id)
  ].bookmark = false;
  return false;
}

//delete function
export function unBookMark(movie, isBookMarked) {
  //remove from bookmarks array
  if (isBookMarked) return;
  console.log('insied');

  state.bookmarks.splice(
    state.bookmarks.findIndex(eachMovie => movie[0].id === eachMovie.id),
    1
  );
  storeLocalStorage();
  return;
}

export function updateCurrentPage(target) {
  console.log(target.classList.contains('btn__next'));
  console.log(target.classList.contains('btn__prev'));

  if (target.classList.contains('btn__next')) {
    const data = +target.dataset.goToNext;
    state.prevPage = state.currentPage;
    state.currentPage = state.nextPage;
    state.nextPage = data;
  }
  if (target.classList.contains('btn__previous')) {
    const data = +target.dataset.goToPrev;
    state.nextPage = state.currentPage;
    state.currentPage = state.prevPage;
    state.prevPage = data;
  }
}

function storeLocalStorage() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}
function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bookmarks'));
}
