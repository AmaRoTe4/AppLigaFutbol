import './App.css';
import { BrowserRouter , Route , Routes} from 'react-router-dom';
import PartidosAlAsar from './interfaces/PartidosAlAsar.js';
import Main from './interfaces/Main.js';
import Ficture from './interfaces/Liga/Ficture.js';
import MenuDeLiga from './interfaces/Liga/menuLiga.js'
import Tabla from './interfaces/Liga/Tabla'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={ <Main/> }/>
        <Route path='/' element={ <Main/> }/>
        <Route path='/Liga' element={ <MenuDeLiga/> }/>
        <Route path='/Liga/Ficture' element={ <Ficture/> }/>
        <Route path='/Liga/Tabla' element={ <Tabla/> }/>
        <Route path='/PartidosAlAsar' element={ <PartidosAlAsar/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
