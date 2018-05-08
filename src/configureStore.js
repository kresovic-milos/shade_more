import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { loadState } from './utils/localStorage';

const persistedState = loadState()

export default function configureStore(history, initialState = {}) {

    return createStore(
        rootReducer,
        persistedState,
        applyMiddleware(routerMiddleware(history), thunk)
    )
}