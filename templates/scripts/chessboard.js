import React from "react";
import "../static/chessboard.css";
import Tile from "./Tile";

const Chessboard = () => {
    let chess_grid = [];
    let number = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 == 1) {
                chess_grid.push(<Tile num={0} key={number} />);
            }
            else {
                chess_grid.push(<Tile num={1} key={number} />);
            }
            number++;
        }
    }
    return (
        <div className="block">{chess_grid}</div>
    );
};

export default Chessboard;