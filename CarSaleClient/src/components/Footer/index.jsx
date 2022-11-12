import React from "react";

import { ReactComponent as Icon } from "assets/uncolor-logo.svg";
import { Container, LogoNavContainer, NavContainer } from "./style";
//200 50 487 300
function Footer({ ...props }) {
  return (
    <>
      <Container isBasic={props.isBasic}>
        {props.isBasic ? (
          <>
            <LogoNavContainer isBasic={props.isBasic}>
              <section className="img-container">
                <Icon fill="black" viewBox="45 50 500 100" />
              </section>
              <p className="copyright">
                Copyright © 2021 PinPoint. Todos os direitos reservados
              </p>
            </LogoNavContainer>
          </>
        ) : (
          <>
            <LogoNavContainer>
              <section className="img-container">
                <Icon fill="white" /* viewBox="45 60 487 196" */ />
              </section>
              <NavContainer>
                <div>Comprar carro</div>
                <div>Vender carro</div>
                <div>App Kavak</div>
                <div>Onde estamos</div>
                <div>Perguntas frequentes</div>
                <div>Blog</div>
                <div>Guia de preços</div>
                <div>Carreiras</div>
                <div>Contato</div>
                <div>Imprensa</div>
                <div>🇧🇷 Brasil</div>
              </NavContainer>
            </LogoNavContainer>
          </>
        )}
      </Container>
    </>
  );
}

export default Footer;
