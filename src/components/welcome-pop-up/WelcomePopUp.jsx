import Button from "../button/Button";
import "./welcomePopUp.css";
import logoAdopta from "../../assets/images/logo.webp";
import texts from "../../utils/PopUp/welcome.json";

const WelcomePopUp = () => {
  return (
    <section className="welcome__container">
      <div className="welcome__close-container">
        <span className="welcome__close">✕</span>
      </div>
      <div className="welcome__brand">
        <img
          className="welcome__brand-image"
          src={logoAdopta}
          alt="Logo adopta un Valenciano"
        />
        <p className="welcome__brand-title">{texts.brandTitle}</p>
      </div>
      <div className="welcome__explain-container">
        <p className="welcome__explain-text">
          <span>{texts.explainTextTitle1}</span>
          <br />
          {texts.explainTextDescription1}
        </p>
        <p className="welcome__explain-text">
          <span>{texts.explainTextTitle2}</span>
          <br />
          {texts.explainTextDescription2}
        </p>
      </div>
      <div className="welcome__button-container">
        <Button
          text="Registrarme"
          bgColor="var(--bg-primary-red)"
          textColor="white"
          borderRadius="var(--spacing-l)"
        />
      </div>
    </section>
  );
};

export default WelcomePopUp;
