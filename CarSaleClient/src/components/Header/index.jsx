import React from "react";
import { Container, NavBar } from "./styles";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Icon } from "assets/uncolor-logo.svg";
/* import { ReactComponent as UserIcon } from "assets/user-icon.svg"; */

function Header({ ...props }) {
  const navigate = useNavigate();

  const verifySesion = () => {
    const userData = localStorage.getItem("data");

    if (!userData) {
      navigate("/");
      return false;
    }
    return true;
  };

  const handleSell = () => {
    const result = verifySesion();

    if (result) {
      navigate("/car-sell");
    }
  };

  return (
    <Container>
      <NavBar>
        <section className="img-container">
          <Icon fill="black" data-testid="logo" />
        </section>
        <section className="access-container">
          <div
            className={props?.isBuy ? "selected" : ""}
            onClick={() => navigate("/cars")}
          >
            Buy Car
          </div>
          <div
            className={props?.isSell ? "selected" : ""}
            onClick={() => handleSell()}
          >
            Sell Car
          </div>
          <div className="">Sobre nós</div>
          {/*Poner un OnClick aqui^, para mostrar un menu desplegable*/}
          {localStorage.getItem("data") === null && (
            <>
              <div onClick={() => navigate("/")}>Login</div>
            </>
          )}
        </section>
      </NavBar>
    </Container>
  );
}

export default Header;
