import React from "react";
import '../App.css';

const ResultList = (props) => {
const bullsDeclination = (el) => {
    debugger
    switch (el.bulls) {
        case 0:
            return 'Быков';
        case 1:
            return 'Бык';
        case 2:
        case 3:
        case 4:
            return 'Быка'
    }
}
const cowsDeclination = (el) => {
    debugger
    switch (el.cows) {
        case 0:
            return 'Коров';
        case 1:
            return 'Корова';
        case 2:
        case 3:
        case 4:
            return 'Коровы'
        }
    }

    return (
        <h3>
            {props.steps.map(el => {
                debugger
                return (                 
                    <div className="result">
                        Ход {el.stepCount} - {el.userNumber} - {el.bulls} {bullsDeclination(el)}, {el.cows} {cowsDeclination(el)} 
                        {/* | Загаданное число - {el.randomNumber} */}
                    </div>
               )
            })}
            {/* {props.steps} */}
        </h3>
    )
}

export default ResultList;