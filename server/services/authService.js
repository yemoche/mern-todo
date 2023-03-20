const { BAD_REQUEST, SUCCESS } = require("../constants/statusCode")
const authUser = require("../schema/authSchema")
const { messageHandler, hashPassword, verifyPassword, tokenHandler } = require("../utils/index");



const registerUserService = async( body, callback) => {
  let { username,email, password } = body

  try {
    const usernameCheck = await authUser.findOne({username}).exec();
    if (usernameCheck)
    return callback(messageHandler("User Name already exists", false, BAD_REQUEST, {}));
    const emailCheck = await authUser.findOne({ email }).exec();
    if (emailCheck)
      return callback(messageHandler("Email already exists", false, BAD_REQUEST, {}));
    if (usernameCheck || emailCheck === null) {
          password = await hashPassword(password)
        const user = new authUser({ ...body, password})
        await user.save();
    return callback(messageHandler("user successfully created", true, SUCCESS, {user}));
}
  } catch (error) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
  }
}

const loginUserService = (data, callback) => {
    let { email, password, confirmPassword } = data
  try {
    authUser.findOne({ email } , async (err, user) => {
      if (err) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
      }

      if (!user) {
        return callback(messageHandler("User not found", false, BAD_REQUEST, {}))
      }
     if (password === confirmPassword) {

        password =await  hashPassword(password)
        password = await verifyPassword(password, user.password)
        const token = await tokenHandler(user)
        return callback(messageHandler("You are successfully Logged in", true, SUCCESS, token))
     }
    })
  } catch (err) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
  }
}



module.exports = {registerUserService, loginUserService }
