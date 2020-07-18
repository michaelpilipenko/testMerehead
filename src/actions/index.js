import * as types from '../constants';
import axios from 'axios';

const url = 'http://77.120.241.80:8911/api';

export const getAllUsers = () => dispatch => {
    dispatch(addFetchStarted());

    axios.get(`${url}/users`)
        .then(res => dispatch(addAllUsers(res.data)))
        .catch(err => dispatch(addFetchFailure(err.message)))
};

export const createUser = ({ name, surname, desc}) => dispatch => {
    dispatch(addFetchStarted());

    const requestBody = {
        name,
        surname,
        desc
    }


    axios.post(`${url}/users`, requestBody)
        .then(res => dispatch(addUser(res.data)))
        .catch(err => dispatch(addFetchFailure(err.message)))
};

export const deleteUser = id => dispatch => {
    dispatch(addFetchStarted());

    axios.delete(`${url}/user/${id}`)
        .then(res => dispatch(addAllUsers(res.data)))
        .catch(err => dispatch(addFetchFailure(err.message)))
};

export const changeUserInfo = ({ id, name, surname, desc }) => dispatch => {
    dispatch(addFetchStarted());

    const requestBody = {
        name,
        surname,
        desc
    }

    axios.put(`${url}/user/${id}`, requestBody)
        .then(res => dispatch(editUser(res.data)))
        .catch(err => dispatch(addFetchFailure(err.message)))
};

const addAllUsers = users => ({
    type: types.ADD_ALL_USERS,
    payload: {
        ...users
    }
});

const addUser = newUser => ({
    type: types.ADD_USER,
    payload: {
        newUser
    }
});

const editUser = user => ({
    type: types.EDIT_USER,
    payload: {
        user
    }
});

const addFetchStarted = () => ({
    type: types.ADD_FETCH_STARTED
});

const addFetchFailure = error => ({
    type: types.ADD_FETCH_FAILURE,
    payload: {
        error
    }
});