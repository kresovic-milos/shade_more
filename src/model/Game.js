import { pick, isEmpty, random, times, last, sample, forEachRight, includes } from 'lodash'
import Tile from './Tile'

export default class Game {
    constructor(obj) {
        if (obj) {            
            Object.keys(obj).forEach(key => this[key] = obj[key]);       
        } else {     
            this.lives = 1

            this.lvlNumber = 1
            this.startedAt = -1
            this.shadedTiles = []
            this.leftTilesCount = this._lvlNumber + 1          
            this.tiles = Array(100).fill().map((t, i) => {
                return new Tile(i)
            })
        }

        this.allPossibleMoves = [
            [-3, 0],
            [-2, 2],
            [0, 3],
            [2, 2],
            [3, 0],
            [2, -2],
            [0, -3],
            [-2, -2]
        ]
        this.onTileClick = (index) => {
            if (this.tiles[index].shadeLevel > 1) {
                return
            }
            const shadedTiles = { ...this.shadedTiles }
            if (isEmpty(shadedTiles)) {
                this.generateShadedTiles(index)
                this.startedAt = Date.now()
            } else {
                if (this.tiles[index].shadeLevel !== 1) {
                    return
                }
            }

            this.updateTiles(index)
        }

        this.toPlainObject = () => {            
            return pick(this, "lives", "_lvlNumber", "shadedTiles", "leftTilesCount", "tiles", "startedAt")
        }
    }

    set lvlNumber(lvlNumber) {        
        if (lvlNumber > 99) {
            this._lvlNumber = 99
        } else if (lvlNumber < 1) {
            this._lvlNumber = 1
        } else {
            this._lvlNumber = lvlNumber
        }
    }

    resetLevel() {         
        this.startedAt = -1
        this.shadedTiles = []
        this.leftTilesCount = this._lvlNumber + 1
        this.tiles = forEachRight(this.tiles, tile => {
            tile.shadeLevel = 0
            tile.tileNum = -1
        })
    }

    gameOver() {
        let livesAfter = this.lives - this.leftTilesCount
        if (livesAfter < 1) {
            this.lives = 1
            this._lvlNumber = 1    
        } else {
            this.lives = livesAfter
        }
        
        this.resetLevel()
    }

    nextLevel() {
        this.lives++
        this._lvlNumber += 1
        this.resetLevel()
    }

    generateShadedTiles(index) {
        let firstTile = this.tiles[index]
        firstTile.shadeLevel = 1
        this.tiles[index] = firstTile
        this.shadedTiles.push({
            index: index
        })
        let tileNum = 0
        times(this._lvlNumber, () => {
            let startingTileIndex = this.shadedTiles.length - 1
            let currentPossibleMoves = this.getCurrentPossibleMoves(this.shadedTiles[startingTileIndex].index, 0)
            while (isEmpty(currentPossibleMoves)) {
                currentPossibleMoves = this.getCurrentPossibleMoves(this.shadedTiles[startingTileIndex].index, 0)
                startingTileIndex--
            }
            // console.log("currentPossibleMoves", currentPossibleMoves);

            let newIndex = sample(currentPossibleMoves)
            let tileToUpdate = this.tiles[newIndex]
            tileToUpdate.shadeLevel = 1
            tileToUpdate.tileNum = tileNum
            tileNum++
            this.tiles[newIndex] = tileToUpdate
            this.shadedTiles.push({
                index: newIndex
            })
        })
    }

    getCurrentPossibleMoves(index, ...shadeLevel) {
        let x = index % 10
        let y = (index / 10) >> 0
        let currPossMov = this.allPossibleMoves.filter(move => {
            let possibleX = x + move[0]
            let possibleY = y + move[1]

            let isInRange = possibleX > -1 && possibleY > -1 && possibleX < 10 && possibleY < 10
            if (!isInRange) {
                return false
            }

            let possibleIndex = possibleX + possibleY * 10
            let possibleTile = this.tiles[possibleIndex]
            
            return possibleTile && includes(shadeLevel, possibleTile.shadeLevel)
        }).map(move => {
            let possibleX = (x + move[0])
            let possibleY = y + move[1]
            return possibleX + possibleY * 10
        })

        return currPossMov
    }

    updateTiles(index) {
        this.leftTilesCount -= 1        

        forEachRight(this.shadedTiles, tile => this.updateTile(tile, index))
        if (this.leftTilesCount === 0) {
            this.nextLevel()
            return
        }

        let possibleMoves = this.getCurrentPossibleMoves(index, 1)
        console.log("possibleMoves", possibleMoves);
        
        if (isEmpty(possibleMoves)) {
            this.gameOver()
            return
        }
    }

    updateTile(tile, index) {
        let tileToUpdate = this.tiles[tile.index]
        if (tileToUpdate.shadeLevel === 3) {
            return
        }
        
        if (tile.index === index) {
            tileToUpdate.shadeLevel = 3
        } else {
            let isClickable = includes(this.getCurrentPossibleMoves(index, 0, 1, 2), tile.index)
            tileToUpdate.shadeLevel = isClickable ? 1 : 2       
        }
        this.tiles[tile.index] = tileToUpdate
    }
}