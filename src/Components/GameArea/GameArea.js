import logo from './img/bull.png';
import React from "react";
import ResultList from "./ResultList/ResultList";
import InfoBar from "./InfoBar/InfoBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function GameArea() {
    const stepData = {
        stepCount: 0,
        userNumber: '',
        bulls: 0,
        cows: 0,
        randomNumber: ''
    }

    const [value, setValue] = useState('');
    const [stepsCount, setStepsCount] = useState(0);
    const [steps, setSteps] = useState([]);
    const [info, setInfo] = useState('')
    const [disableBtnReset, setDisableBtnReset] = useState(true);
    const [disableBtnShot, setDisableBtnShot] = useState(false);
    const input = React.createRef()
    const [randomNumberSTR, setRandomNumberSTR] = useState('');
    const [difficulty, setDifficulty] = useState(4);


    function getRandomNumber() {
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const newArr = [];
        let temp = 9;
        for (let i = 1; i <= (parseInt(difficulty)); i++) {
            let random = Math.floor(Math.random() * temp);
            newArr.push(arr[random])
            arr.splice(random, 1);
            temp -= 1;
        }
        setRandomNumberSTR(newArr.join(''));
    }

    useEffect(() => {
        getRandomNumber();
    }, [])


    const getNumberDeclination = () => {
        switch (difficulty) {
            case 3:
            case 4:
                return 'цифры';
            case 5:
                return 'цифр';
            default:
                return ''
        }
    }

    const postData = (stepsCount) => {
        debugger
        const data = {
            date: new Date().toLocaleString(),
            difficulty: difficulty,
            number: stepsCount
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };
        console.log(options);
        fetch('http://localhost:3002/api', options)
    }


    let userNumber = value;
    stepData.userNumber = userNumber
    console.log(`randomNumber ${randomNumberSTR}`);
    // console.log(parseInt(userNumber))


    const checkInput = () => {
        if (isNaN(userNumber) === false && userNumber.length === difficulty) { //4-digit number check
            if (new Set(userNumber).size !== userNumber.length) { //repeated digits check
                setInfo('Цифры не должны повторяться')
            } else {
                setInfo('');
                countAnimals()
            }
        } else {
            setInfo(`Введите ${difficulty} ${getNumberDeclination()}`)
        }
    }


    const countAnimals = () => {
        let bullsCount = 0;
        let cowsCount = 0;

        for (let i = 0; i < randomNumberSTR.length; i++) {
            if (randomNumberSTR[i] === userNumber[i]) {
                bullsCount += 1;
            }
            if (randomNumberSTR.indexOf(userNumber[i]) >= 0) {
                cowsCount += 1;
            }
        }

        if (bullsCount === difficulty) {
            setInfo(`Вы отгадали c ${stepsCount + 1}-й попытки :)`);
            postData(stepsCount + 1);
            input.current.readOnly = true;
            setDisableBtnReset(false);
            setDisableBtnShot(true);
        }

        cowsCount = cowsCount - bullsCount;
        setStepsCount(stepsCount + 1)
        stepData.stepCount = stepsCount + 1;
        stepData.bulls = bullsCount;
        stepData.cows = cowsCount;
        stepData.randomNumber = randomNumberSTR;
        setSteps(steps => [stepData, ...steps]);
        setValue('');
        input.current.focus();
    }


    const resetGame = () => {
        setSteps([]);
        setStepsCount(0);
        setInfo('');
        setValue('');
        getRandomNumber();
        input.current.focus();
        input.current.readOnly = false
        setDisableBtnShot(false);
        setDisableBtnReset(true);
    }

    const addDifficultyRange = (props) => {
        setDifficulty(parseInt(props));

    }

    useEffect(() => {
        resetGame()
    }, [difficulty])


    return (
        <div>
            <div className="underTitle">
                <Link to='/rules'><button className="button" >Правила игры</button></Link>
                <div>
                    <p className="title3">Сложность (количество цифр):</p>
                    <div className="form_radio_group">

                        <div className="form_radio_group-item">
                            <input id="radio-1" type="radio" name="radio" value='3' onChange={(event) => addDifficultyRange(event.target.value)} checked={difficulty === 3 ? true : false} />
                            <label htmlFor="radio-1">3</label>
                        </div>
                        <div className="form_radio_group-item">
                            <input id="radio-2" type="radio" name="radio" value='4' onChange={(event) => addDifficultyRange(event.target.value)} checked={difficulty === 4 ? true : false} />
                            <label htmlFor="radio-2">4</label>
                        </div>
                        <div className="form_radio_group-item">
                            <input id="radio-3" type="radio" name="radio" value='5' onChange={(event) => addDifficultyRange(event.target.value)} checked={difficulty === 5 ? true : false} />
                            <label htmlFor="radio-3">5</label>
                        </div>

                    </div>
                </div>
                <h3>Компьютер уже задумал {difficulty} {getNumberDeclination()}. Играем!</h3>
            </div>

            <div className="form">
                <input className="input" ref={input} autoFocus maxLength={difficulty} value={value} onChange={(event) => setValue(event.target.value)} />
                <div>
                    <InfoBar info={info} />
                </div>
                <div className="divButton">
                    <button className="button" disabled={disableBtnShot} onClick={checkInput}>Сделать ход</button>
                    <button className="button" disabled={disableBtnReset} onClick={resetGame}>Новая игра</button>
                </div>
            </div>
            <div className="resultBox">
                <ResultList steps={steps} />
            </div>
            <div className="logoBox">
                <img src={logo} alt='bullLogo' className="logo" />
            </div>
            <div className="divButton">
                <Link to='/gamehistory'><button className="button" >История</button></Link>
            </div>
        </div>
    );
}
export default GameArea;

