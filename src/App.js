import React, {useState, useEffect, useRef} from 'react'
import {Route, Routes} from 'react-router-dom'
import GameArea from './Components/GameArea/GameArea'
import Rules from './Components/Rules/Rules'
import GameHistory from './Components/GameHistory/GameHistory'
import config from './config'

const URI = config.backendUrl

const App = () => {
	const stepData = {
		stepCount: 0,
		userNumber: '',
		bulls: 0,
		cows: 0,
		randomNumber: '',
	}

	const [randomNumberSTR, setRandomNumberSTR] = useState('')
	const [value, setValue] = useState('')
	const [stepsCount, setStepsCount] = useState(0)
	const [steps, setSteps] = useState([])
	const [info, setInfo] = useState('')
	const [disableBtnReset, setDisableBtnReset] = useState(true)
	const [disableBtnShot, setDisableBtnShot] = useState(false)
	const [difficulty, setDifficulty] = useState(4)
	const [inputReadOnly, setInputReadOnly] = useState(false)
	const [inputClass, setInputClass] = useState('input')
	const input = useRef()

	const getNumberDeclination = () => {
		switch (difficulty) {
			case 3:
			case 4:
				return 'цифры'
			case 5:
				return 'цифр'
			default:
				return ''
		}
	}

	const postData = (stepsCount) => {
		const data = {
			date: new Date().toLocaleString(),
			difficulty: difficulty,
			steps: stepsCount,
		}
		const options = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'},
		}
		fetch(URI, options)
	}

	let userNumber = value
	stepData.userNumber = userNumber

	const checkInput = () => {
		if (isNaN(userNumber) === false && userNumber.length === difficulty) {
			if (new Set(userNumber).size !== userNumber.length) {
				setInfo('Цифры не должны повторяться')
			} else {
				setInfo('')
				countAnimals()
			}
		} else {
			setInfo(`Введите ${difficulty} ${getNumberDeclination()}`)
		}
	}

	const countAnimals = () => {
		let bullsCount = 0
		let cowsCount = 0

		for (let i = 0; i < randomNumberSTR.length; i++) {
			if (randomNumberSTR[i] === userNumber[i]) {
				bullsCount += 1
			}
			if (randomNumberSTR.indexOf(userNumber[i]) >= 0) {
				cowsCount += 1
			}
		}

		if (bullsCount === difficulty) {
			setInfo(`Вы отгадали c ${stepsCount + 1}-й попытки :)`)
			postData(stepsCount + 1)
			// input.current.readOnly = true;
			setInputReadOnly(true)
			setInputClass('input input_readonly')
			setDisableBtnReset(false)
			setDisableBtnShot(true)
		}

		cowsCount = cowsCount - bullsCount
		setStepsCount(stepsCount + 1)
		stepData.stepCount = stepsCount + 1
		stepData.bulls = bullsCount
		stepData.cows = cowsCount
		stepData.randomNumber = randomNumberSTR
		setSteps((steps) => [stepData, ...steps])
		setValue('')
		input.current.focus()
	}

	const resetGame = () => {
		setSteps([])
		setStepsCount(0)
		setInfo('')
		setValue('')
		getRandomNumber()
		setInputReadOnly(false)
		setInputClass('input')
		setDisableBtnShot(false)
		setDisableBtnReset(true)
	}

	const addDifficultyRange = (props) => {
		setDifficulty(parseInt(props))
	}

	useEffect(() => {
		fetch(URI)
	}, [])

	function getRandomNumber() {
		const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		const newArr = []
		for (let i = 0; i < parseInt(difficulty); i++) {
			let random = Math.floor(Math.random() * arr.length)
			newArr.push(arr[random])
			arr.splice(random, 1)
		}
		// console.log('Загаданные цифры', newArr.join(''))
		setRandomNumberSTR(newArr.join(''))
	}

	useEffect(() => {
		resetGame()
	}, [difficulty])

	return (
		<div className="container">
			<div>
				<p className="title">BULLS & COWS</p>
				<p className="title2">логическая игра</p>
			</div>
			<div>
				<Routes>
					<Route path="/rules" element={<Rules />} />
					<Route
						path={'/main' && '/*'}
						element={
							<GameArea
								steps={steps}
								info={info}
								disableBtnShot={disableBtnShot}
								disableBtnReset={disableBtnReset}
								checkInput={checkInput}
								resetGame={resetGame}
								addDifficultyRange={addDifficultyRange}
								difficulty={difficulty}
								getNumberDeclination={getNumberDeclination}
								input={input}
								value={value}
								setValue={setValue}
								inputReadOnly={inputReadOnly}
								inputClass={inputClass}
							/>
						}
					/>

					<Route
						path="/gamehistory"
						element={<GameHistory URI={URI} />}
					/>
				</Routes>
			</div>
		</div>
	)
}
export default App
