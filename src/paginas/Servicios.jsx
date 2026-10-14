const servicios = [
  {
    id: 1,
    nombre: "HTML",
    descripcion: "Estructura y maquetado semántico de páginas web.",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#e44d26",
  },
  {
    id: 2,
    nombre: "CSS",
    descripcion: "Estilos, diseño responsive y animaciones.",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572b6",
  },
  {
    id: 3,
    nombre: "JavaScript",
    descripcion: "Lógica, interactividad y manipulación del DOM.",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#f0c814",
  },
  {
    id: 4,
    nombre: "React",
    descripcion: "Desarrollo de interfaces basadas en componentes.",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#38b6d8",
  },
  {
    id: 5,
    nombre: "Git",
    descripcion: "Control de versiones y trabajo colaborativo.",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#f05032",
  },
];

function Servicios() {
  return (
    <div className="pagina">
      <h1>Página de Servicios</h1>
      <p className="intro-servicios">
        Estas son las tecnologías con las que trabajo y sigo aprendiendo.
      </p>

      <div className="servicios-grid">
        {servicios.map((servicio) => (
          <div
            className="servicio-card"
            key={servicio.id}
            style={{ "--acento": servicio.color }}
          >
            <div className="icono-servicio">
              <img src={servicio.imagen} alt={servicio.nombre} />
            </div>
            <h3>{servicio.nombre}</h3>
            <p>{servicio.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;