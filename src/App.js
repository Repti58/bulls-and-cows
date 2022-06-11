import React, { createRef } from "react";
import { useState, useEffect } from "react";
import ResultList from "./Components/ResultList";
import InfoBar from "./Components/InfoBar";

function App() {
    debugger
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
    // const [buttonReset, setButtonReset] = useState();
    const [disableBtnReset, setDisableBtnReset] = useState(true);
    const [disableBtnShot, setDisableBtnShot] = useState(false);
    // const btnReset = <button ref={newGameBtn} disabled={disableBtnReset} onClick={reset}>Новая игра</button>
    const input = React.createRef()
    const newGameBtn = React.createRef();

    function randomNumber() {
        debugger
        const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const newArr = [];
        let temp = 9;
        for (let i = 1; i < 5; i++) {
            let random = Math.floor(Math.random() * temp);
            //console.log(random);
            newArr.push(arr[random])
            //console.log(newArr);
            arr.splice(random, 1);
            temp -= 1;
            //console.log(arr);
        }
        setRandomNumberSTR(newArr.join(''));
    }
    useEffect(() => {
        randomNumber();
        // input.current.focus();
    }, [])

    console.log(`randomNumber ${randomNumberSTR}`);
    let userNumber = value.toString();
    console.log(`userNumber ${userNumber}`);
    stepData.userNumber = userNumber

    const check = () => {
        debugger
        if (new Set(userNumber).size !== userNumber.length) {
            setInfo('Цифры не должны повторяться')
        } else {
            setInfo('');
            calc()
        }
    }

    const calc = () => {
        debugger;
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
            setInfo('Congratulations!!! You are win :)')
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
    const test = () => {
        // setInfo('Test')
        setDisableBtnReset(true)
    }
    return (
        <div>
            <div className="">
                <h1>Игра "Быки и коровы"</h1>
                <p>Мы загадали 4-значное число</p>
            </div>
            <input ref={input} autoFocus maxLength={4} value={value} onChange={(event) => setValue(event.target.value)} />
            <button disabled={disableBtnShot} onClick={check}>Сделать ход</button>
            
            <button ref={newGameBtn} disabled={disableBtnReset} onClick={reset}>Новая игра</button>
            {/* <button  onClick={test}>Тест</button> */}
            <br />
            <div>
                <InfoBar info={info} />
            </div>
            <div>
                <ResultList steps={steps} />
            </div>
        </div>
    );

}
export default App;

