import { useState, useEffect } from "react";

function Inicio() {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://dev.to/api/articles?tag=spanish&per_page=30")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Error al obtener los datos");
        return respuesta.json();
      })
      .then((datos) => {
        const conPortada = datos.filter((a) => a.cover_image).slice(0, 6);
        setArticulos(conPortada);
        setCargando(false);
      })
      .catch(() => {
        setError(true);
        setCargando(false);
      });
  }, []);

  const obtenerTags = (articulo) =>
    Array.isArray(articulo.tag_list)
      ? articulo.tag_list
      : (articulo.tags || "").split(",").map((t) => t.trim());

  return (
    <div className="pagina">
      <h1>Página de Inicio</h1>

      <h2 className="subtitulo">Artículos de programación en español</h2>

      {cargando && <p className="estado-carga">Cargando artículos...</p>}
      {error && (
        <p className="mensaje-error-envio">
          No se pudieron cargar los artículos. Intentá de nuevo más tarde.
        </p>
      )}

      <div className="articulos-grid">
        {articulos.map((articulo) => (
          <article className="articulo-card" key={articulo.id}>
            <img src={articulo.cover_image} alt={articulo.title} />
            <div className="articulo-contenido">
              <h3>{articulo.title}</h3>
              <p className="articulo-descripcion">{articulo.description}</p>
              <p className="articulo-autor">
                Por {articulo.user.name} · {articulo.readable_publish_date} ·{" "}
                {articulo.reading_time_minutes} min de lectura
              </p>
              <div className="articulo-tags">
                {obtenerTags(articulo).map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
              <a href={articulo.url} target="_blank" rel="noreferrer">
                Leer artículo
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Inicio;