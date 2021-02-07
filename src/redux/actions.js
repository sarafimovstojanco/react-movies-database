import {GET_MOVIES, WATCHED, USERS_ERROR, FILTER_BY_VALUE, LOAD_EXACT_PAGE, SORT_BY, MOVIES_PER_PAGE, DATABASE_SET, SET_FIRST_NAME, SET_NEW_MOVIE, REMOVE_MOVIE } from './types'
import axios from 'axios'

export const getMovies = () => async dispatch => {
    try{
    if(localStorage.isAuth){
        axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' + localStorage.userId + '.json')
        .then(response => {
            dispatch({
            type: GET_MOVIES,
            payload: {
            data: response.data,
            count: response.data.length,
            countPerPage: 10}
        })
    })
        
    }
    else {
        axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table.json').then(response => {
            dispatch({
                type: GET_MOVIES,
                payload: {
                    data: response.data,
                    count: response.data.length,
                    countPerPage: 10}
            })
        })
    }}
catch(e){
    dispatch( {
        type: USERS_ERROR,
        payload: console.log(e),
    })
}}


export const setWatched = (index, ranked) => {
    return dispatch =>dispatch({
      type: WATCHED,
      payload: index,
      ranked: ranked
})
}

export const setDatabase = () =>{
    return dispatch => dispatch({
        type: DATABASE_SET
    })
}

export const filterByValue = payload => ({
    type: FILTER_BY_VALUE,
    payload
});

export const sortBy = (item, order) => {
     return dispatch => dispatch({
         type: SORT_BY,
         item: item,
         order: order
        })
    }

export const loadExactPage = pgNumber => {
    return dispatch => {
        dispatch({
        type: LOAD_EXACT_PAGE,
        payload: pgNumber
    })}
}
     
export const setPerPage = payload => {
    return dispatch => dispatch({
    type: MOVIES_PER_PAGE,
    payload: payload
    })
}

export const setFirstName = firstName => {
    return dispatch =>{
        dispatch({
            type: SET_FIRST_NAME,
            payload: firstName
        })
    }
}

export const newMovieAddition = newMovie => {
    return dispatch => {
        dispatch({
            type: SET_NEW_MOVIE,
            payload: newMovie
        })
    }
}

export const removeMovie = (index, originalTitle) => {
    return dispatch => {
        dispatch({
            type: REMOVE_MOVIE,
            index: index,
            originalTitle: originalTitle
        })
    }
}

