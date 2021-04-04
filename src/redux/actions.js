import {GET_MOVIES, SET_RATING, USERS_ERROR, DATE, GET_USER, FILTER_BY_VALUE, SET_USER, RELOAD_MOVIES, WARNING, LOAD_EXACT_PAGE, SORT_BY, CLEAR_WARNING, SET_WATCHED, SET_RECENT, SET_UNWATCHED, UNSET_RECENT} from './types'
import axios from 'axios'




export const getMovies = (pgNumber, perPage) => async dispatch => {
    const request = {
        perPage: perPage,
        userId: localStorage.userId
    }
    try{
    if(localStorage.isAuth){
        axios.post('http://127.0.0.1:8000/api/movies/get?page=' + pgNumber, request)
        .then(response => {
            dispatch({
            type: GET_MOVIES,
            payload: {
                data: response.data.data,
                total: response.data.total,
                currentPage: response.data.current_page,
                totalPages: response.data.last_page,
                countPerPage: response.data.per_page,
                goToFirstPage: response.data.first_page_url,
                goToNextPage: response.data.next_page_url,
                goToLastPage: response.data.last_page_url,
        }
        })
        axios.get('http://127.0.0.1:8000/api/users/' + localStorage.userId)
        .then(response => {
            console.log(response)
            dispatch({
            type: GET_USER,
            payload: {
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                email: response.data.email,
                movies: response.data.movies,
                userId: response.data.id,
                darkMode: response.data.dark_mode,
                color: response.data.color,
                background: response.data.background
                }
            })
        })
    })
}
    else {
        axios.post('http://127.0.0.1:8000/api/movies/get?page=' + pgNumber, request).then(response => {
            console.log(response)
            dispatch({
                type: GET_MOVIES,
                payload: {
                    data: response.data.data,
                    total: response.data.total,
                    currentPage: response.data.current_page,
                    totalPages: response.data.last_page,
                    countPerPage: response.data.per_page,
                    goToFirstPage: response.data.first_page_url,
                    goToNextPage: response.data.next_page_url,
                    goToLastPage: response.data.last_page_url,
                }
            })
        })
    }}
catch(e){
    dispatch( {
        type: USERS_ERROR,
        payload: console.log(e),
    })
}}

export const reloadMovies = (pgNumber, perPage)=> async dispatch =>{
    const request = {
        perPage: perPage,
        userId: localStorage.userId
    }
    axios.post('http://127.0.0.1:8000/api/movies/get?page=' + pgNumber, request)
        .then(response => {
            console.log(response)
            dispatch({
                type: GET_MOVIES,
                payload: {
                    data: response.data.data,
                    total: response.data.total,
                    currentPage: response.data.current_page,
                    totalPages: response.data.last_page,
                    countPerPage: response.data.per_page,
                    goToFirstPage: response.data.first_page_url,
                    goToNextPage: response.data.next_page_url,
                    goToLastPage: response.data.last_page_url,
                }
        })
    })
}

export const setPerPage = payload => {
    axios.post('http://127.0.0.1:8000/api/movies/page', {perPage: payload})
    .then(response => {
        console.log(response)
    })
}

export const setRatingDatabase = (id, rating, title)=> async dispatch =>{
    const request = {
        movie_id: id,
        user_id: localStorage.userId,
        rating: rating
    }
    axios.post('http://127.0.0.1:8000/api/users/rating', request)
        .then(response => {
            console.log(response)
            dispatch({
            type: SET_RATING,
            payload: {
                id: response.data.id,
                rating: response.data.rating,
                title: title
        }
        })
    })
}

export const setWatchedDatabase = (id, title)=> async dispatch =>{
    const request ={
        movie_id: id,
        user_id: localStorage.userId
      }
    axios.post('http://127.0.0.1:8000/api/users/watched', request).then(response=>{
        console.log(response)
        dispatch({
            type: SET_WATCHED,
            payload: {
                id: response.data.id,
                title: title
        }
        })
    })
}

export const setUnwatchedDatabase = (id, title) => async dispatch => {
    const request = {
        movie_id: id,
        user_id: localStorage.userId
    }
    axios.post('http://127.0.0.1:8000/api/users/watched_delete', request).then(response => {
        dispatch({
            type: SET_UNWATCHED,
            payload: {
                id: response.data.id,
                title: title
            }
        })
        axios.get('http://127.0.0.1:8000/api/users/' + localStorage.userId)
            .then(response => {
                console.log(response)
                dispatch({
                    type: UNSET_RECENT,
                    payload: {
                        movies: response.data.movies,
                    }
                })
            })
    })

}

export const setRecent = (id, title) =>{
    return dispatch => dispatch({
            type: SET_RECENT,
            payload: {
                id: id,
                title: title
        }
        })
}

export const getUser = () => async dispatch  => {
    try{
        if(localStorage.isAuth){
        axios.get('http://127.0.0.1:8000/api/users/' + localStorage.userId)
        .then(response => {
            dispatch({
            type: GET_USER,
            payload: {
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                movies: response.data.movies,
                email: response.data.email,
                userId: response.data.id,
                darkMode: response.data.dark_mode,
                color: response.data.color,
                background: response.data.background
            }
        })
    })
}
else {
    axios.get('http://127.0.0.1:8000/api/users/' + localStorage.userId)
    .then(response => {
        dispatch({
            type: GET_USER,
            payload: response.data
        })
    })
}}
catch(e){
   console.log(e)
    }
}


export const setUser= (payload) =>{
    console.log(payload)
    axios.put('http://127.0.0.1:8000/api/users/' + localStorage.userId, payload)
    .then(response=>console.log(response))
    return dispatch => dispatch({
        type: SET_USER,
        payload
    })
}

export const warning = (type, title) =>{
    console.log(title)
    return dispatch => dispatch({
        type: WARNING,
        payload:{
            type: type,
            title: title
        }
    })
}

export const clearWarning = () =>{
    return dispatch => dispatch({
        type: CLEAR_WARNING,
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



// export const setFirstName = firstName => {
//     return dispatch =>{
//         dispatch({
//             type: SET_FIRST_NAME,
//             payload: firstName
//         })
//     }
// }

export const addNewMovie = newMovie => {
    const movie = {
        title: newMovie.originalTitle,
        imdbRating: newMovie.imdbRating,
        year: newMovie.year

    }
    return axios.post('http://127.0.0.1:8000/api/movies', movie)
    .then(response=>{
        const actors = {
            firstActor: newMovie.firstActor,
            secondActor: newMovie.secondActor,
            thirdActor: newMovie.thirdActor,
            type: 'Movie',
            id: response.id
        }
        axios.post('http://127.0.0.1:8000/api/actors', actors)
        .then(response=>console.log(response))
    })
}

export const removeMovie = (id) => {
 
    // return dispatch => {
    //     dispatch({
    //         type: REMOVE_MOVIE,
    //         index: index,
    //         originalTitle: originalTitle
    //     })
    // }
}

export const userBirthday = date => {
    return dispatch => {
        dispatch({
            type: DATE,
            date
        })
    }
}