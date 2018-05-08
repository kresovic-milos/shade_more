import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import gameReducer from './game_engine/reducers'

const rootReducer = combineReducers({  
  router: routerReducer,
  game: gameReducer  
})

export default rootReducer