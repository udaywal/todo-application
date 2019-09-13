const mongoose = require('mongoose');

const response = require('../libs/responseLib')
const paramsValidationLib = require('../libs/paramsValidationLib')
const checkLib = require('../libs/checkLib')
const passwordLib = require('../libs/generatePasswordLib')
const timeLib = require('../libs/timeLib')
const tokenLib = require('../libs/tokenLib')
const emailLib = require('../libs/emailLib')

const shortid = require('shortid')

const TaskModel = require('../models/Task')
const ItemModel = require('../models/Item')

/*---------------------------------------------------------------------------------------------
# TASK - Get all Private Tasks API
----------------------------------------------------------------------------------------------*/

let getAllUserPrivateTasks = (req, res) => {
    TaskModel.find({ creatorId: req.params.activeUserId, isPrivate: true }, (err, userTasks) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to find private tasks!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(userTasks)) {
            let apiResponse = response.generate(true, 'No private tasks found!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Private Tasks found!', 200, userTasks)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# TASK - Get all Public Tasks API
----------------------------------------------------------------------------------------------*/

let getAllUserPublicTasks = (req, res) => {
    TaskModel.find({ creatorId: req.params.activeUserId, isPrivate: false }, (err, userTasks) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to find public tasks!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(userTasks)) {
            let apiResponse = response.generate(true, 'No public tasks found!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Public tasks found!', 200, userTasks)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# TASK - Create a task API
----------------------------------------------------------------------------------------------*/

let createTask = (req, res) => {
    let newTask = new TaskModel({
        taskId: shortid.generate(),
        taskName: req.body.taskName,
        isPrivate: req.body.isPrivate,
        creatorId: req.body.creatorId,
        createdBy: req.body.createdBy,
        createdOn: timeLib.now(),
    })
    newTask.save((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to create task', 500, err)
            res.send(apiResponse)
        } else {
            let resultObj = result.toObject()
            delete resultObj.__v
            delete resultObj._id
            let apiResponse = response.generate(false, 'Task created successfully!', 200, resultObj)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# TASK - View task API
----------------------------------------------------------------------------------------------*/

let viewTask = (req, res) => {
    TaskModel.find({ taskId: req.params.taskId }, (err, viewTask) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to find task!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(viewTask)) {
            let apiResponse = response.generate(true, 'No task found, create one now!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Task found!', 200, viewTask)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# TASK - Delete a task API
----------------------------------------------------------------------------------------------*/

let deleteTask = (req, res) => {
    TaskModel.findOneAndRemove({ taskId: req.params.taskId }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to delete task', 500, err);
            res.send(apiResponse);
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Task not found', 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'Task deleted succesfully!', 200, result);
            res.send(apiResponse);
        }
    })
}

/*---------------------------------------------------------------------------------------------
# TASK - Add an item API
----------------------------------------------------------------------------------------------*/

let createItem = (req, res) => {
    let newItem = new ItemModel({
        parentId: req.body.parentId,
        itemId: shortid.generate(),
        itemName: req.body.itemName,
        itemCreatorId: req.body.itemCreatorId,
        itemCreatorBy: req.body.itemCreatorBy,
        itemCreatedOn: timeLib.now(),
    })
    newItem.save((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to create item', 500, err)
            res.send(apiResponse)
        } else {
            let resultObj = result.toObject()
            delete resultObj.__v
            delete resultObj._id
            let apiResponse = response.generate(false, 'Item created successfully!', 200, resultObj)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# TASK - View items API
----------------------------------------------------------------------------------------------*/

let viewItem = (req, res) => {
    ItemModel.find({ parentId: req.params.taskId }, (err, viewItem) => {
        if (err) {
            let apiResponse = response.generate(true, 'failed to find item!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(viewItem)) {
            let apiResponse = response.generate(true, 'No item found, create one now!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'item found!', 200, viewItem)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# TASK - Delete an item API
----------------------------------------------------------------------------------------------*/

let deleteItem = (req, res) => {
    ItemModel.findOneAndRemove({ itemId: req.params.itemId }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to delete item!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No item found!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Item deleted!', 200, result)
            res.send(apiResponse)
        }
    })
}

module.exports = {
    getAllUserPrivateTasks: getAllUserPrivateTasks,
    getAllUserPublicTasks: getAllUserPublicTasks,

    createTask: createTask,
    viewTask: viewTask,
    deleteTask: deleteTask,

    createItem: createItem,
    viewItem: viewItem,
    deleteItem: deleteItem
}