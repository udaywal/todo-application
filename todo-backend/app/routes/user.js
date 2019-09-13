const express = require('express');
const userController = require("../controllers/userController");
const appConfig = require("../../config/appConfig")

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;

    app.post(`${baseUrl}/signup`, userController.signupFunction);
    /**
     * @apiGroup User
     * @apiVersion  1.0.0
     * @api {post} /api/v1/signup api for sign up.
     *
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastname Last Name of the user. (body params) (required)
     * @apiParam {number} mobile Mobile Number of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} country country Name of the user. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Congrats! user created succesfully!",
                "status": 200,
                "data": {
                    "userId": "KFJ8suFYL",
                    "firstName": "Emma",
                    "lastName": "Watson",
                    "email": "emmawatson@gmail.com",
                    "country": "England",
                    "mobile": 7240277241,
                    "createdOn": "2019-08-18T19:04:58.000Z",
                }
            }
    */

    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
     * @apiGroup User
     * @apiVersion  1.0.0
     * @api {post} /api/v1/login api for sign in.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Welcome Back! Login succesful!",
                "status": 200,
                "data": {
                    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImdOb1RZWVhzViIsImlhdCI6MTU2NjE1NTc2MzkxOSwiZXhwIjoxNTY2MjQyMTYzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktGSjhzdUZZTCIsImZpcnN0TmFtZSI6IkVtbWEiLCJsYXN0TmFtZSI6IldhdHNvbiIsImVtYWlsIjoiZW1tYXdhdHNvbkBnbWFpbC5jb20iLCJjb3VudHJ5IjoiRW5nbGFuZCIsIm1vYmlsZSI6NzI0MDI3NzI0MSwiaXNBZG1pbiI6ZmFsc2V9fQ.qg2OZJ1Y6VA-dRUgZjl47-CrRV7C0JTcDyOONRooDaw",
                    "userDetails": {
                        "userId": "KFJ8suFYL",
                        "firstName": "Emma",
                        "lastName": "Watson",
                        "email": "emmawatson@gmail.com",
                        "country": "England",
                        "mobile": 7240277241,
                    }
                }
            }
    */

    app.post(`${baseUrl}/logout`, userController.logout);
    /**
     * @apiGroup User
     * @apiVersion  1.0.0
     * @api {post} /api/v1/logout api to sign out active user.
     *
     * @apiParam {string} activeUserId loggedin userId of the the user. (body params) (required)
     * 
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "logout successful!",
                "status": 200,
                "data": [
                    {
                        "tokenGenerationTime": "2019-08-18T19:16:03.000Z",
                        "_id": "5d59a3f3d182a603d8ed02fd",
                        "userId": "KFJ8suFYL",
                        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImdOb1RZWVhzViIsImlhdCI6MTU2NjE1NTc2MzkxOSwiZXhwIjoxNTY2MjQyMTYzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IktGSjhzdUZZTCIsImZpcnN0TmFtZSI6IkVtbWEiLCJsYXN0TmFtZSI6IldhdHNvbiIsImVtYWlsIjoiZW1tYXdhdHNvbkBnbWFpbC5jb20iLCJjb3VudHJ5IjoiRW5nbGFuZCIsIm1vYmlsZSI6NzI0MDI3NzI0MSwiaXNBZG1pbiI6ZmFsc2V9fQ.qg2OZJ1Y6VA-dRUgZjl47-CrRV7C0JTcDyOONRooDaw",
                        "tokenSecret": "someVeryRandomStringThatNobodyCanGuessLiterallyNobodyCanGuess",
                        "__v": 0
                    }
                ]
            }
    */
    
    app.post(`${baseUrl}/forgotpassword`, userController.forgotPassword);
    /**
     * @apiGroup User
     * @apiVersion  1.0.0
     * @api {post} /api/v1/forgotpassword api to get password link in email.
     *
     * @apiParam {string} email user email. (body params) (required)
     * 
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Password reset link sent Successfully",
                "status": 200,
                "data": null
            }
    */
    
    app.post(`${baseUrl}/resetPassword`, userController.resetPassword);
    /**
     * @apiGroup User
     * @apiVersion  1.0.0
     * @api {post} /api/v1/resetPassword api to set new password.
     *
     * @apiParam {string} userId user's Id. (body params) (required)
     * @apiParam {string} password new password. (body params) (required)
     * 
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Password changed Successfully",
                "status": 200,
                "data": null
            }
    */

}

module.exports = {
    setRouter: setRouter
}