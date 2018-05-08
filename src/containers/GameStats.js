import React, { Component } from 'react'
import { connect } from 'react-redux'

class GameStats extends Component {
    constructor() {
        super()

        this.state = {
            time: 0,
            timerId: -1,
            lvs: 0,
            shouldSetTimer: false
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId)
    }

    componentDidUpdate() {
        if (this.state.shouldSetTimer) {
            this.setState({
                shouldSetTimer: false,
                timerId: setInterval(this.tick.bind(this), 1000)                        
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { lives, startedAt, isStarted } = nextProps
        const { time, timerId, lvs } = prevState
        let nextState = null
        if (startedAt === -1) {            
            clearInterval(timerId)
            nextState = {
                time: 0
            }
        } else if (isStarted && lvs !== lives) {            
            nextState = {
                lvs: lives,
                shouldSetTimer: true
            }
        }
        return nextState
    }


    tick() {
        let updatedTime = Math.round((new Date().getTime() - this.props.startedAt) / 1000);
        this.setState({
            time: updatedTime
        })
    }

    render() {
        const { level, leftTiles, lives } = this.props

        return (
            <div>
                <h3>GameStats</h3>
                <p>Level: {level ? level : "/"}</p>
                <p>Left to shade: {leftTiles ? leftTiles : "/"}</p>
                <p>Lives: {lives ? lives : "/"}</p>
                <p>Time: {this.state.time}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        level: state.game._lvlNumber,
        leftTiles: state.game.leftTilesCount,
        lives: state.game.lives,
        startedAt: state.game.startedAt,
        isStarted: state.game.shadedTiles && state.game.shadedTiles.length > 0
    }
}

export default connect(mapStateToProps)(GameStats)