const { registerUserService, loginUserService} = require("../services/authService")


const registerUserController = async (req, res) => {
    return await registerUserService( req.body, (result) => {
        return res.status(result.statusCode).json({ result });
    })
}

const loginUserController = async (req, res) => {
    return await loginUserService(req.body, (result) => {
        return res.status(result.statusCode).json({ result });
    })
}

module.exports = { registerUserController, loginUserController }