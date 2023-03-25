const router = require("express").Router()
const { validate } = require("../../validations/validate");
const { userValidation } = require("../../validations/user");
const { checkSchema} = require("express-validator")
const { tokenVerifier} = require("../../utils/index")

const { registerUserController, loginUserController, generateQrCodeController} = require("../../controllers/authController")
const {createTodoController, allTodosController, updateTodoController, deleteTodoController } = require("../../controllers/todosController")

// route here
router.post("/register", validate(checkSchema(userValidation)), registerUserController)
router.post("/login", loginUserController)

//Qrcode here
router.post("/generate-qrcode", validate(checkSchema(userValidation)), generateQrCodeController)


//Todo List Route
router.post("/create-todo", tokenVerifier, createTodoController)
router.get("/todos", tokenVerifier, allTodosController )
router.put("/change-todo/:todoId", tokenVerifier, updateTodoController)
router.delete("/remove-todo/:todoId", tokenVerifier, deleteTodoController)




module.exports = router