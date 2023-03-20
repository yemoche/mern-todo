const { BAD_REQUEST, SUCCESS, CREATED } = require("../constants/statusCode")
const todo = require("../schema/todosSchema")
const mongoose = require('mongoose');
const { messageHandler, queryConstructor } = require("../utils/index");


/**
 * @method POST 
 * @description create a new todo
 * @access public
 */


const createTodoService = async (body, callback) => {
    try {
        let todos = new todo(body)
        await todos.save()
        return callback(messageHandler("Todo Successfully created", true, CREATED, todos))
    } catch (err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
    }
}


/**
 * @method GET api/todo
 * @description get all todos
 * @access public
 */

const allTodosService = async ({ query }, callback) => {

    const { error, limit, skip, sort, params } = await queryConstructor(query, "createdAt", "todos");
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalTodos: 0, todos: [] }));
    }
    try {
        const todos = await todo.find({ ...params }).limit(limit).skip(skip).sort(sort);
        const totalTodos = await todo.find({ ...params }).countDocuments();
        if (!todos.length > 0) {
            return callback(messageHandler("No todos details found", false, BAD_REQUEST, {}));
        }
        return callback(messageHandler("All Todos Successfully Fetched", true, SUCCESS, { totalTodos, todos }));
    } catch (err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err));
    }
}


/**
 * @method PUT api/todo/:id
 * @description update todo
 * @access public
 */
const updateTodo = async ({ params, body }, callback) => {

    await todo.updateOne({ _id: mongoose.Types.ObjectId(params.todoId) }, { $set: { ...body } }, (err, success) => {
        if (err) {
            return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
        }
        if (success.n === 0) {
            return callback(messageHandler("Todolist does not exist", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Todolist successfully updated", true, SUCCESS, success))
    }).clone()
}

/**
 * @method DELETE api/todo/:id
 * @description delete todo
 * @access public
 */

const deleteTodo = async ({ todoId }, callback) => {
    await todo.deleteOne({ _id: mongoose.Types.ObjectId(todoId) }, (err, success) => {
        if (err) {
            return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
        }
        if (success.n === 0) {
            return callback(messageHandler("Todo item not found", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Todo item successfully deleted", true, SUCCESS, success))
    }).clone()
}

module.exports= {createTodoService, allTodosService, updateTodo, deleteTodo }