import React, { useRef, useState } from "react";
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
import Referee from "./referee.js";

class ChessPiece {
    constructor(image, x, y, type) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.type = type;
    }
}

const initialBoardState = []


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
    let bp = new ChessPiece(blackPawn, blackPawnRank, j, "BP");
    let wp = new ChessPiece(whitePawn, whitePawnRank, j, "WP");
    initialBoardState.push(bp);
    initialBoardState.push(wp);

}


let bk = new ChessPiece(blackKing, blackPieceRank, blackkingPos, "BK");
initialBoardState.push(bk);
let wk = new ChessPiece(whiteKing, whitePieceRank, blackkingPos, "WK");
initialBoardState.push(wk);
let wq = new ChessPiece(whiteQueen, whitePieceRank, queenPos, "WQ");
initialBoardState.push(wq);
let bq = new ChessPiece(blackQueen, blackPieceRank, queenPos, "BQ");
initialBoardState.push(bq);
let br1 = new ChessPiece(blackRook, blackPieceRank, 0, "BR");
initialBoardState.push(br1);
let br2 = new ChessPiece(blackRook, blackPieceRank, 7, "BR");
initialBoardState.push(br2);
let wr1 = new ChessPiece(whiteRook, whitePieceRank, 0, "WR");
initialBoardState.push(wr1);
let wr2 = new ChessPiece(whiteRook, whitePieceRank, 7, "WR");
initialBoardState.push(wr2);

let wb1 = new ChessPiece(whiteBishop, whitePieceRank, 2, "WB");
initialBoardState.push(wb1);
let wb2 = new ChessPiece(whiteBishop, whitePieceRank, 5, "WB");
initialBoardState.push(wb2);
let bb1 = new ChessPiece(blackBishop, blackPieceRank, 2, "BB");
initialBoardState.push(bb1);
let bb2 = new ChessPiece(blackBishop, blackPieceRank, 5, "BB");
initialBoardState.push(bb2);

let wk1 = new ChessPiece(whiteKnight, whitePieceRank, 1, "WH");
initialBoardState.push(wk1);
let wk2 = new ChessPiece(whiteKnight, whitePieceRank, 6, "WH");
initialBoardState.push(wk2);
let bk1 = new ChessPiece(blackKnight, blackPieceRank, 1, "BH");
initialBoardState.push(bk1);
let bk2 = new ChessPiece(blackKnight, blackPieceRank, 6, "BH");
initialBoardState.push(bk2);



const Chessboard = (props) => {
    const [moving_piece, setMovingPiece] = useState(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState(initialBoardState);
    const chessboardRef = useRef(null);
    const referee = new Referee();

    function drop_piece(e) {
        const chessboard = chessboardRef.current;
        if (moving_piece && chessboard) {
            const y = Math.floor((e.clientX - 500) / 100);
            const x = Math.floor(e.clientY / 100);

            const attacking_piece = pieces.find(p => p.x == gridX && p.y == gridY);

            if(attacking_piece)
            {
                const valid = referee.ValidMove(gridX, gridY, x, y, attacking_piece.type, pieces);

                if(valid)
                {
                    const updated_pieces = pieces.reduce((results, piece) => {
                        if(piece.x == attacking_piece.x && piece.y == attacking_piece.y)
                        {
                            piece.x = x;
                            piece.y = y;
                            results.push(piece);
                        }
                        else if(!(piece.x == x && piece.y == y))
                        {
                            results.push(piece);
                        }
                        return results;
                    }, []);
                    setPieces(updated_pieces);
                }
                else
                {
                    moving_piece.style.position = "relative";
                    moving_piece.style.removeProperty("top");
                    moving_piece.style.removeProperty("left");
                }
            }
            setMovingPiece(null);
        }
    }

    function grab_piece(e) {
        const chessboard = chessboardRef.current

        const element = e.target;
        if (element.classList.contains("piece") && chessboard) {
            setGridX(Math.floor(e.clientY / 100));
            setGridY(Math.floor((e.clientX - 500) / 100));
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setMovingPiece(element)
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