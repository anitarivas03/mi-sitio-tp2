import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contacto() {
  const form = useRef();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState(null); // "ok" | "error" | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = "El nombre debe tener al menos 2 caracteres.";
    }

    if (!formData.apellido.trim()) {
      nuevosErrores.apellido = "El apellido es obligatorio.";
    } else if (formData.apellido.trim().length < 2) {
      nuevosErrores.apellido = "El apellido debe tener al menos 2 caracteres.";
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = "Ingresá un correo electrónico válido.";
    }

    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje es obligatorio.";
    } else if (formData.mensaje.length > 300) {
      nuevosErrores.mensaje = "El mensaje no puede superar los 300 caracteres.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setEstadoEnvio(null);

    if (!validar()) return;

    setEnviando(true);

    emailjs
      .sendForm("service_9cexf5b", "template_u1koi1m", form.current, {
        publicKey: "NQ1qX3eU3iSPSE8o1",
      })
      .then(
        () => {
          setEstadoEnvio("ok");
          setFormData({ nombre: "", apellido: "", email: "", mensaje: "" });
        },
        (error) => {
          console.log("FAILED...", error.text);
          setEstadoEnvio("error");
        }
      )
      .finally(() => {
        setEnviando(false);
      });
  };

  return (
    <div className="pagina">
      <h1>Formulario de Contacto</h1>

      <form
        className="formulario-contacto"
        ref={form}
        onSubmit={sendEmail}
        noValidate
      >
        {/* Campo oculto: EmailJS lo toma para rellenar {{name}} en el template */}
        <input
          type="hidden"
          name="name"
          value={`${formData.nombre} ${formData.apellido}`.trim()}
        />

        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errores.nombre ? "campo-error": ""}
          />
          {errores.nombre && <span className="error">{errores.nombre}</span>}
        </div>

        <div className="campo">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className={errores.apellido ? "campo-error": ""}
          />
          {errores.apellido && <span className="error">{errores.apellido}</span>}
        </div>

        <div className="campo">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            title="El correo debe contener un @ (ejemplo: nombre@ejemplo.com"
            className={errores.email ? "campo-error": ""}
          />
          {errores.email && <span className="error">{errores.email}</span>}
        </div>

        <div className="campo">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="message"
            rows="5"
            maxLength={300}
            value={formData.mensaje}
            onChange={(e) =>
              setFormData({ ...formData, mensaje: e.target.value })
            }
            className={errores.mensaje ? "campo-error": ""}
          />
          <span className="contador">{formData.mensaje.length}/300</span>
          {errores.mensaje && <span className="error">{errores.mensaje}</span>}
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>

        {estadoEnvio === "ok" && (
          <p className="mensaje-exito">Mensaje enviado correctamente</p>
        )}
        {estadoEnvio === "error" && (
          <p className="mensaje-error-envio">
            Hubo un error al enviar el mensaje. Intentá de nuevo.
          </p>
        )}
      </form>
    </div>
  );
}

export default Contacto;