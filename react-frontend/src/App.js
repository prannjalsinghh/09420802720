import logo from './logo.svg';
import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Trains from './components/Trains';
import EachTrain from './components/EachTrain';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Trains/>} />
      <Route path="/:id" element={<EachTrain/>} />
    </Routes>
  );
}

export default App;
