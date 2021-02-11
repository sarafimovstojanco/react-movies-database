import {GET_MOVIES, WATCHED, USERS_ERROR, DATE, DATE_SET, FILTER_BY_VALUE, SET_DARK_MODE, GET_DARK_MODE, GET_THEME_COLOR, LOAD_EXACT_PAGE, SORT_BY, MOVIES_PER_PAGE, DATABASE_SET, SET_FIRST_NAME, SET_NEW_MOVIE, YOUR_RATING, REMOVE_MOVIE, CHANGE_THEME, DATABASE_DARK_MODE_SET, DATABASE_THEME_SET, GET_THEME } from './types'
import axios from 'axios'

export const getMovies = () => async dispatch => {
    try{
    if(localStorage.isAuth){
        axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' + localStorage.userId + '/moviesData.json')
        .then(response => {
            console.log(response)
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
        axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table/MoviesData/Table.json').then(response => {
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

export const getTheme = () => async dispatch  => {
    try{
        if(localStorage.isAuth){
        axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' + localStorage.userId + '/extras.json')
        .then(response => {
            dispatch({
            type: GET_THEME,
            payload: response.data
        })
    })
}     
else {
    axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table/extras.json').then(response => {
        dispatch({
            type: GET_THEME,
            payload: response.data
        })
    })
}}
catch(e){
   console.log(e)
    }
}

export const getThemeColor = ()=> async dispatch  => {
    try {
        if (localStorage.isAuth) {
            axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' + localStorage.userId + '/extras/themeColor.json')
                .then(response => {
                    dispatch({
                        type: GET_THEME_COLOR,
                        payload: response.data
                    })
                })
        }
        else {
            axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table/extras/themeColor.json').then(response => {
                dispatch({
                    type: GET_THEME_COLOR,
                    payload: response.data
                })
            })
        }
    }
    catch (e) {
        console.log(e)
    }
} 

export const getDarkMode= () => dispatch => {
    axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' + localStorage.userId + '/extras/darkMode.json')
    .then(response => {
        dispatch({
        type: GET_DARK_MODE,
        payload: response.data
    })
})
} 

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

export const setDateDatabase = () => {
    return dispatch => dispatch({
        type: DATE_SET
    })
}

export const setDatabaseTheme = () =>{
    return dispatch => dispatch({
        type: DATABASE_THEME_SET
    })
}

export const setDatabaseDarkMode = () => {
    return dispatch => dispatch({
        type: DATABASE_DARK_MODE_SET
    })
}

export const setDarkMode= (payload) =>{
    return dispatch => dispatch({
        type: SET_DARK_MODE,
        payload
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

export const setThemeStyle = (payload) => {
    return dispatch => {
        dispatch({
            type: CHANGE_THEME,
            payload
        })
    }
}

export const yourRating = (yourRating, index, ranked) => {
    return dispatch => {
        dispatch({
            type: YOUR_RATING,
            yourRating: yourRating,
            index: index,
            ranked: ranked
        })
    }
}

export const userBirthday = date => {
    return dispatch => {
        dispatch({
            type: DATE,
            date
        })
    }
}