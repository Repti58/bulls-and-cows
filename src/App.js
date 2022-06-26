import React from "react";
import { Route, Routes } from "react-router-dom";
import GameArea from "./Components/GameArea/GameArea";
import Rules from "./Components/Rules/Rules";
import GameHistory from "./Components/GameHistory/GameHistory";

const App = () => {

    return (
        <div className="container">
            <div  >
                <p className="title">
                    БЫКИ И КОРОВЫ
                </p>
                <p className="title2">
                    логическая игра
                </p>
            </div>
            <div>
                <Routes>
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/main" element={<GameArea />} />
                    <Route path="/*" element={<GameArea />} />
                    <Route path="/gamehistory" element={<GameHistory />} />
                </Routes>
            </div>
        </div>
    )
}
export default App