import { useState } from "react";
//mport styled from "styled-components";
import axios from "axios";

export function UpdateTodo({ _id, handleClose, handleEdited }) {
    const [data, setData] = useState({ title: "", description: "" });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log({ _id }, { data });

        axios
            .put(`http://localhost:3300/api/v1/todos/change-todo/${_id}`, data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
    }

    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e);
                handleEdited();
                handleClose();
            }}
        >
            <label htmlFor="title">
                Title
            </label>
            <input
                type="text"
                name="title"
                className="input"
                onChange={handleChange}
            />
            <label htmlFor="description">
                Description
            </label>
            <input
                type="text"
                name="description"
                className="input"
                onChange={handleChange}
            />
            <button type="submit">
                Submit
            </button>
        </form>
    );
}




