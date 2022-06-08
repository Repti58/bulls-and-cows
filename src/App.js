import React from "react";
import { useState, useEffect } from "react";

function App() {
    debugger
    const [value, setValue] = useState('');
    const [randomNumberSTR, setRandomNumberSTR] = useState('');   
    let [stepsCount, setStepsCount] = useState(0);
    const [steps, setSteps] = useState([]);
    const stepData = {
        stepCount: 0,
        userNumber: '',
        bulls: '0',
        cows: '0',
    }   

    useEffect(() => {
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
        randomNumber()

    }, [])

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
        setSteps(steps => steps.concat(stepData));
    }
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
    const result = steps.map(el => (<div>{el.stepCount} - {el.userNumber} - {el.bulls} {bullsDeclination(el)} {el.cows} {cowsDeclination(el)}</div>))
    return (
        <div>
            <textarea onChange={(event) => setValue(event.target.value)} />
            <button onClick={calc}>кнопка</button>
            <br />
            <h3>{result}</h3>
        </div>
    );

}
export default App;

