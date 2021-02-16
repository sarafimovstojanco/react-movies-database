import { GET_MOVIES, WATCHED, FILTER_BY_VALUE, GET_THEME_COLOR, DATABASE_SET, SORT_BY, LOAD_EXACT_PAGE, GET_DARK_MODE, SET_DARK_MODE, DATABASE_DARK_MODE_SET, MOVIES_PER_PAGE, SET_FIRST_NAME, SET_NEW_MOVIE, REMOVE_MOVIE, CHANGE_THEME, YOUR_RATING, DATABASE_THEME_SET, GET_THEME, DATE_SET, DATE } from './types'
import firebase from 'firebase';

const initialState = {
    movies: [],
    filteredMovies: [],
    filteredMoviesInit: [],
    searching: false,
    currentPage: 1,
    countPerPage: '',
    loading: true,
    firstName: '',
    appliedFilters: [],
    birthdayDate: {date:''},
    themeStyle: { background: localStorage.themeStyle },
    themeColor: {
        red: false,
        blue: true,
        green: false
    },
    darkMode: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES:
            let getState = Object.assign({}, state)
            getState.loading = true
            getState.movies = action.payload.data.slice(0, action.payload.data.length).map((obj, index)=> ({ ...obj, ranked: index+1 }))
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
            getState.loading = false

            return getState

        case GET_THEME:
            let getThemeState = Object.assign({}, state)
            getThemeState.loading = true
            getThemeState.themeStyle = action.payload
            getThemeState.loading = false

            return getThemeState

        case GET_THEME_COLOR:
            let getThemeColorState = Object.assign({}, state)
            getThemeColorState.loading = true
            getThemeColorState.themeColor = action.payload
            getThemeColorState.loading = false

            return getThemeColorState

        case GET_DARK_MODE:
                    let getDarkModeState = Object.assign({}, state)
                    getDarkModeState.loading = true
                    getDarkModeState.darkMode = action.payload
                    getDarkModeState.loading = false

                    return getDarkModeState

        case WATCHED:
            let watched = Object.assign({}, state);
            console.log(watched)
            watched.filteredMovies[action.payload].watched = !watched.filteredMovies[action.payload].watched
            for (let i; i < watched.movies.length; i++) {
                if (watched.movies[i].ranked === action.ranked)
                    return watched.movies.watched = !watched.movies.watched
            }

            return watched

        case FILTER_BY_VALUE:
            let newState = Object.assign({}, state);
            let value = action.payload.value;
            let filteredMovies = newState.movies.filter(movie => {
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
                    newState.filteredMovies = newState.movies.slice(newState.lowerCount, newState.upperCount);
                    newState.filteredCount = newState.filteredMovies.length;
                    newState.filteredPages = Math.ceil(newState.filteredCount / newState.countPerPage);
                }
            }
            return newState;

        case SORT_BY:
            const sortByAlphabetState = Object.assign({}, state);
            let sortedAlphabetArr = action.order ?
                sortAsc(sortByAlphabetState.filteredMovies, action.item) :
                sortDesc(sortByAlphabetState.filteredMovies, action.item);
            sortByAlphabetState.filteredMovies = sortedAlphabetArr;
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
            exactPageState.searching = false;
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
            moviesPerPageState.lowerCount = lowerCountMPP;
            moviesPerPageState.upperCount = upperCountMPP;
            moviesPerPageState.movies = initMoviesMPP

            return moviesPerPageState

        case SET_FIRST_NAME:
            const firstNameState = Object.assign({}, state)
            firstNameState.firstName = action.payload
            return firstNameState

        case DATABASE_SET:
            databaseSet(state.movies)
            return {
                ...state,
            }

        case DATABASE_THEME_SET:
            databaseThemeSet(state.themeStyle)
            databaseThemeColorSet(state.themeColor)
        return {
            ...state,
        }

        case SET_DARK_MODE:
            const darkModeState = Object.assign({}, state)
            darkModeState.darkMode = action.payload

            return darkModeState

        case DATABASE_DARK_MODE_SET:
            databaseDarkModeSet(state.darkMode)
            return {
                ...state,
            }

        case DATE_SET:
            databaseDateSet(state.birthdayDate)
        return {
            ...state,
        }

        case SET_NEW_MOVIE:
            const newMovieState = Object.assign({}, state)
            let newFiltered = newMovieState.filteredMovies
            let newMovies = newMovieState.movies
            newFiltered.unshift(action.payload)
            newMovies.unshift(action.payload)
            newMovieState.filteredMovies = newFiltered
            newMovieState.movies = newMovies

            return newMovieState

        case REMOVE_MOVIE:
            const removeMovieState = Object.assign({}, state)
            let removedMovie=''
            let filteredRemoved = removeMovieState.filteredMovies.filter(movie => movie.originalTitle !== removeMovieState.filteredMovies[action.index].originalTitle)
            for (let k=0; k < removeMovieState.movies.length; k++){
            if(action.originalTitle === removeMovieState.movies[k].originalTitle ){
            removedMovie=removeMovieState.movies.filter(movie => movie !== removeMovieState.movies[k])
        }}
            removeMovieState.movies = removedMovie
            removeMovieState.filteredMovies = filteredRemoved

            return removeMovieState

        case CHANGE_THEME:
            const changeThemeState = Object.assign({}, state)
            changeThemeState.themeStyle = action.payload
            if (action.payload.background ==='#dc004e'){
                changeThemeState.themeColor.red=true
                changeThemeState.themeColor.blue=false
                changeThemeState.themeColor.green=false
            }
            else if(action.payload.background==='#2E3B55'){
                changeThemeState.themeColor.red=false
                changeThemeState.themeColor.blue=true
                changeThemeState.themeColor.green=false
            }
            else {
                changeThemeState.themeColor.red=false
                changeThemeState.themeColor.blue=false
                changeThemeState.themeColor.green=true
            }
            
            return changeThemeState

        case DATE:
            const dateState = Object.assign({}, state)
            dateState.birthdayDate = action.date

            return dateState

        case YOUR_RATING:
            
            const yourRatingState = Object.assign({}, state)
            yourRatingState.filteredMovies[action.index].yourRating = action.yourRating
            for (let i; i < yourRatingState.movies.length; i++) {
                if (yourRatingState.movies[i].ranked === action.ranked)
                    return yourRatingState.movies.yourRating = action.yourRating
            }

            return yourRatingState

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
    return firebase.database().ref(localStorage.userId + "/moviesData/").set(movies)
}

function databaseThemeSet(themeStyle) {
    return firebase.database().ref(localStorage.userId + "/extras/").update(themeStyle)
}

function databaseThemeColorSet(themeColor) {
    return firebase.database().ref(localStorage.userId + "/extras/themeColor/").update(themeColor)
}

function databaseDateSet(birthdayDate) {
    return firebase.database().ref(localStorage.userId + "/extras/birthdayDate/").set(birthdayDate)
}

function databaseDarkModeSet(darkMode) {
    return firebase.database().ref(localStorage.userId + "/extras/darkMode/").set(darkMode)
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