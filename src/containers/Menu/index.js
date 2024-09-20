// Menu/index.js
import React from "react";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    window.location.hash = sectionId;
  };

  return (
    <nav>
      <Logo />
      <ul>
        <li>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("services");
            }}
          >
            Nos services
          </a>
        </li>
        <li>
          <a
            href="#realisations"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("realisations");
            }}
          >
            Nos réalisations
          </a>
        </li>
        <li>
          <a
            href="#equipe"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("equipe");
            }}
          >
            Notre équipe
          </a>
        </li>
      </ul>
      <Button title="contact" onClick={() => scrollToSection("contact")}>
        Contact
      </Button>
    </nav>
  );
};

export default Menu;
