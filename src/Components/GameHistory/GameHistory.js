import React from "react";
import { Link } from "react-router-dom";



const GameHistory = (props) => {
    return (
        <div>
            <table id="customers">
                <tr>
                    <th>Дата</th>
                    <th>Сложность</th>
                    <th>Попытки</th>
                </tr>
                {!props.historyData ? 'Loading' : props.historyData.map((el) => {
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