import {
    SET_SCREAMS,
    SET_SCREAM,
    LOADING_DATA,
    LOADING_UI,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    POST_SCREAM,
    CLEAR_ERRORS,
    SET_ERRORS,
    STOP_LOADING_UI,
    POST_COMMENT
} from '../types';

import axios from 'axios';

// Get all screams
export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            });
        });
};

// Post a scream
export const postScream = newScream => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/scream', newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getScream = screamId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
            dispatch({
                type: STOP_LOADING_UI
            });
        })
        .catch(err => console.log(err));
};

// Like a scream
export const likeScream = screamId => dispatch => {
    axios
        .get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

// Post a comment for a scream
export const postComment = (screamId, commentData) => dispatch => {
    axios
        .post(`/scream/${screamId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: POST_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
};

// Unlike a scream
export const unlikeScream = screamId => dispatch => {
    axios
        .get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

// Delete scream
export const deleteScream = screamId => dispatch => {
    axios
        .delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            });
        })
        .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
