import { TIMEOUT_SEC } from './config.js';
async function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(
        new Error(
          'Loading Data Taking A Long Time! Please Check Your Connection '
        )
      );
    }, s * 1000);
  });
}
export async function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000 * seconds);
  });
}
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWFiNmQ4ZWU4YWFhMzlhYmViNThiYjFlMmYzMjJkYiIsInN1YiI6IjY1MjE2M2YyMDcyMTY2MDBhY2I4NTdjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2lUNfkypXGTCIvjiw4OaDizNDDMVfHSi5oqhjCHCsE0',
  },
};

export async function sendJson(id = undefined, pageNo) {
  try {
    const fetchPro = !id
      ? fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNo}&sort_by=popularity.desc`,
          options
        )
      : fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = res.json(); //returns the data back
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function sendJson2(query, pageNo) {
  try {
    const fetchUrl = fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${pageNo}`,
      options
    );
    const res = await Promise.race([fetchUrl, timeout(TIMEOUT_SEC)]);
    const data = res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
