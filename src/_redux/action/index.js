// import { getGhibliMoviesAPI, getGhibliPeopleAPI, getGhibliSpeciesAPI } from '../services';
export const SAVE_USER = 'SAVE_USER';
// export const REQUEST_START = 'REQUEST_START';
// export const REQUEST_FAIL = 'REQUEST_FAIL';
// export const REQUEST_FILM_SUCCESS = 'REQUEST_FILM_SUCCESS';
// export const REQUEST_PEOPLE_SUCCESS = 'REQUEST_PEOPLE_SUCCESS';
// export const REQUEST_SPECIES_SUCCESS = 'REQUEST_SPECIES_SUCCESS';
// export const FAVORITE_MOVIE = 'FAVORITE_MOVIE';

export const saveUserData = (user) => ({
  type: SAVE_USER,
  user,
});

// const requestStart = () => ({
//   type: REQUEST_START,
// });

// const requestFail = (error) => ({
//   type: REQUEST_FAIL,
//   error,
// });

// const requestMoviesSuccess = (movies) => ({
//   type: REQUEST_FILM_SUCCESS,
//   movies,
// });

// const requestPeopleSuccess = (people) => ({
//   type: REQUEST_PEOPLE_SUCCESS,
//   people,
// });

// const requestSpeciesSuccess = (species) => ({
//   type: REQUEST_SPECIES_SUCCESS,
//   species,
// });

// export const fetchMovies = () => async (dispatch) => {
//   dispatch(requestStart());
//   try {
//     const movies = await getGhibliMoviesAPI();

//     dispatch(requestMoviesSuccess(movies));
//   } catch (error) {
//     dispatch(requestFail(error));
//   }
// };

// export const fetchPeople = () => async (dispatch) => {
//   dispatch(requestStart());
//   try {
//     const people = await getGhibliPeopleAPI();

//     dispatch(requestPeopleSuccess(people));
//   } catch (error) {
//     dispatch(requestFail(error));
//   }
// };

// export const fetchSpecies = () => async (dispatch) => {
//   dispatch(requestStart());
//   try {
//     const species = await getGhibliSpeciesAPI();

//     dispatch(requestSpeciesSuccess(species));
//   } catch (error) {
//     dispatch(requestFail(error));
//   }
// };
