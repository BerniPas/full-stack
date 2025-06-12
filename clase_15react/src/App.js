/* método para importar imágenes */
import logo from './imagenes/logo.svg';

/* método para importar estilos de css */
import './css/App.css';

/* Importamos los componentes para renderizar */
import Navegacion from './Componentes/Navegacion/Navegacion';


function App() {
  return (

    <>

      <Navegacion />
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
          </a>
        </header>
      </div>
      
    </>
  );
}

export default App;
