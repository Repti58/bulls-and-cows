import React from "react";
import { useState, useEffect } from "react";


function App() {
    // debugger
    const [value, setValue] = useState('');
    const [randomNumberSTR, setRandomNumberSTR] = useState('');
   


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
    
    console.log(randomNumberSTR);
    let userNumber = value;
    console.log(userNumber);
    let [bulls, setBulls] = useState(0);
    let [cows, setCows] = useState(0);

    
    
    const userNumberSTR = userNumber.toString();

    function calc() {
        // debugger;
       
        for (let i = 0; i < randomNumberSTR.length; i++) {

            if (randomNumberSTR[i] === userNumberSTR[i]) {
                setBulls(bulls += 1);
            }
            if (randomNumberSTR.indexOf(userNumberSTR[i]) >= 0) {
                setCows(cows += 1);
            }
        }
    setCows(cows - bulls);
    console.log(bulls);
    console.log(cows);
    

}
const reset = () => {
        setBulls(0);
        setCows(0);
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

