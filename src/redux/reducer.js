import { GET_MOVIES, SET_WATCHED, FILTER_BY_VALUE, RELOAD_MOVIES, SET_USER, SORT_BY, WARNING, CLEAR_WARNING, GET_USER, SET_RATING, SET_UNWATCHED, SET_RECENT, UNSET_RECENT } from './types'

const initialState = {
    movies: [],
    filteredMovies: [],
    searching: false,
    currentPage: 1,
    countPerPage: '',
    loading: true,
    firstName: '',
    goToFirstPage:'',
    goToNextPage: '',
    goToLastPage: '',
    appliedFilters: [],
    darkMode: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES:
            let getState = Object.assign({}, state)
            getState.loading = true
            getState.movies = action.payload.data 
            getState.filteredMovies = action.payload.data 
            getState.countPerPage = action.payload.countPerPage
            getState.totalCount = action.payload.total
            getState.currentPage = action.payload.currentPage
            getState.totalPages = action.payload.totalPages
            getState.goToFirstPage = action.payload.goToFirstPage
            getState.goToNextPage = action.payload.goToNextPage
            getState.goToLastPage = action.payload.goToLastPage
            getState.loading = false

            return getState
        
        case RELOAD_MOVIES:
            let reloadState = Object.assign({}, state)
            reloadState.movies = action.payload.data 
            reloadState.filteredMovies = action.payload.data 
            return reloadState

        case GET_USER:
            
            let getUserState = Object.assign({}, state)
            console.log(state)
            getUserState.loading = true
            getUserState.firstName = action.payload.firstName
            getUserState.lastName = action.payload.lastName
            getUserState.email = action.payload.email
            getUserState.recent = action.payload.movies.reverse().slice(0, 5)
            getUserState.userId = action.payload.id
            getUserState.themeStyle = {
               background: action.payload.background}
            getUserState.themeColor = action.payload.color
            getUserState.darkMode = action.payload.darkMode
            getUserState.loading = false

            return getUserState

        case SET_USER:
            let setUserState = Object.assign({}, state)
            console.log(action.payload)
            setUserState.themeStyle = {
               background: action.payload.background}
            setUserState.themeColor = action.payload.color
            setUserState.darkMode = action.payload.dark_mode

            return setUserState

        case SET_RECENT:
            let setRecentMoviesState = Object.assign({}, state)
            for(let i=0; i<setRecentMoviesState.movies.length; i++)
            {   
                if (setRecentMoviesState.movies[i].id === action.payload.id) {
                    setRecentMoviesState.recent.unshift(setRecentMoviesState.movies[i])
                }
            }
            setRecentMoviesState.recent = setRecentMoviesState.recent.slice(0, 5)

            return setRecentMoviesState
        
        case UNSET_RECENT:
            let unsetRecentMoviesState = Object.assign({}, state)
            unsetRecentMoviesState.recent = action.payload.movies.reverse().slice(0, 5)
            
            return unsetRecentMoviesState
        
        case SET_RATING:
            let setRatingState = Object.assign({}, state)
            for(let i=0; i<setRatingState.filteredMovies.length; i++)
            {
                if (setRatingState.filteredMovies[i].title === action.payload.title){
                    setRatingState.filteredMovies[i].rating = action.payload.rating
                }
            }

            return setRatingState

        case SET_WATCHED:
            let watchedState = Object.assign({}, state);
            console.log(watchedState)
            for(let i=0; i<watchedState.filteredMovies.length; i++)
            {
                if (watchedState.filteredMovies[i].title === action.payload.title){
                    watchedState.filteredMovies[i].watched = true
                    watchedState.filteredMovies[i].rating = null
                }
            }
            return watchedState

        case SET_UNWATCHED:
            let unwatchedState = Object.assign({}, state);
            for(let i=0; i<unwatchedState.filteredMovies.length; i++)
            {
                if (unwatchedState.filteredMovies[i].title === action.payload.title){
                    unwatchedState.filteredMovies[i].watched = false
                    unwatchedState.filteredMovies[i].rating = null
                }
            }
            return unwatchedState
            
        case WARNING:
            let warningState = Object.assign({}, state);
            warningState.warning =  action.payload.type
            warningState.watchedMovie = action.payload.title

            return warningState

        case CLEAR_WARNING:
            let clearWarningState = Object.assign({}, state);
            clearWarningState.warning = null
            clearWarningState.watchedMovie = null

            return clearWarningState

        case FILTER_BY_VALUE:
            let newState = Object.assign({}, state);
            if (action.payload.value){
            newState.searching = true
            newState.filteredMovies = action.payload.filtered}
            else 
            newState.filteredMovies =  newState.movies
            newState.searching = false

            return newState;

        // case SORT_BY:
        //     const sortByAlphabetState = Object.assign({}, state);
        //     console.log(action)
        //     console.log(sortByAlphabetState)
        //     let sortedAlphabetArr = action.order ?
        //         sortAsc(sortByAlphabetState.movies, action.item) :
        //         sortDesc(sortByAlphabetState.movies, action.item);
        //     sortByAlphabetState.filteredMovies = sortedAlphabetArr;
        //     return sortByAlphabetState;

        default: return state
    }
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