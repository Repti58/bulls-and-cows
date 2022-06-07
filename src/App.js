import React from "react";
import { useState, useEffect } from "react";


function App() {
    // debugger
    const [value, setValue] = useState('');
    const [randomNumberSTR, setRandomNumberSTR] = useState('');
    let [bulls, setBulls] = useState(0);
    let [cows, setCows] = useState(0);
    const [step, setStep] = useState({});
    const stepData = {
        stepCount: 0,
        userNumber: userNumber,
        bulls: bulls,
        cows: cows,
    }
    console.log(`bulls ${bulls}`);
    console.log(`cows ${cows}`);

    useEffect(() => {
        function randomNumber() {
            // debugger
            const arr = [0,1,2,3,4,5,6,7,8,9];
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
    
    // useEffect(() => randomNumber(), [])
    
    //const randomNumberSTR = randomNumber();
    // randomNumber();
    
    console.log(`randomNumber ${randomNumberSTR}`);
    let userNumber = value.toString();
    console.log(`userNumber ${userNumber}`);
   

    
    
    // const userNumberSTR = userNumber.toString();
    const reset = () => {
        setBulls(0);
        setCows(0);
    }
    function calc() {
        // debugger;
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
        setBulls(bullsCount);
        setCows(cowsCount);
    
    
}

    
    

    return (
        <div>
            <textarea onChange={(event) => setValue(event.target.value)}/>
            <button onClick={calc}>кнопка</button>
            <button onClick={reset}>сброс</button>
            <br/>
            <h3>{bulls} Быка</h3>
            <h3>{cows} Коровы</h3>

        </div>
    );
    
}
export default App;

