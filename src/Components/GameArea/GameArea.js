import logo from "./img/bull.png";
import React from "react";
import ResultList from "./ResultList/ResultList";
import InfoBar from "./InfoBar/InfoBar";
import { Link } from "react-router-dom";

function GameArea(props) {
  const inputHandler = (event) => {
    if (event.key === "Enter") {
      props.checkInput()
    }
  }

  const inputCurrentState = () => {
    
    props.input.current.focus();
    props.input.current.readOnly = false;
    props.resetGame();
  };

  const addDifficultyRange = (value) => {
    
    props.input.current.focus();
    props.input.current.readOnly = false;
    const difficultyValue = value;
    props.addDifficultyRange(difficultyValue);
  };

  return (
    <div>
      <div className="underTitle">
        <Link to="/rules" className="link">
          <button className="button">Правила игры</button>
        </Link>
        <Link to="/gamehistory" className="link">
          <button className="button">История игр</button>
        </Link>
        <div>
          <p className="title3">Сложность (количество цифр):</p>
          <div className="form_radio_group">
            <div className="form_radio_group-item">
              <input
                id="radio-1"
                type="radio"
                name="radio"
                value="3"
                onChange={(event) => addDifficultyRange(event.target.value)}
                checked={props.difficulty === 3 ? true : false}
              />
              <label htmlFor="radio-1">3</label>
            </div>
            <div className="form_radio_group-item">
              <input
                id="radio-2"
                type="radio"
                name="radio"
                value="4"
                onChange={(event) => addDifficultyRange(event.target.value)}
                checked={props.difficulty === 4 ? true : false}
              />
              <label htmlFor="radio-2">4</label>
            </div>
            <div className="form_radio_group-item">
              <input
                id="radio-3"
                type="radio"
                name="radio"
                value="5"
                onChange={(event) => addDifficultyRange(event.target.value)}
                checked={props.difficulty === 5 ? true : false}
              />
              <label htmlFor="radio-3">5</label>
            </div>
          </div>
        </div>
        <h3>
          Компьютер уже задумал {props.difficulty}{" "}
          {props.getNumberDeclination()}. Играем!
        </h3>
      </div>

      <div className="form">
        <input
          className={props.inputClass}
          ref={props.input}
          autoFocus
          maxLength={props.difficulty}
          value={props.value}
          readOnly={props.inputReadOnly}
          onChange={(event) => props.setValue(event.target.value)}
          onKeyDown={inputHandler}
        />
        <div>
          <InfoBar info={props.info} />
        </div>
        <div className="divButton">
          <button
            className="button button__game-button"
            disabled={props.disableBtnShot}
            onClick={props.checkInput}
          >
            Сделать ход
          </button>
          <button
            className="button button__game-button"
            disabled={props.disableBtnReset}
            onClick={inputCurrentState}
          >
            Новая игра
          </button>
        </div>
      </div>
      <div className="resultBox">
        <ResultList steps={props.steps} />
      </div>
      <div className="logoBox">
        <img src={logo} alt="bullLogo" className="logo" />
      </div>
    </div>
  );
}
export default GameArea;
