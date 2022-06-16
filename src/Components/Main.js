import React from "react";
import ResultList from "./ResultList";
import InfoBar from "./InfoBar";
import { Link } from "react-router-dom";

function Main(props) {

    return (
        <div>
            <div className="underTitle">
                <Link to='/rules'><button className="infoButton" >Правила игры</button></Link>
                <h3>Компьютер уже что то задумал...</h3>
            </div>

            <div className="form">
                <input className="input" ref={props.input} autoFocus maxLength={4} value={props.value} onChange={(event) => props.setValue(event.target.value)} />
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

