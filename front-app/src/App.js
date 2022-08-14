import './App.css';
import { BrowserRouter , Route , Routes} from 'react-router-dom';
import PartidosAlAsar from './interfaces/PartidosAlAsar.js';
import Main from './interfaces/Main.js';
import Liga from './interfaces/Liga.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Main/> }/>
        <Route path='/Liga' element={ <Liga/> }/>
        <Route path='/PartidosAlAsar' element={ <PartidosAlAsar/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
