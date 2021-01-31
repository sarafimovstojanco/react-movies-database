import {GET_MOVIES, NOT_WATCHED, WATCHED, USERS_ERROR, FILTER_BY_VALUE, LOAD_DATA, LOAD_EXACT_PAGE, LOAD_NEW_PAGE, SORT_BY, MOVIES_PER_PAGE, DATABASE_SET} from './types'
import axios from 'axios'

export const getMovies = () => async dispatch => {
    try{
    if(localStorage.isAuth){
        axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' + localStorage.userId + '.json')
        .then(response => {
            dispatch({
            type: GET_MOVIES,
            payload: {
            data: response.data.slice(0,122),
            firstName: response.data[122],
            count: 122,
            countPerPage: 10}
        })
      
        localStorage.setItem('firstName', response.data[122])
         }
        )
        
    }
    else {
        axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table.json').then(response => {
            dispatch({
                type: GET_MOVIES,
                payload: {
                    data: response.data,
                    count: 122,
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

export const loadData = payload => ({
type: LOAD_DATA,
payload
});

export const loadNewPage = payload => ({
type: LOAD_NEW_PAGE,
payload
});

export const loadExactPage = pgNumber => {
    return dispatch => {
        console.log(pgNumber)
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


// sortByInput(e){
//     let value = e.target.value;
//     let direction = value.endsWith('asc') ? "asc" : "desc";

//     if (value.startsWith('price')){
//         this.props.dispatch(sortByPrice({direction}))
//     }else {
//         this.props.dispatch(sortByAlphabet({direction}));
//     }
// }