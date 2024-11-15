import { collaborators } from "../../utils/collaborators";
import linkedinIcon from "../../assets/icons/linkedin-icon.svg";
import githubIcon from "../../assets/icons/github-icon.svg";
import collaboratorImage from "../../assets/images/collaborator-img.jpg";
import "./collaborator.css";
import { useContext, useEffect } from "react";
import { RefContext } from "../../contexts/ref.context/RefContext";

const Collaborator = () => {
  const {scroll, collaboratoresRef} = useContext(RefContext)
  useEffect(() => {
    setTimeout(() => {
      scroll(collaboratoresRef)
    }, 500);
  },[])
  return (
    <section ref={collaboratoresRef}>
      <h2 className="collaborator__title">Colaboradores</h2>
      <section className="collaborator">
        <aside className="collaborator__about-container">
          <h3 className="collaborator__about-title">Sobre nosotros</h3>
          <p>
            Somos un equipo internacional compuesto por desarrolladores y
            diseñadores. Ponemos nuestras habilidades al servicio de las
            comunidades afectadas por la DANA en Valencia. Conectando
            voluntarios con familias y personas damnificadas en su camino hacia
            la recuperación.
          </p>
        </aside>
        <div className="collaborator__cards-container">
          {collaborators.map((collaborator, index) => (
            <article key={index} className="collaborator__card">
              <div className="collaborator__social">
                <a className="collaborator__social-link" href={collaborator.urlLinkedin} target="_blank">
                  <img
                    className="collaborator__social-image"
                    src={linkedinIcon}
                    alt="Linkedin logo"
                  />
                </a>
                <a className="collaborator__social-link" href={collaborator.urlLinkedin} target="_blank">
                  <img
                    className="collaborator__social-image"
                    src={githubIcon}
                    alt="Github logo"
                  />
                </a>
              </div>
              <div className="collaborator__main">
                <img
                  className="collaborator__imagen"
                  src={collaborator.urlLinkedinImage}
                  alt="Avatar"
                />

                <div className="collaborator__info">
                  <p className="collaborator__name">{collaborator.name}</p>
                  <hr className="collaborator__separator" />
                  <p className="collaborator__rol">{collaborator.rol}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Collaborator;
