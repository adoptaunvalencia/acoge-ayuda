import { collaborators } from "../../utils/collaborators"
const Collaborator = () => {
  return (
    <section className="collaborator">
    <h2 className="collaborator__title">Colaboradores</h2>
    <aside className="collaborator__about-container">
      <h3 className="collaborator__about-title">Sobre nosotros</h3>
      <p>
        Somos un equipo internacional compuesto por desarrolladores y
        diseñadores. Ponemos nuestras habilidades al servicio de las
        comunidades afectadas por la DANA en Valencia. Conectando voluntarios
        con familias y personas damnificadas en su camino hacia la
        recuperación.
      </p>
    </aside>
    <div className="collaborator__cards-container">
      {collaborators.map((collaborator, index) => (
        <article key={index} className="collaborator__card">
          <div className="collaborator__card-top">
            <div className="collaborator__imagen-container">
            <img
              className="collaborator__imagen"
              src={collaborator.urlAvatarLinkedin}
              alt="Avatar"
            />
            </div>

            <div className="collaborator__">
              <p>{collaborator.nom}</p>
            </div>
          </div>
          <footer></footer>
        </article>
      ))} 
    </div>
  </section>
  )
}

export default Collaborator