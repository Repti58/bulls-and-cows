import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const GameHistory = () => {

    const [historyData, setHistoryData] = useState(null);
    const [bestResults, setBestResults] = useState(null);


    async function bestResultsFetch() {
        
        let res = await fetch('https://jade-glorious-fountain.glitch.me/best_results')
        res = await res.json()        
        return res
    }

    async function historyDataFetch() {
        
        let res = await fetch('https://jade-glorious-fountain.glitch.me/api')
        res = await res.json()
        return res.reverse()
    }


    async function fetchRequests() {
        
        const fetchHistoryData = await historyDataFetch();
        console.log(fetchHistoryData);
        setHistoryData(fetchHistoryData);
        const fetchbestResults = await bestResultsFetch();
        console.log(fetchbestResults);
        setBestResults(fetchbestResults);
    }
    useEffect(() => {
        
        fetchRequests()
    }, [])


    function bestResultsTable() {

        return (
            <table id="games">
                <thead>
                    <tr>
                        <th>3 цифры</th>
                        <th>4 цифры</th>
                        <th>5 цифр</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{!bestResults ? (<div className="loader"></div>) : bestResults[0].steps}</td>
                        <td>{!bestResults ? (<div className="loader"></div>) : bestResults[1].steps}</td>
                        <td>{!bestResults ? (<div className="loader"></div>) : bestResults[2].steps}</td>
                    </tr>
                </tbody>
            </table>
        )

    }
    function GameHistoryTable() {

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
                    {!historyData ? (<div className="loader"></div>) : table()}
                </div>
                <div className="backLink">
                    <Link to='/main' className='link'><button className="button">Назад к игре</button></Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <p className="title3">Лучшие результаты</p>
            <div>{bestResultsTable()}</div>
            <p></p>
            <p className="title3"> История игр</p>
            <div>{GameHistoryTable()}</div>
        </div>
    )
}

export default GameHistory;