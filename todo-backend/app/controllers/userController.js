const mongoose = require('mongoose');

const response = require('../libs/responseLib')
const paramsValidationLib = require('../libs/paramsValidationLib')
const checkLib = require('../libs/checkLib')
const passwordLib = require('../libs/generatePasswordLib')
const timeLib = require('../libs/timeLib')
const tokenLib = require('../libs/tokenLib')
const emailLib = require('../libs/emailLib')

const shortid = require('shortid')

const UserModel = require('../models/User')
const AuthModel = require('../models/Auth')

/*---------------------------------------------------------------------------------------------
# USER - User Signup API
----------------------------------------------------------------------------------------------*/

let signupFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!paramsValidationLib.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Please enter the correct email!', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                let apiResponse = response.generate(true, 'Email is missing!', 400, null)
                reject(apiResponse)
            }
        })
    }

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email }, (err, retrievedUserDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to create user!', 500, err)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(retrievedUserDetails)) {
                    let newUser = new UserModel({
                        userId: shortid.generate(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email.toLowerCase(),
                        country: req.body.country,
                        mobile: req.body.mobile,
                        password: passwordLib.hashpassword(req.body.password),
                        createdOn: timeLib.now()
                    })
                    newUser.save((err, newUserDetails) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'Failed to save user!', 500, err)
                            reject(apiResponse)
                        } else {
                            let newUserDetailsObj = newUserDetails.toObject()
                            delete newUserDetailsObj.password
                            delete newUserDetailsObj.__v
                            delete newUserDetailsObj._id
                            let apiResponse = response.generate(false, 'Congrats! user created succesfully!', 200, newUserDetailsObj)
                            resolve(apiResponse)
                        }
                    })

                } else {
                    let apiResponse = response.generate(true, 'You are already registered! Please login!', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    validateUserInput(req, res)
        .then(createUser)
        .then((apiResponse) => {
            res.send(apiResponse)
        }).catch((apiResponse) => {
            res.send(apiResponse)
        })

}

/*---------------------------------------------------------------------------------------------
# USER - User Login API
----------------------------------------------------------------------------------------------*/

let loginFunction = (req, res) => {

    let verifyLogin = (req, res) => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ email: req.body.email }, (err, userData) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'Failed to find user!', 500, err)
                        reject(apiResponse)
                    } else if (checkLib.isEmpty(userData)) {
                        let apiResponse = response.generate(true, 'No user details found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(userData)
                    }
                })
            } else {
                let apiResponse = response.generate(true, 'Please enter a correct email!', 400, null)
                reject(apiResponse)
            }
        })
    }

    let passwordValidation = (userData) => {
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, userData.password, (err, isMatch) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to compare password!', 500, err)
                    reject(apiResponse)
                } else if (isMatch) {
                    let userDataObj = userData.toObject()
                    delete userDataObj.password
                    delete userDataObj.__v
                    delete userDataObj._id
                    delete userDataObj.createdOn
                    resolve(userDataObj)
                } else {
                    let apiResponse = response.generate(true, 'Please enter correct password!', 400, null)
                    reject(apiResponse)
                }
            })
        })

    }

    let getToken = (userData) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userData, (err, tokenDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to generate token!', 500, err)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userData.userId,
                    tokenDetails.userDetails = userData
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveAuthData = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, err)
                    reject(apiResponse)
                } else if (checkLib.isEmpty(retrievedTokenDetails)) {
                    let newAuth = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: timeLib.now()
                    })
                    newAuth.save((err, newTokenDetails) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'Failed to create auth token!', 500, err)
                            reject(apiResponse)
                        } else {
                            let authUserData = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            let apiResponse = response.generate(false, 'Welcome Back! Login succesful!', 200, authUserData)
                            resolve(apiResponse)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = timeLib.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, err)
                            reject(apiResponse)
                        } else {
                            let authUserData = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            let apiResponse = response.generate(false, 'Welcome Back!', 200, authUserData)
                            resolve(apiResponse)
                        }
                    })
                }
            })
        })
    }

    verifyLogin(req, res)
        .then(passwordValidation)
        .then(getToken)
        .then(saveAuthData)
        .then((apiResponse) => {
            res.send(apiResponse)
        }).catch((apiResponse) => {
            res.send(apiResponse)
        })

}

