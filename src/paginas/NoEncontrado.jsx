import { Link } from "react-router-dom";

function NoEncontrado() {
  return (
    <div className="pagina">
      <h1>404</h1>
      <div className="card">
        <p>Ups... esta página no existe.</p>
      </div>
      <Link to="/" className="volver-inicio">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NoEncontrado;