import uuidv4 from 'uuid/v4'

export default class User {
    constructor() {
        const userId = uuidv4()
        this.id = userId
        this.name = "Guest" + userId
        this.level = 1
        this.gamePlayed = 0
    }
}