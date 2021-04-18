import axios from 'axios';

import { updateDB, getFavs } from '../firebase'

// contants
const initialData = {
  fetching: false,
  array: [],
  current: {},
  favorites: []
}

const URL = "https://rickandmortyapi.com/api/character"

const GET_CHARACTERS = "GET_CHARACTERS",
  GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS",
  GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR",

  REMOVE_CHARACTER = "REMOVE_CHARACTER",
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",

  GET_FAVS = "GET_FAVS",
  GET_FAVS_ERROR = "GET_FAVS_ERROR",
  GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS"

// reducer
export default (state = initialData, action) => {

  switch (action.type) {

    case GET_FAVS_SUCCESS:
      return {
        ...state,
        fetching: false,
        favorites: action.payload
      }

    case GET_FAVS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    case GET_FAVS:
      return {
        ...state,
        fetching: true
      }

    case ADD_TO_FAVORITES:
      return {
        ...state,
        ...action.payload
      }

    case REMOVE_CHARACTER:
      return {
        ...state,
        array: action.payload
      }

    case GET_CHARACTERS:
      return {
        ...state,
        fetching: true
      }

    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        array: action.payload
      }

    case GET_CHARACTERS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    default:
      return state
  }

}

// actions (thunks)
export const restoreFavoriteAction = favorites => dispatch => {
  console.log(favorites)
  dispatch({
    type: GET_FAVS_SUCCESS,
    payload: [...favorites]
  })
}

export const reteiveFavs = () => async (dispatch, getState) => {

  dispatch({ type: GET_FAVS })

  try {

    const { uid } = getState().user

    const array = await getFavs(uid)

    dispatch({
      type: GET_FAVS_SUCCESS,
      payload: [...array]
    })

  } catch (err) {

    console.error(err)

    dispatch({
      type: GET_FAVS_ERROR,
      payload: err.message
    })

  }

}

export const addToFavoritesAction = () => (dispatch, getState) => {

  const { array, favorites } = getState().characters
  const { uid } = getState().user

  const [char, ...restArr] = array

  const newFavorites = [...favorites, char]

  updateDB(newFavorites, uid)

  dispatch({
    type: ADD_TO_FAVORITES,
    payload: { array: restArr, favorites: newFavorites }
  })

}


export const removeCharacterAction = () => (dispatch, getState) => {

  const { array } = getState().characters

  array.shift()

  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array],
  })

}

export const getCharactersAction = () => async (dispatch, getState) => {

  dispatch({ type: GET_CHARACTERS })

  try {

    const { data } = await axios.get(URL);

    dispatch({
      type: GET_CHARACTERS_SUCCESS,
      payload: data.results
    })

  } catch (err) {

    console.log(err)

    dispatch({
      type: GET_CHARACTERS_ERROR,
      payload: err.response.message
    })

  }

}
