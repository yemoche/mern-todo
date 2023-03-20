
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UpdateTodo } from "./SelectedTodo";
import styled from "styled-components";

function TodoCard({ data, handleEdit, handleDelete }) { 
    const { _id, title, description } = data;

    return (
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div >
                <button  name={_id} onClick={handleEdit}>
                    edit
                </button>
                <button  name={_id} onClick={handleDelete}>
                    delete
                </button>
            </div>
        </li>
    );
}

export default function Todos() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false); 
    const [id, setId] = useState(""); 
    const [update, setUpdate] = useState(false); 
    const navigate = useNavigate();

    useEffect(
        function () {
            axios
                .get("http://localhost:3300/api/v1/todos")
                .then((res) => {
                    console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update] // updated
    );

    function handleEdit(e) { 
        setId(e.target.name); 
        setOpen(true);
    }

    const logout = () => {
        localStorage.clear();
        navigate("/")
      };

    function handleUpdate() { // added
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) { // added
        axios.delete(`http://localhost:8000/api/v1/todos/remove-todo/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    function handleClose() { 
        setId("");
        setOpen(false);
    }

    return (
        <SectionContainer >
            <Link to="/create-todo" >
                <button >New</button>
            </Link>
            <div>
            <Link to="/" >
                <button type="button" onClick={logout}>
                    logout
                </button>
            </Link>
            </div>
            <section >
                <h1>TODO</h1>
                <ul >
                    {todo.map((data) => (
                        <TodoCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </section>
            {open ? (
                <section >
                    <div >
                        <p onClick={handleClose} >
                            {/* &times; */}
                        </p>

                        <UpdateTodo
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
        </SectionContainer>
    );
}

const SectionContainer = styled.section`
    // background-color:red;
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
    cursor: pointer;
    }
    section h1{
        font-size: 2rem; 
    }
`

