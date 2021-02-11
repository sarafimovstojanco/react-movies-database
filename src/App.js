import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import Auth from './SignIn/Auth'
import AddMovie from './AddMovie/AddMovie'
import UserPage from './UserProfile/UserPage';
import {Provider} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducer';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { getMovies, getDarkMode } from './redux/actions'

const App = _ => {
console.warn = console.error = () => {};

const darkMode = useSelector(state => state.darkMode)
  let mode = darkMode ? '(prefers-color-scheme: dark)' : '(prefers-color-scheme: light)'
  console.log(mode)
  console.log(darkMode)
  const prefersDarkMode =useMediaQuery(mode)

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMovies())
        dispatch(getDarkMode())
    }, [])

return (
  <div style = {{height: '100vh'}}>
  <Paper height="100%">
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <BrowserRouter>
      <Switch>
        <Route path={'/auth'} component={Auth} />
        <Route path={'/add-movie'} component={AddMovie} />
        <Route path={'/user-page'} component={UserPage} />
        <Route path={'/'} component={Home} />
      </Switch>
    </BrowserRouter>
    </ThemeProvider>
    </Paper>
    </div>
      )
}

export default App;

