
import Home from "./Componentes/Home";
import Footer from "./Componentes/Footer";
import Navegacion from "./Componentes/Navegacion";
import Nosotros from "./Componentes/Nosotros";
import Contacto from "./Componentes/Contacto";
import Alta from "./Componentes/Alta";
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
    
      <Navegacion /> 

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/alta" element={<Alta />}></Route>
      </Routes>

      <Footer />

    </>

  );
}

export default App;
