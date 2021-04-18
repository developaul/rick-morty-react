import { loginWithGoogle, signOutGoogle } from '../firebase';

// constants
const initialData = {
  loggedIn: false,
  fetching: false,
}

const LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOG_OUT = "LOG_OUT"

// reducer
export default (state = initialData, action) => {

  switch (action.type) {
    case LOG_OUT:
      return { ...initialData }

    case LOGIN:
      return {
        ...state,
        fetching: true
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        loggedIn: true,
        ...action.payload
      }

    case LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    default:
      return state
  }

}

const saveStorage = storage => {
  localStorage.storage = JSON.stringify(storage)
}

// actions 
export const logoutAction = () => dispatch => {

  signOutGoogle();

  dispatch({ type: LOG_OUT })

  localStorage.removeItem('storage');

}

export const restoreSessionAction = () => dispatch => {
  const storage = JSON.parse(localStorage.getItem('storage'))

  if (storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user
    })
  }

}

export const doGoogleLoginAction = () => async (dispatch, getState) => {

  dispatch({ type: LOGIN })

  try {

    const { uid, displayName, email, photoURL } = await loginWithGoogle()

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { uid, displayName, email, photoURL }
    })

    saveStorage(getState())

  } catch (err) {

    console.error(err);

    dispatch({
      type: LOGIN_ERROR,
      payload: err.message
    })

  }

}