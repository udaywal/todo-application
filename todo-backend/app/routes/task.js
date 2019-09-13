const express = require('express');
const taskController = require("../controllers/taskController");
const appConfig = require("../../config/appConfig")

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;

    app.post(`${baseUrl}/tasks/create`, taskController.createTask);
    /**
     * @apiGroup Task
     * @apiVersion  1.0.0
     * @api {post} /api/v1/tasks/create api for creating a new task.
     *
     * @apiParam {string} taskName task name. (body params) (required)
     * @apiParam {boolean} isPrivate is task private?. (body params) (required)
     * @apiParam {string} creatorId task creator's name. (body params) (required)
     * @apiParam {string} createdBy admin's email. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Task created successfully!",
            "status": 200,
            "data": {
                "taskId": "so_pL1zQp",
                "taskName": "Study",
                "isPrivate": true,
                "creatorId": "P5zc6a_XT",
                "createdBy": "Vaibhav Udaywal",
                "createdOn": "2019-09-12T12:22:20.000Z",
            }
        }
    */

    app.get(`${baseUrl}/tasks/all/private/:activeUserId`, taskController.getAllUserPrivateTasks);
     /**
     * @apiGroup Task
     * @apiVersion  1.0.0
     * @api {get} /api/v1/tasks/all/private/:activeUserId api for getting private tasks.
     *
     * @apiParam {string} activeUserId user id. (url params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Private Tasks found!",
            "status": 200,
            "data": [
                {
                    "taskId": "so_pL1zQp",
                    "taskName": "Study",
                    "isPrivate": true,
                    "creatorId": "P5zc6a_XT",
                    "createdBy": "Vaibhav Udaywal",
                    "_id": "5d7a387ccb0b6813e4b55712",
                    "createdOn": "2019-09-12T12:22:20.000Z",
                    "__v": 0
                }
            ]
        }
    */

    app.get(`${baseUrl}/tasks/all/public/:activeUserId`, taskController.getAllUserPublicTasks);
     /**
     * @apiGroup Task
     * @apiVersion  1.0.0
     * @api {get} /api/v1/tasks/all/public/:activeUserId api for getting public tasks.
     *
     * @apiParam {string} activeUserId user id. (url params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Public Tasks found!",
            "status": 200,
            "data": [
                {
                    "taskId": "Io_pG6zQp",
                    "taskName": "Gym",
                    "isPrivate": false,
                    "creatorId": "P5zc6a_XT",
                    "createdBy": "Vaibhav Udaywal",
                    "_id": "5d7a387ccb0b6813e4b55712",
                    "createdOn": "2019-09-8T12:22:20.000Z",
                    "__v": 0
                }
            ]
        }
    */

    app.get(`${baseUrl}/tasks/view/:taskId`, taskController.viewTask);
     /**
     * @apiGroup Task
     * @apiVersion  1.0.0
     * @api {get} /api/v1/tasks/all/public/:activeUserId api for getting public tasks.
     *
     * @apiParam {string} taskId task id. (url params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Task found!",
            "status": 200,
            "data": [
                {
                    "taskId": "so_pL1zQp",
                    "taskName": "Study",
                    "isPrivate": true,
                    "creatorId": "P5zc6a_XT",
                    "createdBy": "Vaibhav Udaywal",
                    "_id": "5d7a387ccb0b6813e4b55712",
                    "createdOn": "2019-09-12T12:22:20.000Z",
                    "__v": 0
                }
            ]
        }
    */

    app.get(`${baseUrl}/tasks/delete/:taskId`, taskController.deleteTask);
     /**
     * @apiGroup Task
     * @apiVersion  1.0.0
     * @api {get} /api/v1/tasks/delete/:taskId api to delete a task.
     *
     * @apiParam {string} taskId task id. (url params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Task deleted succesfully!",
            "status": 200,
            "data": {
                "taskId": "so_pL1zQp",
                "taskName": "Study",
                "isPrivate": true,
                "creatorId": "P5zc6a_XT",
                "createdBy": "Vaibhav Udaywal",
                "_id": "5d7a387ccb0b6813e4b55712",
                "createdOn": "2019-09-12T12:22:20.000Z",
                "undoCounts": 0,
                "__v": 0
            }
        }
    */

    app.post(`${baseUrl}/items/create`, taskController.createItem);
     /**
     * @apiGroup Item
     * @apiVersion  1.0.0
     * @api {post} /api/v1/items/create api for creating a new item in a task.
     *
     * @apiParam {string} parentId task id. (body params) (required)
     * @apiParam {string} itemName item name. (body params) (required)
     * @apiParam {string} itemCreatorId item creator's id. (body params) (required)
     * @apiParam {string} itemCreatorBy item creator's name. (body params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Item created successfully!",
            "status": 200,
            "data": {
                "parentId": "so_pL1zQp",
                "itemId": "TubeNGPuB",
                "itemName": "Vaibhav Udaywal",
                "itemCreatorId": "P5zc6a_XT",
                "itemCreatorBy": "Vaibhav Udaywal",
                "itemCreatedOn": "2019-09-12T12:42:57.000Z"
            }
        }
    */

    app.get(`${baseUrl}/items/view/:taskId`, taskController.viewItem);
     /**
     * @apiGroup Item
     * @apiVersion  1.0.0
     * @api {get} /api/v1/items/view/:taskId api for getting items of a task.
     *
     * @apiParam {string} taskId task id. (url params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "item found!",
            "status": 200,
            "data": [
                {
                    "parentId": "so_pL1zQp",
                    "itemId": "TubeNGPuB",
                    "itemName": "Vaibhav Udaywal",
                    "itemCreatorId": "P5zc6a_XT",
                    "itemCreatorBy": "Vaibhav Udaywal",
                    "itemCreatedOn": "2019-09-12T12:42:57.000Z",
                    "_id": "5d7a3d51bc44c512f05732cf",
                    "__v": 0
                }
            ]
        }
    */

    app.get(`${baseUrl}/items/delete/:itemId`, taskController.deleteItem);
    /**
     * @apiGroup Task
     * @apiVersion  1.0.0
     * @api {get} /api/v1/items/delete/:itemId api to delete a item.
     *
     * @apiParam {string} itemId item id. (url params) (required)
     *
     * @apiSuccess {object} apiResponse shows error, message, status, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Item deleted!",
            "status": 200,
            "data": {
                "parentId": "so_pL1zQp",
                "itemId": "TubeNGPuB",
                "itemName": "Vaibhav Udaywal",
                "itemCreatorId": "P5zc6a_XT",
                "itemCreatorBy": "Vaibhav Udaywal",
                "itemCreatedOn": "2019-09-12T12:42:57.000Z",
                "_id": "5d7a3d51bc44c512f05732cf",
                "__v": 0
            }
        }
    */

}

module.exports = {
    setRouter: setRouter
}