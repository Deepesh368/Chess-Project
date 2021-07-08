import React from "react";
import "../static/chessboard.css"

const Chessboard = () => {
    let chess_grid = [];
    for(let i = 0; i < 8; i++)
    {
        for(let j = 0; j < 8; j++)
        {
            if((i + j) % 2 == 1)
            {
                chess_grid.push(<div class = "brown-square"></div>);
            }
            else
            {
                chess_grid.push(<div class = "white-square"></div>);
            }
        }
    }
    return (
        <div class = "block">{ chess_grid }</div>
    );
};

export default Chessboard;