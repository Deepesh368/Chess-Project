import React from "react";

import "../static/Tile.css"


import image from 'url:../Images/black_king.png'



const Tile = (num, key) => {
    console.log(key)
    if (num.num === 1) {
        return (
            <div key={key} className="tile brown-tile"><img src={image} /></div>
        )
    }
    else {
        return (
            <div key={key} className="tile white-tile"></div>
        )
    }
}

export default Tile;