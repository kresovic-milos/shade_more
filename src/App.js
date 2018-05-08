import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter, routerReducer, push } from 'react-router-redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from './configureStore'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import { AppBar, Divider } from 'material-ui';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import RootContainer from './containers/RootContainer'
import { saveState } from './utils/localStorage';

const history = createHistory()
const store = configureStore(history)
store.subscribe(() => {
  saveState({
    game: store.getState().game
  })
})

const styles = {
  root: {
    flexGrow: 1,    
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

class App extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={createMuiTheme()}>
              <div>

                <AppBar position="static">
                  <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                      Shade More
                    </Typography>
                    <Button color="inherit">Login</Button>
                  </Toolbar>
                </AppBar>

                <RootContainer />
                
              </div>
            </MuiThemeProvider>
          </ConnectedRouter>
        </Provider>
      </div>
    )
  }
}

export default withStyles(styles)(App)