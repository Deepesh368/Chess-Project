import React from "react";
import { render } from "react-dom";
import Chessboard from "./chessboard";
import "../static/app.css"
import updatePosition from "./chessboard"
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

class ChessPiece {
    constructor(image, x, y) {
        this.image = image;
        this.x = x;
        this.y = y;
    }
}



const App = () => {
    let facing = 0;
    let whitePawnRank = 6;
    let blackPawnRank = 1;
    let whitePieceRank = 7;
    let blackPieceRank = 0;
    if (facing == 1) {
        let temp = whitePawnRank;
        whitePawnRank = blackPawnRank;
        blackPawnRank = temp;
        temp = whitePieceRank;
        whitePieceRank = blackPieceRank;
        blackPieceRank = temp;
    }
    var pieces = [];

    for (let j = 0; j < 8; j++) {
        let bp = new ChessPiece(blackPawn, blackPawnRank, j);
        let wp = new ChessPiece(whitePawn, whitePawnRank, j);
        pieces.push(bp);
        pieces.push(wp);
    }

    let bk = new ChessPiece(blackKing, blackPieceRank, 4);
    pieces.push(bk);
    let wk = new ChessPiece(whiteKing, whitePieceRank, 4);
    pieces.push(wk)
    let wq = new ChessPiece(whiteQueen, whitePieceRank, 3);
    pieces.push(wq);
    let bq = new ChessPiece(blackQueen, blackPieceRank, 3);
    pieces.push(bq)
    let br1 = new ChessPiece(blackRook, blackPieceRank, 0)
    pieces.push(br1)
    let br2 = new ChessPiece(blackRook, blackPieceRank, 7)
    pieces.push(br2)
    let wr1 = new ChessPiece(whiteRook, whitePieceRank, 0)
    pieces.push(wr1)
    let wr2 = new ChessPiece(whiteRook, whitePieceRank, 7)
    pieces.push(wr2)

    let wb1 = new ChessPiece(whiteBishop, whitePieceRank, 2)
    pieces.push(wb1)
    let wb2 = new ChessPiece(whiteBishop, whitePieceRank, 5)
    pieces.push(wb2)
    let bb1 = new ChessPiece(blackBishop, blackPieceRank, 2)
    pieces.push(bb1)
    let bb2 = new ChessPiece(blackBishop, blackPieceRank, 5)
    pieces.push(bb2)

    let wk1 = new ChessPiece(whiteKnight, whitePieceRank, 1);
    pieces.push(wk1)
    let wk2 = new ChessPiece(whiteKnight, whitePieceRank, 6);
    pieces.push(wk2)
    let bk1 = new ChessPiece(blackKnight, blackPieceRank, 1);
    pieces.push(bk1)
    let bk2 = new ChessPiece(blackKnight, blackPieceRank, 6);
    pieces.push(bk2)
    return (
        <div>

            <Chessboard pieces={pieces} />
        </div>
    );
};

render(<App />, document.getElementById("root"));