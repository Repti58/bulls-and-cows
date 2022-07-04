import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const GameHistory = () => {

    const [historyData, setHistoryData] = useState(null);
    const [bestResults, setBestResults] = useState(null);


    async function bestResultsFetch() {
        debugger
        let res = await fetch('http://localhost:3002/best_results')
        res = await res.json()
        console.log(`from bestResultsFetch ${res}`)
        return res
        // console.log(res);
        // .then((res) => console.log(res.json()))


        // .then((res) => console.log(res.json()))
        // .then(res => setBestResults(res))    
        // .catch(err => console.error(err));
    }

    async function historyDataFetch() {
        debugger
        let res = await fetch('http://localhost:3002/api')
        res = await res.json()
        return res.reverse()
        //    console.log(res)
        // .then((res) => console.log(res.json()))
        // .then((res) => res.json())
        // console.log(res.json())
        // .then((res) => console.log(res.json()))
        // .then(res => setHistoryData(res.reverse()))    
        // .catch(err => console.error(err));
    }

    // async function fetchData() {
    // debugger

    //     let response = await fetch('http://localhost:3002/api');
    //     let fetchHystoryData = await response.json();
    //     setHistoryData(fetchHystoryData)     

    //     let response2 = await fetch('http://localhost:3002/api_best_results');
    //     let fetchBestResults = await response2.json();
    //     setBestResults(fetchBestResults)
    // }


    async function fetchRequests() {
        debugger
        const fetchHistoryData = await historyDataFetch();
        console.log(fetchHistoryData);
        setHistoryData(fetchHistoryData);
        const fetchbestResults = await bestResultsFetch();
        console.log(fetchbestResults);
        setBestResults(fetchbestResults);
    }
    useEffect(() => {
        debugger
        fetchRequests()


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
                        <td>{!bestResults ? "Loading" : bestResults[0].steps}</td>
                        <td>{!bestResults ? "Loading" : bestResults[1].steps}</td>
                        <td>{!bestResults ? "Loading" : bestResults[2].steps}</td>
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
            <p className="title3">Лучшие результаты</p>
            <div>{bestResultsTable()}</div>
            <p></p>
            <p className="title3"> История Игр</p>
            <div>{GameHistoryTable()}</div>
        </div>
    )
}

export default GameHistory;