import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import HomepageComponent from "./components/HomepageComponent";
import Login from "./components/account/login/login";
import Register from "./components/account/register/register";


function App() {
    return (
        <BrowserRouter>
        <div className="App">
                <Routes>
                    <Route path="/register" element={<Register></Register>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/" element={<HomepageComponent />}></Route>
                </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;
