import {createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {userLoginReducer, userRegisterReducer, userUpdateReducer} from "./reducers/userReducers";
import {noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer} from "./reducers/notesReducers";


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  notesList: noteListReducer,
  noteCreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
})

// получение данных из localStorage
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

// начальное состояние
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
}


const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
