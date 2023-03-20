const jwt = require('jsonwebtoken')
const { PAGE_LENGTH } = require("../constants/index")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const COUNTRY_CODE = "234";

const messageHandler = (message, success, statusCode, data) => {
    return  { message, success, statusCode, data };
}

const tokenHandler = (data) => {
    var { _id } = data;

    var token = jwt.sign({_id}, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE_IN });
    return { token, _id };
}

const tokenVerifier = (req, res, next) => {
    try {
        let identification = 'userId'

        if (req.get('Authorization') !== undefined) {
            const token = req.get('Authorization').replace("Bearer ", '');
            jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                if (err) {
                    return res.status(401).json({ result: "Unauthorized, Session Expired", status: 401 });
                } else {
                    let id
                    if (req.method === "POST") {
                        id = req.body.hasOwnProperty(identification) ? req.body[`${identification}`] : ''
                    } else if (req.method === "GET") {
                        id = req.params.hasOwnProperty(identification) ? req.params[`${identification}`] : req.query[`${identification}`]
                    } else if (req.method === "PUT") {
                        id = req.body.hasOwnProperty(identification) ? req.body[`${identification}`] : req.params[`${identification}`]
                    } else if(req.method === "DELETE") {
                        id = req.params.hasOwnProperty(identification) ? req.params[`${identification}`] : req.query[`${identification}`]
                    }

                    if (id === decoded._id) {
                        next();
                    } else {
                        return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
                    }
                }
            });
        } else {
            return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
        }
    } catch {
        return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
    }
}


// const AlphaNumeric = (length, type = 'alpha') => {
//     var result = '';
//     var characters = type === 'alpha' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' : '0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

const queryConstructor = (query, sortBy, item) => {
    let params = {}
    let array = Object.keys(query)
    for (let i = 0; i< array.length; i++) {
        if(Object.keys(query)[i] === 'id' ) {
            params["_id"] = mongoose.Types.ObjectId(Object.values(query)[i])
        } else if ( Object.keys(query)[i] === 'userId' ) {
            params[Object.keys(query)[i]] = mongoose.Types.ObjectId(Object.values(query)[i])
        } else {
            params[Object.keys(query)[i]] = Object.values(query)[i]
        }
    }
     
    let { limit, skip, sort } = params
    limit = limit ? Number(limit) : PAGE_LENGTH
    skip = skip ? Number(skip) : 0

    if (sort === 'asc' || sort === 'desc') {
        if (typeof sortBy === 'object') {

            let first = sortBy[Object.keys(sortBy)[0]]
            let second = sortBy[Object.keys(sortBy)[1]]

            sort = sort === 'asc' ? { [first]: 1, [second]: 1 } : { [first]: -1, [second]: -1 }
        } else {
            sort = sort === 'asc' ? { [sortBy]: 1 } : { [sortBy]: -1 }
        }
    } else if(sort === undefined) {
        sort = { [sortBy]: 1 }
    } else {
        return {error : `Unable to find ${item} might be because of invalid params`}
    }

    delete params.limit
    delete params.skip
    delete params.sort
    return {params, limit, skip, sort}
}


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const verifyPassword = async (password, dbpassword) => {
    return await bcrypt.compare(password, dbpassword)
}

const verifyPhoneNumber = (phone) => {
    return /^([0]{1}|\+?234)([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g.test(phone);
};

const sanitizePhoneNumber = (phone) => {
    phone = phone.trim()
    if (!verifyPhoneNumber(phone)) {
        return {status: false, message: "Phone number is invalid", phone: ''};
    }
    if (phone.startsWith("0") || phone.startsWith("+")) {
        phone = phone.substring(1);
    }
    if (phone.startsWith(COUNTRY_CODE)) {
        return { status: true, message: "Phone number is valid", phone: "+" + phone };
    }
    return { status: true, message: "Phone number is valid", phone: `+${COUNTRY_CODE}${phone}` };
};

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}
  
const convertMsToHM = (milliseconds) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = seconds >= 60 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

module.exports = { messageHandler, tokenHandler, tokenVerifier,  queryConstructor, hashPassword, verifyPassword, sanitizePhoneNumber, convertMsToHM }
