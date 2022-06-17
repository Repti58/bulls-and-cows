import React from "react";
import ResultList from "./ResultList";
import InfoBar from "./InfoBar";
import { Link } from "react-router-dom";

function Main(props) {

    return (
        <div>
            <div className="underTitle">
                <Link to='/rules'><button className="infoButton" >Правила игры</button></Link>
                <div class="difficulty">
                    <button onClick={(e) => props.difficultyRange(3)}>3</button>
                    <button onClick={(e) => props.difficultyRange(4)}>4</button>
                    <button onClick={(e) => props.difficultyRange(5)}>5</button>
                    
                </div>
                <h3>Компьютер уже что то задумал...</h3>
            </div>

            <div className="form">
                <input className="input" ref={props.input} autoFocus maxLength={props.difficulty} value={props.value} onChange={(event) => props.setValue(event.target.value)} />
                <div>
                    <InfoBar info={props.info} />
                </div>
                <div className="divButton">
                    <button className="button" disabled={props.disableBtnShot} onClick={props.check}>Сделать ход</button>
                    <button className="button" disabled={props.disableBtnReset} onClick={props.reset}>Новая игра</button>
                </div>
            </div>
            <div className="resultBox">
                <ResultList steps={props.steps} />
            </div>
            <div className="logoBox">
                <img src={props.logo} alt='bullLogo' className="logo" />
            </div>

        </div>
    );
}
export default Main;

