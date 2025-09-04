import { useState, useEffect } from "react";

const ContactForm = ({ contact, onSubmit }) => {
  const [nomeCurso, setNomeCurso] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [errors, setErrors] = useState({});

  // Se vier um contato existente, preenche os campos
  useEffect(() => {
    if (contact) {
      setNomeCurso(contact.nomeCurso || "");
      setCargaHoraria(contact.cargaHoraria || "");
    }
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!nomeCurso) {
      validationErrors.nomeCurso = "Nome do Curso é obrigatório";
    }
    if (!cargaHoraria) {
      validationErrors.cargaHoraria = "Carga Horária do Curso é obrigatório";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit({
        nomeCurso,
        cargaHoraria: Number(cargaHoraria),
      });
    }
  };

  return (
    <form data-testid="contact-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nomeCurso">Nome do Curso</label>
        <input
          id="nomeCurso"
          type="text"
          value={nomeCurso}
          onChange={(e) => setNomeCurso(e.target.value)}
        />
        {errors.nomeCurso && <p>{errors.nomeCurso}</p>}
      </div>

      <div>
        <label htmlFor="cargaHoraria">Carga Horária do Curso</label>
        <input
          id="cargaHoraria"
          type="number"
          value={cargaHoraria}
          onChange={(e) => setCargaHoraria(e.target.value)}
        />
        {errors.cargaHoraria && <p>{errors.cargaHoraria}</p>}
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
};

export default ContactForm;