/*---------------------------------------------------------------------------------------------
# USER - Forgot Password API
----------------------------------------------------------------------------------------------*/

let forgotPassword = (req, res) => {
    UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
            if (err) {
                let apiResponse = response.generate(true, 'failed to find user!', 500, err);
                res.send(apiResponse);
            } else if (checkLib.isEmpty(userDetails)) {
                let apiResponse = response.generate(true, 'No user details found', 404, null);
                res.send(apiResponse);
            } else {
                emailDetails = {
                    name: userDetails.firstName + ' ' + userDetails.lastName,
                    email: userDetails.email,
                    subject: 'Reset Password!',
                    html: 
                    `<h4> Hello ${userDetails.firstName},</h4>
                    <p>
                        <a href='http://localhost:4200/resetpassword/${userDetails.userId}'>
                        Click here to reset password</a>
                    </p>
                    <br><b>Cheers!</b>
                    <br><b>ToDoApp Team</b>`
                }
                emailLib.sendEmail(emailDetails);
                let apiResponse = response.generate(false, 'Password reset link sent Successfully', 200, null);
                res.send(apiResponse);
            }
        })
}

/*---------------------------------------------------------------------------------------------
# USER - Reset Password API
----------------------------------------------------------------------------------------------*/

let resetPassword = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.userId) {
                UserModel.findOne({ userId: req.body.userId }, (err, userDetails) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'failed to find user', 500, err);
                            reject(apiResponse);
                        } else if (checkLib.isEmpty(userDetails)) {
                            let apiResponse = response.generate(true, 'User not found', 404, null);
                            reject(apiResponse);
                        } else {
                            resolve(userDetails);
                        }
                    })
            } else {
                let apiResponse = response.generate(true, 'Bad request, userId missing', 400, null);
                reject(apiResponse);
            }
        });
    }

    let updatePassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            UserModel.update({ userId: req.body.userId }, { password: passwordLib.hashpassword(req.body.password) }, { multi: true }, (err, result) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'failed to change password', 500, err);
                            reject(apiResponse);
                        } else if (checkLib.isEmpty(result)) {
                            let apiResponse = response.generate(true, 'User not found', 404, null);
                            reject(apiResponse);
                        } else {
                            emailDetails = {
                                name: userDetails.firstName + ' ' + userDetails.lastName,
                                email: userDetails.email,
                                subject: 'Password changed!',
                                html: 
                                `<h4> Hello ${userDetails.firstName},</h4>
                                <p>
                                    Your password has been changed succesfully!
                                </p>
                                <br><b>Cheers!</b>
                                <br><b>ToDoApp Team</b>`
                            }
                            emailLib.sendEmail(emailDetails);
                            let apiResponse = response.generate(false, 'Password changed Successfully', 200, null);
                            resolve(apiResponse);
                        }
                    });
        });
    }

    findUser(req, res)
        .then(updatePassword)
        .then((apiResponse) => {
            res.send(apiResponse)
        }).catch((apiResponse) => {
            res.send(apiResponse)
        })

}

/*---------------------------------------------------------------------------------------------
# USER - Logout User API
----------------------------------------------------------------------------------------------*/

let logout = (req, res) => {
    AuthModel.find({ userId: req.body.activeUserId }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'failed to log out!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(true, 'already logout!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'logout successful!', 200, result)
            res.send(apiResponse)
        }
    })
}


module.exports = {
    signupFunction: signupFunction,
    loginFunction: loginFunction,
    logout: logout,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
}