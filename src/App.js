import React from "react";
import { useState, useEffect } from "react";
import ResultList from "./Components/ResultList";

function App() {
    debugger
    const stepData = {
        stepCount: 0,
        userNumber: '',
        bulls: 0,
        cows: 0,
    }      

    const [value, setValue] = useState('');
    const [randomNumberSTR, setRandomNumberSTR] = useState('');   
    const [stepsCount, setStepsCount] = useState(0);
    
    const [steps, setSteps] = useState([]);
     
    
   

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
    useEffect(() => {randomNumber()}, [])

    console.log(`randomNumber ${randomNumberSTR}`);
    let userNumber = value.toString();
    console.log(`userNumber ${userNumber}`);
    stepData.userNumber = userNumber

    const calc = () => {
        debugger;
        // let stepCount = 0;
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
        cowsCount = cowsCount - bullsCount;
        setStepsCount(stepsCount + 1)
        stepData.stepCount = stepsCount + 1;
        stepData.bulls = bullsCount;
        stepData.cows = cowsCount;
        setSteps(steps => [stepData, ...steps]);

    }
    
   
    return (
        <div>
            <input onChange={(event) => setValue(event.target.value)} />
            <button onClick={calc}>Сделать ход</button>
            {/* <button onClick={reset}>Новая игра</button> */}
            <br />
            <div>
                <ResultList steps={steps} />
            </div>
        </div>
    );

}
export default App;

