import React from "react";
import "../static/chessboard.css"

const Chessboard = () => {
    let chess_grid = [];
    let number = 0;
    for(let i = 0; i < 8; i++)
    {
        for(let j = 0; j < 8; j++)
        {
            if((i + j) % 2 == 1)
            {
                chess_grid.push(<div key = {number}  className = "brown-square"></div>);
            }
            else
            {
                chess_grid.push(<div key = {number} className = "white-square"></div>);
            }
            number++;
        }
    }
    return (
        <div className = "block">{ chess_grid }</div>
    );
};

export default Chessboard;