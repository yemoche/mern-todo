const { BAD_REQUEST, SUCCESS } = require("../constants/statusCode")
const authUser = require("../schema/authSchema");
const qrCode = require("../schema/qrSchema")
const Qrcode = require('qrcode')
const { messageHandler, hashPassword, verifyPassword, tokenHandler } = require("../utils/index");



const registerUserService = async( body, callback) => {
  let { username,email, password, confirmPassword } = body

  let strData = JSON.stringify(body)
    
  try {
    const usernameCheck = await authUser.findOne({username}).exec();
    if (usernameCheck)
    return callback(messageHandler("User Name already exists", false, BAD_REQUEST, {}));
    const emailCheck = await authUser.findOne({ email }).exec();
    if (emailCheck)
      return callback(messageHandler("Email already exists", false, BAD_REQUEST, {}));
    if (usernameCheck || emailCheck === null) {
         if (password === confirmPassword) {
          password = await hashPassword(password)
          await delete(body.confirmPassword)
         }
            const url = await Qrcode.toDataURL(strData)
            const user = new authUser({ ...body, password, url:url})
            await user.save();
    return callback(messageHandler("user successfully created", true, SUCCESS, {url}));
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



const generateQrCodeService = (data, callback) => {
     try {
      const { authId } = data
      authUser.findById({ authId } , async (err, user) => {
        if (err) {
          return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
        }
  
        if (!user) {
          return callback(messageHandler("User not found", false, BAD_REQUEST, {}))
        }
        
        const qrExist = await qrCode.findOne({authId})

        if (!qrExist) {
          await qrCode.create({authId})
        } else {
          await qrCode.findByIdAndUpdate({authId}, { $set: { disabled: true} })
          await qrCode.create({authId})
        }

        //encrpyting the userdata into qrcode as a token
        const dataEncryptionIntoQrCode = tokenHandler(...data)

        const dataImage = await qrCode.toDataURL(dataEncryptionIntoQrCode)
        return callback(messageHandler("QR code successfully generated", true, SUCCESS, dataImage))
      })
     } catch (error) {
      return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
     }
  }

module.exports = {registerUserService, loginUserService, generateQrCodeService }
