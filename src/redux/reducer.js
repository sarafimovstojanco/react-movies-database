import { GET_MOVIES, WATCHED, NOT_WATCHED, FILTER_BY_VALUE, DATABASE_SET, SORT_BY, LOAD_EXACT_PAGE, MOVIES_PER_PAGE } from './types'
import firebase from 'firebase';
import { config } from '../firebase/config'

let path = localStorage.userId

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}

const initialState = {
    movies: [],
    filteredMovies: [],
    filteredMoviesInit: [],
    searching: false,
    currentPage: 1,
    countPerPage: '',
    loading: true,
    firstName: '',
    appliedFilters: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES:
            let getState = Object.assign({}, state)
            getState.movies = action.payload.data
            getState.loading = false
            getState.firstName = action.payload.firstName
            getState.countPerPage = action.payload.countPerPage || 10
            getState.currentCount = getState.countPerPage
            getState.totalCount = action.payload.count
            getState.currentPage = 1
            getState.totalPages = Math.ceil(getState.totalCount / getState.countPerPage)
            getState.filteredPages = Math.ceil(getState.totalCount / getState.countPerPage)
            getState.upperCount = getState.countPerPage * getState.currentPage
            getState.lowerCount = getState.upperCount - getState.countPerPage
            getState.filteredMovies = getState.movies.slice(getState.lowerCount, getState.upperCount)

            return getState

        case WATCHED:
            let watched = Object.assign({}, state);
            watched.filteredMovies[action.payload].watched = !watched.filteredMovies[action.payload].watched
            for (let i; i < watched.movies.length; i++) {
                if (watched.movies[i].ranked === action.ranked)
                    return watched.movies.watched = !watched.movies.watched
            }

            return watched

        case FILTER_BY_VALUE:
            let newState = Object.assign({}, state);
            let value = action.payload.value;
            let filteredMovies = state.movies.filter(movie => {
                return movie.originalTitle.toLowerCase().includes(value)

            });
            let appliedFilters = state.appliedFilters;
            if (value) {
                newState.searching = true
                newState.filteredMoviesInit = newState.movies.slice(newState.lowerCount, newState.upperCount)
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
            console.log(newState)
            return newState;

        case SORT_BY:
            const sortByAlphabetState = Object.assign({}, state);
            let sortedAlphabetArr = action.order ?
                sortAsc(sortByAlphabetState.filteredMovies, action.item) :
                sortDesc(sortByAlphabetState.filteredMovies, action.item);
            sortByAlphabetState.filteredMovies = sortedAlphabetArr;
            console.log(action.payload)
            console.log(sortByAlphabetState)
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
            window.history.pushState({ page: 1 }, "title 1", `?page=${exactPageState.currentPage}`);
            exactPageState.movies = initMoviesLoad

            return exactPageState;

        case MOVIES_PER_PAGE:
            const moviesPerPageState = Object.assign({}, state)
            const initMoviesMPP = moviesPerPageState.movies
            moviesPerPageState.currentPage = 1
            moviesPerPageState.countPerPage = action.payload
            moviesPerPageState.currentCount = moviesPerPageState.totalCount
            moviesPerPageState.filteredPages = Math.ceil(moviesPerPageState.currentCount / moviesPerPageState.countPerPage)
            moviesPerPageState.totalPages = moviesPerPageState.filteredPages
            let currentPageMPP = moviesPerPageState.currentPage
            let upperCountMPP = moviesPerPageState.countPerPage * currentPageMPP
            let lowerCountMPP = upperCountMPP - moviesPerPageState.countPerPage;
            let exactMPP = moviesPerPageState.movies.slice(lowerCountMPP, upperCountMPP);
            moviesPerPageState.filteredMovies = exactMPP;
            moviesPerPageState.currentCount = upperCountMPP;
            moviesPerPageState.movies = initMoviesMPP

            return moviesPerPageState

        case DATABASE_SET:
            databaseSet(state.movies)
            return {
                ...state,
            }

        default: return state
    }
}

function addFilterIfNotExists(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    if (index === -1) appliedFilters.push(filter);

    return appliedFilters;
}

function removeFilter(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    appliedFilters.splice(index, 1);
    return appliedFilters;
}

function databaseSet(movies) {
    return firebase.database().ref(path + "/").update(movies)
}

function sortAsc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) {
            return 1;
        }
        if (b[field] > a[field]) {
            return -1;
        }
        return 0;
    })
}

function sortDesc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return -1;

        if (b[field] > a[field]) return 1;

        return 0;
    })
}