import React, { createRef } from "react";
import { useState, useEffect } from "react";
import ResultList from "./ResultList";
import InfoBar from "./InfoBar";
import { Link } from "react-router-dom";

function Main(props) {
   
    const stepData = {
        stepCount: 0,
        userNumber: '',
        bulls: 0,
        cows: 0,
        randomNumber: ''
    }

    const [value, setValue] = useState('');
    const [randomNumberSTR, setRandomNumberSTR] = useState('');
    const [stepsCount, setStepsCount] = useState(0);
    const [steps, setSteps] = useState([]);
    const [info, setInfo] = useState('')   
    const [disableBtnReset, setDisableBtnReset] = useState(true);
    const [disableBtnShot, setDisableBtnShot] = useState(false);     
    const input = React.createRef()
    const newGameBtn = React.createRef();


    function randomNumber() {       
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const newArr = [];
        let temp = 9;
        for (let i = 1; i < 5; i++) {
            let random = Math.floor(Math.random() * temp);           
            newArr.push(arr[random])            
            arr.splice(random, 1);
            temp -= 1;           
        }
        setRandomNumberSTR(newArr.join(''));
    }


    useEffect(() => {
        randomNumber();        
    }, [])



    console.log(`randomNumber ${randomNumberSTR}`);
    let userNumber = value;
    console.log(`userNumber ${userNumber}`);
    stepData.userNumber = userNumber

    const check = () => {
       debugger
       console.log(parseInt(userNumber))
        if (isNaN(userNumber) === false && userNumber.length === 4) { //4-digit number check
            if (new Set(userNumber).size !== userNumber.length) { //repeated digits check
                setInfo('Цифры не должны повторяться')
            } else {
                setInfo('');
                calc()
            }
        } else {
            setInfo('Введите 4-значное число')
        }
    }

    const calc = () => {       
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

        if (bullsCount === 4) {
            setInfo(`Вы отгадали число c ${(steps[0].stepCount) + 1}-й попытки :)`)
            input.current.readOnly = true
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

    const reset = () => {
        setSteps([]);
        setStepsCount(0);
        setInfo('');
        setValue('');
        randomNumber();
        input.current.focus();
        input.current.readOnly = false
        setDisableBtnShot(false);
        setDisableBtnReset(true);        
    }   

    return (
        <div className="container">
            <div>
                
                    <div className="title">
                        БЫКИ И КОРОВЫ
                    </div>
                
                <div className="underTitle">
                    <div>
                        <h4>логическая игра</h4>
                    </div>
                    {/* <button className="button" onClick={rules}>правила игры</button> */}
                    <Link to='/rules'><button className="infoButton" >Правила игры</button></Link>
                    {/* <Routes>
                        <Route path="/rules" element={<Rules />} />
                    </Routes> */}
                   
                    <h3>Компьютер уже что то задумал...</h3>
                </div>
            </div>
            <div className="form">
                <input className="input" ref={input} autoFocus maxLength={4} value={value} onChange={(event) => setValue(event.target.value)} />
            <div>
                <InfoBar info={info} />
            </div>
                <div className="divButton">
                <button className="button" disabled={disableBtnShot} onClick={check}>Сделать ход</button>
                <button className="button" ref={newGameBtn} disabled={disableBtnReset} onClick={reset}>Новая игра</button>
                </div>
            </div>
            <div className="resultBox">
                <ResultList steps={steps} />
            </div>
            <div className="logoBox">
                <img src={props.logo} alt='bullLogo' className="logo" />
            </div>

        </div>
    );

}
export default Main;

