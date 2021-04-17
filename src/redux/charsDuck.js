import axios from 'axios';

// contants
const initialData = {
  fetching: false,
  array: [],
  current: {}
}

const URL = "https://rickandmortyapi.com/api/character"

const GET_CHARACTERS = "GET_CHARACTERS",
  GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS",
  GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR",
  REMOVE_CHARACTER = "REMOVE_CHARACTER"

// reducer
export default (state = initialData, action) => {

  switch (action.type) {
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
