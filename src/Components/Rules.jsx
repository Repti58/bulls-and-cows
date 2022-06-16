import React from "react"
import { Link } from "react-router-dom"
import '../App.css';


const Rules = (props) => {
    return (
        <div>
            <div className="rules">
                <h4>Правила игры</h4>
                {props.rulesText}
                <h4>Пример</h4>
                {props.rulesExample}
            <div>
                <Link to='/main'><button className="button">Назад к игре</button></Link>
            </div>
            </div>

        </div>

    )
}

export default Rules