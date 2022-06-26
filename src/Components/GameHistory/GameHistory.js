import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const GameHistory = (props) => {
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

    
    return (
        <div>
            <table id="customers">
                <tr>
                    <th>Дата</th>
                    <th>Сложность</th>
                    <th>Попытки</th>
                </tr>
                {!historyData ? 'Loading' : historyData.map((el) => {
                    return (
                        <tr>
                            <td>
                                {el.date}
                            </td>
                            <td>
                                {el.difficulty}
                            </td>
                            <td>
                                {el.steps}
                            </td>
                        </tr>
                    )
                })}
            </table>
            <div className="backLink">
                <Link to='/main'><button className="button">Назад к игре</button></Link>
            </div>
        </div>
    )

}

export default GameHistory;