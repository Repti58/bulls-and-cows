import { Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import Rules from "./Components/Rules";


const App = () => {
    return (
        <div>
            {/* <Main /> */}
            <Routes>
                <Route path="/rules" element={<Rules />} />
                <Route path="/main" element={<Main />} />
                <Route path="/*" element={<Main />} />
                
            </Routes>
        </div>

    )
}
export default App