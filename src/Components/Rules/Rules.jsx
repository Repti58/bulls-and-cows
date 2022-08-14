import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Rules = () => {
  const rulesText =
    "Компьютер задумывает различные цифры из 0,1,2,...9 (количество зависит от выбранного уровня сложности). Игрок делает ходы, чтобы узнать эти цифры и их порядок, 0 может стоять на первом месте. В ответ компьютер показывает число отгаданных цифр, стоящих на своих местах (число быков) и число отгаданных цифр, стоящих не на своих местах (число коров).";
  const rulesExample =
    "Компьютер задумал 0834. Игрок сделал ход 8134. Компьютер ответил: 2 быка (цифры 3 и 4) и 1 корова (цифра 8).";

  return (
    <div>
      <div className="rules">
        <h4>Правила игры</h4>
        {rulesText}
        <h4>Пример</h4>
        {rulesExample}
        <div className="backLink">
          <Link to="/main" className="link">
            <button className="button">Назад к игре</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rules;
