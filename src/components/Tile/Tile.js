import React from 'react'
import styles from './style.css'

const bgColors = ["inactive", "clickable", "unclickable", "finished"];

const Tile = (props) => {
    const { tile, onClick, index, isStarted } = props
    
    const shadeLevel = tile ? tile.shadeLevel : 0
    const shadeLevelClass = bgColors[shadeLevel]
    const startedClass = isStarted ? "started" : "notStarted"
    
    return (
        <div onClick={() => onClick(index)} className="tile">
            <div className={"tileContent " + shadeLevelClass + " " + startedClass}>
                {/* {tile.tileNum > -1 && tile.tileNum} */}
            </div>
        </div>
    );
}

export default Tile