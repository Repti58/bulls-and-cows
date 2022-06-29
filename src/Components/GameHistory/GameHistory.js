import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const GameHistory = () => {
    debugger
    const [historyData, setHistoryData] = useState(null);
    const [bestResults, setBestResults] = useState(null);


const bestResultsFetch = () => {
    fetch('http://localhost:3002/api_best_results')
    // .then((res) => console.log(res.json()))
    .then((res) => res.json())
    // console.log(res.json())
    // .then((res) => console.log(res.json()))
    .then(res => setBestResults(res))    
    .catch(err => console.error(err));
}

const historyDataFetch = () => {
    fetch('http://localhost:3002/api')
    // .then((res) => console.log(res.json()))
    .then((res) => res.json())
    // console.log(res.json())
    // .then((res) => console.log(res.json()))
    .then(res => setHistoryData(res))    
    .catch(err => console.error(err));
}

async function fetchData() {
debugger
 
    let response = await fetch('http://localhost:3002/api');
    let fetchHystoryData = await response.json();
    setHistoryData(fetchHystoryData)     
    
    let response2 = await fetch('http://localhost:3002/api_best_results');
    let fetchBestResults = await response2.json();
    setBestResults(fetchBestResults)
}
    useEffect(() => {
        debugger
        fetchData()


        // bestResultsFetch()
        // historyDataFetch()


        // fetch('http://localhost:3002/api')
        //     // .then((res) => console.log(res.json()))
        //     .then((res) => res.json())
        //     // console.log(res.json())
        //     // .then((res) => console.log(res.json()))
        //     .then(res => setHistoryData(res.reverse()))
        //     .catch(err => console.error(err));
            
            // fetch('http://localhost:3002/api_best_results')
            // // .then((res) => console.log(res.json()))
            // .then((res) => res.json())
            // // console.log(res.json())
            // // .then((res) => console.log(res.json()))
            // .then(res => setBestResults(res))
            
            // .catch(err => console.error(err));
        }, [])


    function bestResultsTable() {
        debugger
        return (
            <table id="games">
                <thead>
                    <tr>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {/* <td>3</td>
                    <td>4</td>
                    <td>5</td> */}
                    <td>{!bestResults ? "Loading" : bestResults[0].steps }</td>
                    <td>{!bestResults ? "Loading" : bestResults[1].steps}</td>
                    <td>{!bestResults ? "Loading" : bestResults[2].steps}</td>
                    </tr>
                </tbody>
            </table>
        )

    }
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

    return (
        <div>
            <div>{bestResultsTable()}</div>
            <div>{GameHistoryTable()}</div>
        </div>
    )
}

export default GameHistory;