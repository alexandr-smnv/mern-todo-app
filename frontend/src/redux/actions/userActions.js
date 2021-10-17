import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT, USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS
} from "../constants/userConstants";

// авторизация
export const login = (email, password) => async (dispatch) => {
  dispatch({type: USER_LOGIN_REQUEST})

  try {
    // объект headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    // получение данных о пользователе
    const {data} = await axios.post('/api/auth/login', {email, password}, config)

    dispatch({type: USER_LOGIN_SUCCESS, payload: data})

    // запись данных о пользователе в localStorage
    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

// выход из профиля
export const logout = () => async (dispatch) => {
  // очистка localStorage
  localStorage.removeItem('userInfo')
  dispatch({type: USER_LOGOUT})
}

// регистрация
export const register = (name, email, password, pic) => async (dispatch) => {
    try {
      dispatch({type: USER_REGISTER_REQUEST})

      // объект headers
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      // получение данных о пользователе
      const {data} = await axios.post('/api/auth/register', {name, pic, email, password}, config)

      dispatch({type: USER_REGISTER_SUCCESS, payload: data})
      // запись данных о пользователе в userLogin в store
      dispatch({type: USER_LOGIN_SUCCESS, payload: data})
      // запись данных о пользователе в localStorage
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
}

// редактирование профиля
export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({type: USER_UPDATE_REQUEST})

    // получение данных о пользователе
    const {userLogin: {userInfo}} = getState()

    // объект headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // получение обновленных данных о пользователе
    const { data } = await axios.post('/api/auth/profile', user, config)

    dispatch({type: USER_UPDATE_SUCCESS, payload: data})
    // запись данных о пользователе в userLogin в store
    dispatch({type: USER_LOGIN_SUCCESS, payload: data})
    // запись данных о пользователе в localStorage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}