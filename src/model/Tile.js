export default class Tile {
    constructor(index, obj) {
        if (obj) {
            Object.assign(this, obj);
        } else {
            this.shadeLevel = 0
            this.index = index
            this.tileNum = -1
        }
    }
}