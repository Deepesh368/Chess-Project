import React from "react";
import "../static/chessboard.css";
import Tile from "./Tile";

let moving_piece = null;

function drop_piece(e) {
    if(moving_piece != null)
    {
        moving_piece = null;
    }
}

function grab_piece(e) {
    const element = e.target;
    if(element.classList.contains("piece"))
    {
        console.log(e);
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        moving_piece = element;
    }
}

function move_piece(e) {
    if(moving_piece != null)
    {
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        moving_piece.style.position = "absolute";
        moving_piece.style.left = `${x}px`;
        moving_piece.style.top = `${y}px`;
    }
}

const Chessboard = (props) => {
    let chess_grid = [];
    let number = 0;

    let pieces = props.pieces;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let flag = 0;
            for (let p of pieces) {
                if (p.x == i && p.y == j) {
                    flag = 1;
                    chess_grid.push(<Tile key={number} row={i} unq={number} num={(i + j) % 2} column={j} image={p.image} />)
                    number++;
                    break;
                }
            }
            if (flag == 0) {
                chess_grid.push(<Tile key={number} row={i} unq={number} num={(i + j) % 2} column={j} />)
                number++;
            }
        }
    }

    return (
        <div onMouseUp = {e => drop_piece(e)} onMouseMove = {e => move_piece(e)} onMouseDown = {e => grab_piece(e)} className="block">{chess_grid}</div>
    );
};

export default Chessboard;