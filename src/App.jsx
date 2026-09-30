import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Inicio from "./paginas/Inicio";
import Servicios from "./paginas/Servicios";
import Contacto from "./paginas/Contacto";
import Footer from "./componentes/Footer";
import NoEncontrado from "./paginas/NoEncontrado";
function App() {
  return (
    <BrowserRouter basename="/mi-sitio-tp2/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;