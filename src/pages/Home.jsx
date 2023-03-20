import styled from "styled-components";
import {  Link } from "react-router-dom";

export default function Home() {
    return (
      <>
        <HomeContainer>
          <nav>
            <ul>
              <li>
              <Link to="/login">Login</Link>
              </li>
              <li>
              <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
          <h1> Engaging with React </h1>
        </HomeContainer>
      </>
    );
  }



const HomeContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background: papayawhip;
    nav{
      background: orange;
      height: 85px;
      display: flex-left;
      justify-content: space-between;
      padding: 0.2rem calc((100vw - 1000px) / 2);
      z-index: 12;
    }
    li{
      color: #808080;
      display: inline;
      padding: 3rem 5rem;
      float: right;
      font-size: 1.3rem;
      margin-left: 6rem;
      height: 100%;
      cursor: pointer;
    }
    Link{
      text-decoration: none;
      color: red;
    }
    h1 {
      color:tomato;
      font-size: 3.5rem;
      text-transform: uppercase;
      padding: 25rem;
      text-align: center;
    }
`;