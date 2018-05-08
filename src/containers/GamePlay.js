import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tile from '../components/Tile/Tile'
import Game from '../model/Game'
import { newGame, updateGame } from '../game_engine/actions'
import { isEmpty } from 'lodash'

const styles = {
    root: {
      width: "100%",
      paddingBottom: "100%"
    },
  }

class GamePlay extends Component {
    
    componentDidMount() {
        console.log("componentDidMount game", this.props.game);
        
        if (!this.props.game._lvlNumber) {
            console.log("game empty");
            
            this.props.newGame(new Game().toPlainObject())   
        }        
    }

    onTileClick = (index) => {
        const { game } = this.props
        game.onTileClick(index)
        
        this.props.updateGame(game)
    }

    render() {        
        const { game } = this.props
        return (
            <div style={styles.root}>
                {
                    game && game.tiles && game.tiles.map((tile, index) => <Tile key={index} isStarted={game.shadedTiles.length > 0} index={index} tile={tile} onClick={this.onTileClick} />)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state: game", state);
        
    return {
        game: new Game(state.game)
    }
}

const mapDispatchToProps = (dispatch) => {    
    return {
        newGame: (game) => dispatch(newGame(game)),
        updateGame: (game) => dispatch(updateGame(game))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)