import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import Auth from './SignIn/Auth'
import AddMovie from './AddMovie/AddMovie'
import UserPage from './UserProfile/UserPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from "@material-ui/core/Paper";
import Spinner from './Spinner/Spinner'
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { getMovies, getDarkMode, getThemeColor } from './redux/actions'

const App = _ => {
const dispatch = useDispatch()
const loading = useSelector(state => state.loading)
const darkMode = useSelector(state => state.darkMode)

console.warn = console.error = () => {};

  let mode = darkMode ? '(prefers-color-scheme: dark)' : '(prefers-color-scheme: light)'
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
    useEffect(() => {
        dispatch(getMovies())
        dispatch(getDarkMode())
        dispatch(getThemeColor())
    }, [])

return (
  loading ? <Spinner/> : <div style = {{height: '100vh'}}>
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

