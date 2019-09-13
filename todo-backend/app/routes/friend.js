const express = require('express');
const friendController = require("../controllers/friendController");
const appConfig = require("../../config/appConfig")

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;

    app.get(`${baseUrl}/users/all`, friendController.getAllUsers);
     /**
     * @apiGroup Friend
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/all api to get all users.
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User details found!",
            "status": 200,
            "data": [
                {
                    "userId": "P5zc6a_XT",
                    "firstName": "Vaibhav",
                    "lastName": "Udaywal",
                    "email": "vaibhav@gmail.com",
                    "country": "IN",
                    "mobile": 7845128956,
                    "password": "$2a$10$H52SK7YLN7gohZmnlantU.WvbzBh95DhdPce1x/slrfLw8VGrZ3/u",
                    "createdOn": "2019-09-04T10:52:55.000Z",
                    "_id": "5d6f97872e6501107891543a",
                    "__v": 0
                },
                {
                    "userId": "5c2NTzSxq",
                    "firstName": "Vivek",
                    "lastName": "Jangid",
                    "email": "vk@gmail.com",
                    "country": "IN",
                    "mobile": 8978546512,
                    "password": "$2a$10$IsJ8lbZn9s9fAcyB6XK2Zu/MHeOagNHtjW.EuLi3zmG5b8lGHkdOm",
                    "createdOn": "2019-09-08T13:44:20.000Z",
                    "_id": "5d7505b492ce3f10ec07b495",
                    "__v": 0
                }
            ]
        }
    */

    app.post(`${baseUrl}/friendrequest`, friendController.sendFriendRequest);
     /**
     * @apiGroup Friend
     * @apiVersion  1.0.0
     * @api {post} /api/v1/friendrequest api to send friend request.
     *
     * @apiParam {string} senderId sender id. (body params) (required)
     * @apiParam {string} senderName sender name. (body params) (required)
     * @apiParam {string} receiverId receiver's id. (body params) (required)
     * @apiParam {string} receiverName receiver's name. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Friend request sent successfully!",
            "status": 200,
            "data": {
                "friendId": "1HDDKVZC8",
                "senderId": "P5zc6a_XT",
                "senderName": "Vaibhav Udaywal",
                "receiverId": "nRcLoBKi-",
                "receiverName": "bharat sharma",
                "isAccepted": false,
                "createdOn": "2019-09-12T13:20:14.000Z"
            }
        }
    */

    app.get(`${baseUrl}/friends/all/:activeUserId`, friendController.getAllFriends);
     /**
     * @apiGroup Friend
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friends/all/:activeUserId api to get all friends.
     *
     * @apiParam {string} activeUserId user id. (url params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Friends found!",
            "status": 200,
            "data": [
                {
                    "friendId": "cjg_vTJAj",
                    "senderId": "P5zc6a_XT",
                    "senderName": "Vaibhav Udaywal",
                    "receiverId": "5c2NTzSxq",
                    "receiverName": "Vivek Jangid",
                    "isAccepted": true,
                    "_id": "5d79413f75eaa3167c1dbd16",
                    "createdOn": "2019-09-11T18:47:27.000Z",
                    "__v": 0
                }
            ]
        }
    */

    app.get(`${baseUrl}/friendrequest/accept/:friendId`, friendController.acceptRequest);
     /**
     * @apiGroup Friend
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friendrequest/accept/:friendId api to accept friend request.
     *
     * @apiParam {string} friendId friend id. (url params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Request accepted!",
            "status": 200,
            "data": {
                "ok": 1,
                "nModified": 0,
                "n": 1
            }
        }
    */

    app.get(`${baseUrl}/friendrequest/reject/:friendId`, friendController.rejectRequest);
     /**
     * @apiGroup Friend
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friendrequest/accept/:friendId api to reject friend request.
     *
     * @apiParam {string} friendId friend id. (url params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Request rejected!",
            "status": 200,
            "data": {
                "ok": 1,
                "nModified": 0,
                "n": 1
            }
        }
    */

}

module.exports = {
    setRouter: setRouter
}