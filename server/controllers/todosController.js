const { createTodoService, allTodosService, updateTodo, deleteTodo } = require("../services/todoService")


const createTodoController = async (req, res) => {
    return await createTodoService( req.body, (result) => {
        return res.status(result.statusCode).json({ result });
    })
}

const allTodosController = async (req, res) => {
    return await allTodosService({ param: req.params, query: req.query }, (result) => {
        return res.status(result.statusCode).json({ result });
    })
}

const updateTodoController = async (req, res) => {
    return await updateTodo({params: req.params, body: req.body}, (result) => {
        return res.status(result.statusCode).json({ result });
    })
}

const deleteTodoController = async (req, res) => {
    return await deleteTodo(req.params, (result) => {
        return res.status(result.statusCode).json({ result });
    })
}



module.exports = {createTodoController, allTodosController, updateTodoController, deleteTodoController }