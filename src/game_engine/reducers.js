import { NEW_GAME, UPDATE_GAME } from './actions';

export default function (state = {}, action) {
    switch (action.type) {
        case NEW_GAME:
            return action.payload
        case UPDATE_GAME:
            return action.payload
        default:
            return state
    }
}