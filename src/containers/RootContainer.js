import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import GamePlay from './GamePlay'
import GameInfo from './GameInfo'

const styles = {
    root: {
      margin: 20,
    }
  }

class RootContainer extends Component {

    render() {
        return (
            <div style={styles.root}>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={4}>
                        
                            <GamePlay />
                        
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        
                            <GameInfo />
                        
                    </Grid>
                </Grid>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {

//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {

//     }
// }

export default RootContainer