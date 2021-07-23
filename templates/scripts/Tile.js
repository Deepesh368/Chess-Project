import React from "react";

import "../static/Tile.css"

const Tile = (props) => {
    let cname = "tile white-tile";
    if (props.num === 1) {
        cname = "tile brown-tile";
    }
    if (props.image) {
        return (
            <div key={props.unq} className={cname}>
                <div className="piece" style={{ backgroundImage: `url(${props.image})` }}>

                </div>
            </div>
        )
    }
    return (
        <div key={props.unq} className={cname}>

        </div>
    )
}

export default Tile;