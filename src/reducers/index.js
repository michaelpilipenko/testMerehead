import { combineReducers } from 'redux'
import * as types from '../constants'

// INITIAL STATE
const initialState = {
  loading: false,
  error: null,
  users: []
}

// APP REDUCER
const crudReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_FETCH_STARTED:
      return {
        ...state,
        loading: true
      };
    case types.ADD_ALL_USERS:
      let usersArr = [];
      for(const item in payload){ usersArr.push(payload[item]) }
      return {
        ...state,
        loading: false,
        users: usersArr
      };
    case types.ADD_USER:
      return {
        ...state,
        loading: false,
        users: [...state.users, payload.newUser]
      }
    case types.EDIT_USER:
      const updatedUserList = state.users.map(user => {
        if(user.id === payload.user.id){
          return payload.user;
        }
        return user;
      })

      return {
        ...state,
        loading: false,
        users: updatedUserList
      }
    case types.ADD_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
      };
    default:
      return state
  }
}

// COMBINED REDUCERS
const index = {
  crud: crudReducer
}

export default combineReducers(index)
