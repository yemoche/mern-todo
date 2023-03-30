import React, { useState} from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import Cookies from "universal-cookie";

// const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  const validateForm = () => {
    if (email === "") {
      toast.error("Email cannot be empty.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password cannot be empty.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let check = await validateForm()
    if(check) {
    const configuration = {
      method: "post",
      url: "http://localhost:3300/api/v1/auth/login",
      data : {
        email,
        password
     },
    }
  
    try {
      const expec = await axios(configuration)
      const outputt = await(expec)
      let {data} = outputt
      if (data) {
        localStorage.setItem("token", JSON.stringify(data.result.data.token))
        localStorage.setItem("userId", JSON.stringify(data.result.data._id));
      }
      setLogin(true)
      setEmail('');
      setPassword('');
     navigate('/create-todo')
      
    } catch (error) {
      throw new Error()
     }
    }
    

    // axios(configuration)
    // .then(outputt => {
    //   console.log('data', outputt.config.data.token)
    //   if (outputt) {
    //     localStorage.setItem("user", JSON.stringify(JSON.stringify(outputt.config.data.token)));
    //   }
    //   setLogin(true)
    //    navigate('/create-todo')
    // })
    //   // cookies.set("TOKEN", result.data.token, {
    //   //   path: "/",
    //   // })
       
    //   .catch((error) => {error = new Error() })
    // setEmail('');
    // setPassword('');
    // setConfirmPassword('');
      
    // }

  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>Yecc</h1>
          </div>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onChange={(e) => handleChange(e)}
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>Log In</button>
          {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
    p {
      color: white;
    }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;