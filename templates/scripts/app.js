import React from "react";
import { render } from "react-dom";
import Chessboard from "./chessboard";
import "../static/app.css"

const App = () => {
    return (
        <div>
            <Chessboard/>
        </div>
    );
};

render(<App />, document.getElementById("root"));