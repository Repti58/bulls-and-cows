import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const GameHistory = () => {
    debugger
    const [historyData, setHistoryData] = useState(null);

    useEffect(() => {
        debugger
        fetch('http://localhost:3002/api')
            // .then((res) => console.log(res.json()))
            .then((res) => res.json())
            // console.log(res.json())
            // .then((res) => console.log(res.json()))
            .then(res => setHistoryData(res.reverse()))
            .catch(err => console.error(err));
    }, [])


    function GameHistoryTable() {
        debugger
        const table = () => {
            return (
                <table id="games">

                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Сложность</th>
                            <th>Попытки</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((el, index) => {
                            return (
                                <tr key={index}>
                                    <td>{el.date}</td>
                                    <td>{el.difficulty}</td>
                                    <td>{el.steps}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            )
        }

        return (
            <div>
                <div>
                    {!historyData ? 'Loading' : table()}
                </div>
                <div className="backLink">
                    <Link to='/main'><button className="button">Назад к игре</button></Link>
                </div>
            </div>
        )
    }

    return GameHistoryTable()

}

export default GameHistory;