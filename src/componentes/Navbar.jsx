import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/servicios">Servicios</Link>
      <Link to="/contacto">Contacto</Link>
    </nav>
  );
}

export default Navbar;