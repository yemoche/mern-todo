import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

export default function NewTodo() {
    let bearer = 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    let userId = JSON.parse(localStorage.getItem('userId'))
    const [data, setData] = useState({ title: "", description: "", userId});
    const navigate = useNavigate();
    

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    const logout = () => {
        ['token', 'userId'].forEach(obj => localStorage.removeItem(obj));
        
        navigate("/")
      };

    const handleSubmit = async (e)=> {
        //e.preventDefault();

        const configuration = {
            method: "POST",
            url: "http://localhost:3300/api/v1/todos/create-todo",

            data,
            headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json'
                    },
          }

        try {
            const result= await axios(configuration)
            if (result) {
                alert("You have successfully added Your Todo")
                
            }else{

            }
            /* setData({ title: "", description: "", userId}) */
        } catch (error) {
                console.log(error.result); 
        }

    }

    return (
        <SectionContainer >
            <Link to="/todos" >
                <button type="button" className="button">
                    back
                </button>
            </Link>
            <div>
            <Link to="/" >
                <button type="button" onClick={logout}>
                    logout
                </button>
            </Link>
            </div>
            <section >
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <label  htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        //value={data.title}
                        onChange={handleChange}
                        
                    />
                    <label  htmlFor="description">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        //value={data.description}
                        onChange={handleChange}
                    />
                    <span>
                    <button type="submit" >
                        create todo
                    </button>
                    </span>
                </form>
            </section>
        </SectionContainer>
    );
}

const SectionContainer = styled.section`
    background-color:lemon;
    height: 100vw;
    width: 100vw;
    button{
        padding: 10px;
        margin-top: 5px;
        margin-left: 3px;
        border: none;
        border-radius: 5px;
        background-color: #d9d686;
        font-size: 1rem;
        cursor: pointer;
        }
    div button{
        flex-direction: column;
        padding: 10px;
        margin: 10px auto;
        margin-left: 3px;
        border: none;
        border-radius: 5px;
        background-color: #d9d686;
        font-size: 1rem;
        cursor: pointer;
    }
    section{
    display: flex;
    flex-direction: column;
    height: 30rem;
    margin: 40px;
    padding-top: 90px;
    background-color:#4ae08b;
    }
    label{
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        padding: 4px;
        padding-left: 10px;
       font-size: 2rem;
       align-items: center;
    }
    input{
    width: 50%;
    display: block;
    margin : 0 auto;
    padding: 20px;
    gap: 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    }
    span button{
       display: float;
       margin: 20px auto;
       padding: 6px;
       color: lemon;
       background-color: #d9d686;
       font-size: 2rem;
       
    
    }
`