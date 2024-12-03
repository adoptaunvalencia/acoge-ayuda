import React, { useEffect, useState } from "react";
import "./SponsorsPage.css";

const SponsorsPage = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", logo: "", website: "" });

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=10");
        if (!response.ok) {
          throw new Error("Error al cargar los patrocinadores");
        }
        const data = await response.json();
        const formattedData = data.map((item) => ({
          id: item.id,
          name: `Patrocinador ${item.id}`,
          logo: item.thumbnailUrl,
          website: `https://example.com/sponsor/${item.id}`,
        }));
        setSponsors(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Editar patrocinador
      setSponsors((prevSponsors) =>
        prevSponsors.map((sponsor) =>
          sponsor.id === formData.id ? { ...sponsor, ...formData } : sponsor
        )
      );
    } else {
      // Agregar patrocinador
      setSponsors((prevSponsors) => [
        ...prevSponsors,
        { ...formData, id: Date.now() }, // Crear un ID único
      ]);
    }
    setFormData({ id: null, name: "", logo: "", website: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setSponsors((prevSponsors) => prevSponsors.filter((sponsor) => sponsor.id !== id));
  };

  if (loading) return <p>Cargando patrocinadores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="sponsors-page">
      <h1>Nuestros Patrocinadores</h1>
      <button onClick={() => setShowForm(true)}>Agregar Patrocinador</button>
      <div className="sponsors-list">
        {sponsors.map((sponsor) => (
          <div className="sponsor-card" key={sponsor.id}>
            <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
              <img src={sponsor.logo} alt={`${sponsor.name} Logo`} />
              <h2>{sponsor.name}</h2>
            </a>
            <button onClick={() => setFormData(sponsor) || setShowForm(true)}>Editar</button>
            <button onClick={() => handleDelete(sponsor.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <h2>{formData.id ? "Editar Patrocinador" : "Agregar Patrocinador"}</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre"
              required
            />
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              placeholder="URL del logo"
              required
            />
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="Sitio web"
              required
            />
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SponsorsPage;
