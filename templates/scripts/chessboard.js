import React from "react";
import "../static/chessboard.css";
import Tile from "./Tile";
import blackPawn from 'url:../Images/black_pawn.png'
import whitePawn from 'url:../Images/white_pawn.png'
import whiteKnight from 'url:../Images/white_horse.png'
import whiteBishop from 'url:../Images/white_bishop.png'
import whiteRook from 'url:../Images/white_rook.png'
import whiteKing from 'url:../Images/white_king.png'
import whiteQueen from 'url:../Images/white_queen.png'
import blackKnight from 'url:../Images/black_horse.png'
import blackBishop from 'url:../Images/black_bishop.png'
import blackRook from 'url:../Images/black_rook.png'
import blackKing from 'url:../Images/black_king.png'
import blackQueen from 'url:../Images/black_queen.png'







const Chessboard = (props) => {
    let chess_grid = [];
    let number = 0;


    let pieces = props.pieces;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let flag = 0;
            for (let k = 0; k < pieces.length; k++) {
                let p = pieces[k];
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
        <div className="block">{chess_grid}</div>
    );
};

export default Chessboard;