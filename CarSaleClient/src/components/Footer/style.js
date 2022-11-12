import styled, { css } from "styled-components";

export const Container = styled.footer`
  background-color: ${({ theme }) => theme.COLORS.BLACK};
  color: ${({ theme }) => theme.COLORS.WHITE};
  display: flex;
  height: 200px;
  justify-content: center;
  margin-top: 2rem;
  padding: 3rem 0;
  width: 100%;

  ${({ isBasic }) =>
    isBasic &&
    css`
      align-items: center;
      background-color: ${({ theme }) => theme.COLORS.WHITE};
      border-top: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
      display: flex;
      flex-direction: row;
      height: 120px;
      justify-content: flex-start;
      text-align: center;

      .copyright {
        align-self: center;
        color: ${({ theme }) => theme.COLORS.GRAY_300} !important;
        display: flex;
        font-size: ${({ theme }) => theme.FONT_SIZE.SM}px !important;
      }

      svg {
        display: flex;
        height: 100% !important;
      }
      .img-container {
        width: 150px;
        height: 30px;
      }
    `}

  @media only screen and (max-width: 540px) {
    width: 100%;
    height: 950px;
    overflow: hidden;
    /*     ${({ isBasic }) => isBasic && css``}*/
  }
`;

export const LogoNavContainer = styled.section`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 auto;
  width: 1100px;

  .img-container {
    height: 100px;
    position: relative;
    width: 300px;

    svg {
      position: absolute;
      right: 0%;
      top: 30%;
      transform: translateY(-50%);
    }
  }
  @media only screen and (max-width: 540px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  gap: 1.5rem;
  max-height: 180px;
  width: 1050px;

  div {
    cursor: default;

    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 540px) {
    width: 100%;
    max-width: 100%;
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    margin-left: 1rem;
    max-height: fit-content;
  }
`;
