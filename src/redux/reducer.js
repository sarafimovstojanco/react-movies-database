import {GET_MOVIES, WATCHED, NOT_WATCHED, FILTER_BY_VALUE, DATABASE_SET, SORT_BY, LOAD_DATA, LOAD_EXACT_PAGE, MOVIES_PER_PAGE} from './types'
import firebase from 'firebase';
import update from 'immutability-helper'
import { act } from 'react-dom/test-utils';

var config = {
    apiKey: "apiKey",
    authDomain: "react-movies-database.firebaseapp.com",
    databaseURL: "https://react-movies-database-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
  };
  let path = localStorage.userId
  
if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }

const initialState = {
    movies:[],
    filteredMovies:[],
    filteredMoviesInit:[],
    searching: false,
    currentPage: 1,
    countPerPage: '',
    loading:true,
    firstName:'',
    appliedFilters: []
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_MOVIES:
            let getState= Object.assign({}, state)
            getState.movies=action.payload.data
            getState.loading=false
            getState.firstName= action.payload.firstName
            getState.countPerPage=action.payload.countPerPage || 10
            getState.currentCount= getState.countPerPage
            getState.totalCount= action.payload.count
            getState.currentPage= 1
            getState.totalPages= Math.ceil(getState.totalCount / getState.countPerPage)
            getState.filteredPages= Math.ceil(getState.totalCount / getState.countPerPage)
            getState.upperCount = getState.countPerPage * getState.currentPage
            getState.lowerCount=getState.upperCount-getState.countPerPage
            getState.filteredMovies=getState.movies.slice(getState.lowerCount, getState.upperCount)
       
            console.log(getState)
        return getState
        // case WATCHED:
        //     console.log(action)
        //     let watched = Object.assign({}, state);

        // return watched
        case WATCHED:
            console.log(action)
            console.log(state)
            let watched = Object.assign({}, state);
            watched.filteredMovies[action.payload].watched=true
                for (let i; i<122; i++){
                    if(watched.movies[i].ranked === action.ranked)
                    return watched.movies.watched=true
                }
            console.log(watched.movies)
            
            return watched
            // return update(state, {
            //     movies:{
            //       [action.ranked -1]:{
            //           watched: {$set: true}
            //       }
            //     },
            //     filteredMovies: {
            //         [action.payload]:{
            //             watched: {$set: true}
            //         }
            //       }
            //  })
        case NOT_WATCHED:
            console.log(action)
            let notWatched = Object.assign({}, state);
            notWatched.filteredMovies[action.payload].watched=false
                for (let i; i<122; i++){
                    if(notWatched.movies[i].ranked === action.ranked)
                    return notWatched.movies.watched=false
                }
            console.log(notWatched.movies)
            
            return notWatched
            case DATABASE_SET:
                console.log(state)
               databaseSet(state.movies)
            return {
                ...state,
            }
            case FILTER_BY_VALUE:
            let newState = Object.assign({}, state);
            let value = action.payload.value;
            let filteredMovies = state.movies.filter(movie => {
                return movie.originalTitle.toLowerCase().includes(value) 
                
            });
            let appliedFilters = state.appliedFilters;
            if (value) {
                console.log(newState)
                newState.searching = true
                newState.filteredMoviesInit=newState.filteredMovies
                appliedFilters = addFilterIfNotExists(FILTER_BY_VALUE, appliedFilters);
                newState.filteredMovies = filteredMovies;
                newState.filteredCount = newState.filteredMovies.length;
                newState.filteredPages = Math.ceil(newState.filteredCount / newState.countPerPage);
            } else {
                newState.searching = false
                appliedFilters = removeFilter(FILTER_BY_VALUE, appliedFilters);
                if (appliedFilters.length === 0) {
                    newState.filteredMovies = newState.filteredMoviesInit;
                    newState.filteredCount = newState.filteredMovies.length;
                    newState.filteredPages = Math.ceil(newState.filteredCount / newState.countPerPage);
                }
            }
            return newState;
        case SORT_BY:
            const sortByAlphabetState = Object.assign({}, state);
            const initMovies=state.movies
            let sortedAlphabetArr = action.order ?
            sortAsc(sortByAlphabetState.filteredMovies, action.payload) :
            sortDesc(sortByAlphabetState.filteredMovies, action.payload);
            sortByAlphabetState.filteredMovies = sortedAlphabetArr;
            sortByAlphabetState.movies=initMovies
            return sortByAlphabetState;  

        case LOAD_EXACT_PAGE:
            const exactPageState = Object.assign({}, state);
            const initMoviesLoad = exactPageState.movies
            const exactPage = action.payload;
            let upperCountExact = exactPageState.countPerPage * exactPage
            let lowerCountExact = upperCountExact - exactPageState.countPerPage;
            let exactMovies = exactPageState.movies.slice(lowerCountExact, upperCountExact);
            exactPageState.filteredMovies = exactMovies;
            exactPageState.currentCount = upperCountExact;
            exactPageState.currentPage = exactPage;
            console.log(exactPageState)
            window.history.pushState({page: 1}, "title 1", `?page=${exactPageState.currentPage}`);
            exactPageState.movies=initMoviesLoad
            return exactPageState;

        case MOVIES_PER_PAGE:

            const moviesPerPageState = Object.assign({}, state)
            const initMoviesMPP = moviesPerPageState.movies
            moviesPerPageState.currentPage=1
            moviesPerPageState.countPerPage=action.payload
            moviesPerPageState.currentCount=moviesPerPageState.totalCount
            moviesPerPageState.filteredPages=Math.ceil(moviesPerPageState.currentCount /  moviesPerPageState.countPerPage)
            moviesPerPageState.totalPages=moviesPerPageState.filteredPages
            let currentPageMPP =moviesPerPageState.currentPage
            let upperCountMPP = moviesPerPageState.countPerPage * currentPageMPP
            let lowerCountMPP = upperCountMPP - moviesPerPageState.countPerPage;
            let exactMPP = moviesPerPageState.movies.slice(lowerCountMPP, upperCountMPP);
            moviesPerPageState.filteredMovies = exactMPP;
            moviesPerPageState.currentCount = upperCountMPP;
            moviesPerPageState.movies=initMoviesMPP
            console.log(moviesPerPageState)

            return moviesPerPageState

        default: return state
    }
}

function addFilterIfNotExists(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    if (index===-1) appliedFilters.push(filter);

    return appliedFilters;
}

function removeFilter(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    appliedFilters.splice(index, 1);
    return appliedFilters;
}

function databaseSet(movies){
    return firebase.database().ref(path +"/").update(movies)
}

function sortAsc(arr, field) {
   return arr.sort(function (a, b) {
       if (a[field] > b[field]) {
           return 1;
       }
       if (b[field]> a[field]) {
           return -1;
       }
       return 0;
   })
}

function sortDesc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return -1;

        if (b[field]> a[field]) return 1;

        return 0;
    })
}