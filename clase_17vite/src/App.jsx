
import './App.css'
import Navegacion from './Navegacion/Navegacion.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './Home/Home.jsx'
import Alta from './Alta/Alta.jsx'

function App() {
/*   const [count, setCount] = useState(0) */

  return (
    <>

      <Navegacion />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/alta' element={<Alta />} />
      </Routes>

    </>
  )
}

export default App
