import React from "react";
import "./SponsorsPage.css"; // Archivo CSS para estilos

// Datos de ejemplo (pueden venir de una API)
const sponsors = [
  {
    id: 1,
    name: "Patrocinador A",
    logo: "https://via.placeholder.com/150",
    website: "https://example.com",
  },
  {
    id: 2,
    name: "Patrocinador B",
    logo: "https://via.placeholder.com/150",
    website: "https://example.com",
  },
  {
    id: 3,
    name: "Patrocinador C",
    logo: "https://via.placeholder.com/150",
    website: "https://example.com",
  },
];

const SponsorsPage = () => {
  return (
    <div className="sponsors-page">
      <h1>Nuestros Patrocinadores</h1>
      <div className="sponsors-list">
        {sponsors.map((sponsor) => (
          <div className="sponsor-card" key={sponsor.id}>
            <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
              <img src={sponsor.logo} alt={`${sponsor.name} Logo`} />
              <h2>{sponsor.name}</h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorsPage;
