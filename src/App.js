import { Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import Rules from "./Components/Rules";
import logo from './img/bull.png';

const rulesText = 'Компьютер задумывает четыре различные цифры из 0,1,2,...9. Игрок делает ходы, чтобы узнать эти цифры и их порядок. Каждый ход состоит из четырёх цифр, 0 может стоять на первом месте. В ответ компьютер показывает число отгаданных цифр, стоящих на своих местах (число быков) и число отгаданных цифр, стоящих не на своих местах (число коров).'
const rulesExample = 'Компьютер задумал 0834. Игрок сделал ход 8134. Компьютер ответил: 2 быка (цифры 3 и 4) и 1 корова (цифра 8).'


const App = () => {
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
                    <Route path="/rules" element={<Rules rulesText={rulesText} rulesExample={rulesExample} />} />
                    <Route path="/main" element={<Main logo={logo} />} />
                    <Route path="/*" element={<Main logo={logo} />} />
                </Routes>
            </div>
        </div>
    )
}
export default App