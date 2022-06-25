import { Route, Routes } from "react-router-dom";
import GameArea from "./Components/GameArea/GameArea";
import Rules from "./Components/Rules/Rules";
import logo from './img/bull.png';
import React from "react";
import { useState, useEffect } from "react";

const App = () => {    

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
    const [difficulty, setDifficulty] = useState(4);
    const [data, setData] = useState(null);   
    const input = React.createRef()



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


    const postData = (stepsCount) => {
        const data = { number: stepsCount };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };
        console.log(options);
        fetch('http://localhost:3002/api', options)
    }
    
   
    useEffect(() => {
        fetch('http://localhost:3002/api')
        // .then((res) => console.log(res.json()))
        .then((res) => res.json())
        // console.log(res.json())
        // .then((res) => console.log(res.json()))
        .then(res => setData(res))
        .catch(err => console.error(err));
    }, [disableBtnReset])


    useEffect(() => {
       
        getRandomNumber();


    }, [])


    console.log(`randomNumber ${randomNumberSTR}`);
    let userNumber = value;
    // console.log(`userNumber ${userNumber}`);
    stepData.userNumber = userNumber


    const getNumberDeclination = () => {
        switch (difficulty) {
            case 3:
            case 4:
                return 'цифры'
            case 5:
                return 'цифр'
        }
    }


    const checkInput = () => {

        // console.log(parseInt(userNumber))
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

    // async function getApi() {
    //     const response = await fetch('http://localhost:3005/api')
    //     .then((response) => response.json())
    //     co
    //     .then(response => setData(response.message))


//         const response = await fetch(`https://catfact.ninja/facts?page=${props}`);
//   return await response.json();}
    

    return (
        <div className="container">
            <div  >
                <p className="title">
                    БЫКИ И КОРОВЫ
                </p>
                <p className="title2">
                    логическая игра
                </p>
            </div>
            <div>
                <Routes>
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/main" element={<GameArea getNumberDeclination={getNumberDeclination} addDifficultyRange={addDifficultyRange} difficulty={difficulty} input={input} logo={logo} value={value} setValue={setValue} info={info} disableBtnShot={disableBtnShot} checkInput={checkInput} disableBtnReset={disableBtnReset} resetGame={resetGame} steps={steps} />} />
                    <Route path="/*" element={<GameArea getNumberDeclination={getNumberDeclination} addDifficultyRange={addDifficultyRange} difficulty={difficulty} input={input} logo={logo} value={value} setValue={setValue} info={info} disableBtnShot={disableBtnShot} checkInput={checkInput} disableBtnReset={disableBtnReset} resetGame={resetGame} steps={steps} />} />
                </Routes>
                <div>
                    {/* {data[0]} */}
                    {!data ? 'Loading': data.map((el) => {
                        return (
                            <div>
                           { `${el.date} - ${el.steps}`}
                           <hr/>
                            </div>
                        )
                    })}
                    

                </div>
            </div>
        </div>
    )
}
export default App