
const userValidation = {
    username: {
        notEmpty: true,
        errorMessage: "Username cannot be empty"
    },
    password: {
        notEmpty: true,
        errorMessage: "Password cannot be empty"
    },
    confirmPassword: {
        notEmpty: true,
        errorMessage: "Confirm Password cannot be empty"
    },
    email: {
        notEmpty: true,
        errorMessage: "Email cannot be empty"
    },
}

module.exports =  { userValidation }