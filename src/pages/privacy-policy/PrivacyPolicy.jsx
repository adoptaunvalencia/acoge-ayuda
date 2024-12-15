import { useContext, useEffect } from 'react'
import './PrivacyPolicy.css'
import { RefContext } from '../../contexts/ref.context/RefContext'

const PrivacyPolicy = () => {
  const { scroll, privacyRef } = useContext(RefContext)
  useEffect(() => {
    setTimeout(() => {
      scroll(privacyRef)
    }, 500)
  }, [])
  return (
    <section ref={privacyRef} className='privacy-policy'>
      <div className='content'>
        <div className='header'>
          <h2>Política de Privacidad - Proyecto Acoge y Ayuda</h2>
        </div>
        <div className='introduction'>
          <p>
            ¡Hola! Nos alegra tenerte aquí y que quieras saber cómo protegemos
            tu información. En esta plataforma, nos tomamos en serio tu
            privacidad (y un poquito de humor nunca viene mal). A continuación,
            te explicamos nuestras políticas de privacidad para que entiendas
            cómo manejamos los datos de una manera segura y respetuosa.
          </p>
        </div>
        <div className='section'>
          <h3>1. ¿Qué tipo de datos recolectamos?</h3>
          <p>
            Para que todo funcione de maravilla y podamos conectar a quienes
            necesitan ayuda con quienes están dispuestos a brindarla,
            necesitamos recopilar cierta información, como:
          </p>
          <ul>
            <li>
              Datos de contacto: Para que puedas comunicarte con quienes ofrecen
              asistencia.
            </li>
            <li>
              Ubicación aproximada: Sólo compartimos un radio general de
              ubicación para proteger tu privacidad, nunca tu dirección exacta.
            </li>
            <li>
              Información sobre tu oferta o necesidad de ayuda: Esto nos permite
              conectar a las personas adecuadas.
            </li>
          </ul>
        </div>
        <div className='section'>
          <h3>2. Compromiso de Confidencialidad</h3>
          <p>
            Este es un tema importante: nunca, jamás, en ninguna circunstancia
            compartiremos tu información sensible con fines comerciales.
            ¡Prometido! Tus datos son solo para hacer posible esta red de ayuda,
            nada más.
          </p>
        </div>
        <div className='section'>
          <h3>3. ¿Qué pasa si necesitamos contactarte?</h3>
          <p>
            Esto significa que te enviaremos una solicitud (ya sea vía correo
            electrónico o WhatsApp) en la que te preguntaremos qué horario te
            viene mejor para poder llamarte. Y si tú necesitas hacerlo, puedes
            enviarnos un correo electrónico para solicitar que nos pongamos en
            contacto contigo. Queremos respetar tu tiempo y tu tranquilidad.
          </p>
        </div>
        <div className='section'>
          <h3>4. Comunicación Segura</h3>
          <p>
            Para protegerte y a todos los usuarios, la comunicación inicial
            entre quienes ofrecen ayuda y quienes la necesitan se realiza
            exclusivamente a través de correo electrónico. De esta manera, tú
            decides cuándo y cómo proporcionar más detalles según consideres
            seguro.
          </p>
        </div>
        <div className='section'>
          <h3>
            5. Transmisión de Datos a los creadores de ofertas de asistencia.
          </h3>
          <p>
            Cuando un usuario solicita ayuda o se inscribe en una oferta de
            asistencia ofrecida a través de nuestra plataforma, los datos
            personales proporcionados, como el número de teléfono y el correo
            electrónico, serán compartidos con el creador de la oferta de
            asistencia correspondiente. Esta transferencia de datos es necesaria
            para facilitar la comunicación directa y garantizar la prestación
            del servicio solicitado.
          </p>
          <p>
            Nos aseguramos de que los creadores de ofertas se comprometan a
            tratar los datos personales conforme a la normativa de protección de
            datos vigente y exclusivamente para los fines relacionados con la
            oferta en cuestión. No obstante, no asumimos responsabilidad por el
            uso indebido de los datos por parte de los creadores una vez
            compartidos.
          </p>
          <p>
            Si tienes dudas o necesitas más información sobre cómo se comparten
            tus datos, por favor, contáctanos a través de{' '}
            <strong>adoptaunvalencia@gmail.com</strong>.
          </p>
        </div>
        <div className='section'>
          <h3>6. ¿Cuánto tiempo guardamos tus datos?</h3>
          <p>
            Guardaremos tus datos únicamente mientras sea necesario para cumplir
            con los objetivos de la plataforma. No queremos nada más que
            apoyarte y facilitar la ayuda de forma eficaz y puntual.
          </p>
        </div>
        <div className='section'>
          <h3>7. Enlaces a Sitios Externos</h3>
          <p>
            Como parte de nuestra misión de colaboración, es posible que incluya
            un enlace a somsolidaritat.gva.es en nuestra plataforma. Si decides
            visitar ese o cualquier otro sitio externo que veas mientras estés
            navegando en nuestra web, recuerda que estarás sujeto a sus propias
            políticas de privacidad.
          </p>
        </div>
        <div className='section'>
          <h3>8. Publicaciones No Permitidas</h3>
          <p>
            No se permite la publicación de ofertas de asistencia relacionadas
            con drogas, armas o cualquier otro producto que pueda comprometer la
            seguridad o el bienestar de nuestros usuarios, ni la solicitud de
            ayudas económicas.
          </p>
        </div>
        <div className='section'>
          <h3>9. Responsabilidad sobre Comentarios</h3>
          <p>
            No nos hacemos responsables de los comentarios realizados por los
            usuarios. Sin embargo, si nuestros moderadores detectan contenido
            sospechoso o inapropiado, este será eliminado y el usuario
            responsable, suspendido. Además, como usuario, también tienes la
            posibilidad de denunciar publicaciones inapropiadas enviando un
            correo a <strong>adoptaunvalencia@gmail.com</strong> con la
            información correspondiente y una captura de pantalla de la
            publicación.
          </p>
        </div>
        <div className='section'>
          <h3>10. Independencia Política</h3>
          <p>
            Somos una plataforma independiente y no estamos vinculados a ningún
            partido político. Nuestra única misión es conectar a quienes
            necesitan ayuda con quienes quieren brindarla.
          </p>
        </div>
        <div className='section'>
          <h3>11. Tus Derechos</h3>
          <p>
            Tienes derecho a solicitar acceso, modificación o eliminación de tu
            información en cualquier momento. Escríbenos a
            adoptaunvalencia@gmail.com, ¡y nos encargaremos de ello!
          </p>
        </div>
        <div className='section'>
          <h3>11. Cambios en la Política de Privacidad</h3>
          <p>
            Es posible que actualicemos esta política de vez en cuando para
            adaptarla a cambios en la plataforma o en la normativa. Si hacemos
            cambios importantes, te avisaremos por esta misma vía para que
            siempre estés al tanto.
          </p>
        </div>
        <div className='final-note'>
          <h3>¿Preguntas? Estamos Aquí para Ti</h3>
          <p>
            Si tienes alguna duda o quieres conversar con nosotros sobre esta
            política (o el proyecto en general), ¡no dudes en escribirnos!
            Puedes encontrarnos en <strong>adoptaunvalencia@gmail.com</strong>.
          </p>
          <p>
            Gracias por confiar en nosotros y por ser parte de esta red
            solidaria.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy
