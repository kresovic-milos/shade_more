export const LOG_IN = 'LOG_IN'
export const NEW_GAME = 'NEW_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'

export function logIn(userId) {
    return {
        type: LOG_IN,
        payload: userId
    }
}

export function newGame(game) {
    return {
        type: NEW_GAME,
        payload: game
    }
}

export function updateGame(game) {
    return {
        type: UPDATE_GAME,
        payload: game
    }
}