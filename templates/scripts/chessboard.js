import React, { useEffect, useRef, useState } from "react";
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

class ChessPiece {
    constructor(image, x, y) {
        this.image = image;
        this.x = x;
        this.y = y;
    }
}

initialBoardState = []


let facing = 0;
let whitePawnRank = 6;
let blackPawnRank = 1;
let whitePieceRank = 7;
let blackPieceRank = 0;
let blackkingPos = 4;
let queenPos = 3;
if (facing == 1) {
    let temp = whitePawnRank;
    whitePawnRank = blackPawnRank;
    blackPawnRank = temp;
    temp = whitePieceRank;
    whitePieceRank = blackPieceRank;
    blackPieceRank = temp;
    blackkingPos = 3
    queenPos = 4;
}

for (let j = 0; j < 8; j++) {
    let bp = new ChessPiece(blackPawn, blackPawnRank, j);
    let wp = new ChessPiece(whitePawn, whitePawnRank, j);
    initialBoardState.push(bp);
    initialBoardState.push(wp);

}


let bk = new ChessPiece(blackKing, blackPieceRank, blackkingPos);
initialBoardState.push(bk);
let wk = new ChessPiece(whiteKing, whitePieceRank, blackkingPos);
initialBoardState.push(wk)
let wq = new ChessPiece(whiteQueen, whitePieceRank, queenPos);
initialBoardState.push(wq);
let bq = new ChessPiece(blackQueen, blackPieceRank, queenPos);
initialBoardState.push(bq)
let br1 = new ChessPiece(blackRook, blackPieceRank, 0)
initialBoardState.push(br1)
let br2 = new ChessPiece(blackRook, blackPieceRank, 7)
initialBoardState.push(br2)
let wr1 = new ChessPiece(whiteRook, whitePieceRank, 0)
initialBoardState.push(wr1)
let wr2 = new ChessPiece(whiteRook, whitePieceRank, 7)
initialBoardState.push(wr2)

let wb1 = new ChessPiece(whiteBishop, whitePieceRank, 2)
initialBoardState.push(wb1)
let wb2 = new ChessPiece(whiteBishop, whitePieceRank, 5)
initialBoardState.push(wb2)
let bb1 = new ChessPiece(blackBishop, blackPieceRank, 2)
initialBoardState.push(bb1)
let bb2 = new ChessPiece(blackBishop, blackPieceRank, 5)
initialBoardState.push(bb2)

let wk1 = new ChessPiece(whiteKnight, whitePieceRank, 1);
initialBoardState.push(wk1)
let wk2 = new ChessPiece(whiteKnight, whitePieceRank, 6);
initialBoardState.push(wk2)
let bk1 = new ChessPiece(blackKnight, blackPieceRank, 1);
initialBoardState.push(bk1)
let bk2 = new ChessPiece(blackKnight, blackPieceRank, 6);
initialBoardState.push(bk2)



const Chessboard = (props) => {
    const [moving_piece, setMovingPiece] = useState(null)
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState(initialBoardState)
    const chessboardRef = useRef(null);



    function drop_piece(e) {
        const chessboard = chessboardRef.current

        if (moving_piece && chessboard) {
            const y = Math.floor((e.clientX - 500) / 100);
            const x = Math.floor(e.clientY / 100);

            setPieces((value) => {
                const pieces = value.map((p) => {
                    if (p.x === gridX && p.y === gridY) {
                        p.x = x;
                        p.y = y;
                    }
                    return p;
                })
                return pieces
            })
            setMovingPiece(null);
        }

    }

    function grab_piece(e) {
        const chessboard = chessboardRef.current

        const element = e.target;
        if (element.classList.contains("piece") && chessboard) {


            setGridX(Math.floor(e.clientY / 100));
            setGridY(Math.floor((e.clientX - 500) / 100));
            console.log(e);
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setMovingPiece(element)
            let x1 = Math.floor((x + 50 - 500) / 100);
            let y1 = Math.floor((y + 50) / 100);



        }
    }

    function move_piece(e) {
        const chessboard = chessboardRef.current
        if (moving_piece != null && chessboard) {
            const minX = (chessboard.offsetLeft) - 25;
            const maxX = (chessboard.offsetLeft) + chessboard.clientWidth - 50
            const minY = (chessboard.offsetTop) - 25;
            const maxY = (chessboard.offsetTop) + chessboard.clientHeight - 50
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            moving_piece.style.position = "absolute";
            // moving_piece.style.left = `${x}px`;
            // moving_piece.style.top = `${y}px`;

            if (x < minX) {
                moving_piece.style.left = `${minX}px`;
            }
            else if (x > maxX) {
                moving_piece.style.left = `${maxX}px`;
            }
            else {
                moving_piece.style.left = `${x}px`;
            }
            if (y < minY) {
                moving_piece.style.top = `${minY}px`;
            }
            else if (y > maxY) {
                moving_piece.style.top = `${maxY}px`;
            }
            else {
                moving_piece.style.top = `${y}px`;
            }

        }
    }
    let chess_grid = [];
    let number = 0;


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
        <div onMouseUp={e => drop_piece(e)} onMouseMove={e => move_piece(e)} onMouseDown={e => grab_piece(e)} className="block" id="chessboard" ref={chessboardRef}>{chess_grid}</div>
    );
};

export default Chessboard;