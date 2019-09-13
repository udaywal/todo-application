const express = require('express');
const historyController = require("../controllers/historyController");
const appConfig = require("../../config/appConfig")

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;

    app.post(`${baseUrl}/history/add`, historyController.addHistory)
     /**
     * @apiGroup State Management
     * @apiVersion  1.0.0
     * @api {post} /api/v1/history/add api to add history.
     *
     * @apiParam {string} taskId task Id. (body params) (required)
     * @apiParam {string} itemId is item Id. (body params) (required)
     * @apiParam {string} key key. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "History Added",
            "status": 200,
            "data": {
                "historyId": "0Ww0fBhKC",
                "taskId": "EQkgrD1Ik",
                "itemId": "9tmYM-Uaf",
                "key": "Item Delete",
                "itemValues": [
                    {
                        "_id": "5d7a41c5bc44c512f05732d1",
                        "parentId": "EQkgrD1Ik",
                        "itemId": "9tmYM-Uaf",
                        "itemName": "Gymming",
                        "itemCreatorId": "P5zc6a_XT",
                        "itemCreatorBy": "Vaibhav Udaywal",
                        "itemCreatedOn": "2019-09-12T13:01:57.000Z",
                        "__v": 0
                    }
                ],
                "createdOn": "2019-09-12T13:05:18.000Z",
                "_id": "5d7a428ebc44c512f05732d2",
                "__v": 0
            }
        }
    */

    app.post(`${baseUrl}/history/get`, historyController.getHistory)
     /**
     * @apiGroup State Management
     * @apiVersion  1.0.0
     * @api {post} /api/v1/history/get api to get history.
     *
     * @apiParam {string} taskId task Id. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "History - History Found",
            "status": 200,
            "data": [
                {
                    "_id": "5d7a428ebc44c512f05732d2",
                    "historyId": "0Ww0fBhKC",
                    "taskId": "EQkgrD1Ik",
                    "itemId": "9tmYM-Uaf",
                    "key": "Item Delete",
                    "itemValues": [
                        {
                            "_id": "5d7a41c5bc44c512f05732d1",
                            "parentId": "EQkgrD1Ik",
                            "itemId": "9tmYM-Uaf",
                            "itemName": "Gymming",
                            "itemCreatorId": "P5zc6a_XT",
                            "itemCreatorBy": "Vaibhav Udaywal",
                            "itemCreatedOn": "2019-09-12T13:01:57.000Z",
                            "__v": 0
                        }
                    ],
                    "createdOn": "2019-09-12T13:05:18.000Z",
                    "__v": 0
                }
            ]
        }
    */

    app.post(`${baseUrl}/history/delete`, historyController.deleteHistory)
     /**
     * @apiGroup State Management
     * @apiVersion  1.0.0
     * @api {post} /api/v1/history/delete api to delete history.
     *
     * @apiParam {string} taskId task Id. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "History deleted!",
            "status": 200,
            "data": {
                "ok": 1,
                "n": 1,
                "deletedCount": 1
            }
        }
    */

}

module.exports = {
    setRouter: setRouter
}