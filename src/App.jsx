
import './App.css';
/* import PrincipalPage from './Components/PrincipalPage';
import PrincipalButton from './Components/PrincipalButton'; */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Playing from './Components/Playing/Playing';
import GameOver from './Components/GameOver';
import HomePage from "./Components/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playing" element={<Playing />} />
        <Route path='/gameover' element={<GameOver/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;