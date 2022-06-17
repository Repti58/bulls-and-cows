import React from "react";


const ResultList = (props) => {
const bullsDeclination = (el) => {
    debugger
    switch (el.bulls) {
        case 0:
        case 5:
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
        case 5:
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
        <div>
            {props.steps.map(el => {
               
                return (                 
                    <div className="result">                                          
                        {/* Ход {el.stepCount}:   */}
                        {el.userNumber} - {el.bulls} {bullsDeclination(el)}, {el.cows} {cowsDeclination(el)}
                        {/* | Загаданное число - {el.randomNumber} */}
                    </div>
               )
            })}            
        </div>
    )
}

export default ResultList;