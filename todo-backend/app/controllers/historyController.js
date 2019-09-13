const mongoose = require('mongoose');
const response = require('../libs/responseLib')
const check = require('../libs/checkLib')
const shortid = require('shortid');
const time = require('../libs/timeLib');

const HistoryModel = require('../models/History')
const ItemModel = require('../models/Item')

/*---------------------------------------------------------------------------------------------
# HISTORY - Add history API
----------------------------------------------------------------------------------------------*/

let addHistory = (req, res) => {
    let findItems = (req, res) => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ itemId: req.body.itemId })
            .select()
            .lean()
            .exec((err, ItemDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 'History - Failed To Find Items', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(ItemDetails)) {
                    let apiResponse = response.generate(true, 'History - No Item Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'History - Item Found', 200, ItemDetails)
                    resolve(ItemDetails)
                }
            })
        })
    }
 
    let updateHistory = (ItemDetails) => {
        return new Promise((resolve, reject) => {
            let newHistory = new HistoryModel({
                historyId: shortid.generate(),
                taskId: req.body.taskId,
                itemId: req.body.itemId,
                key: req.body.key,
                createdOn: time.now(),
            })
            newHistory.itemValues = ItemDetails
            newHistory.save((err, newItem) => {
                if (err) {
                    let apiResponse = response.generate(true, 'History - Failed to add Item', 500, null)
                    reject(apiResponse)
                } else {
                    let newItemObj = newItem.toObject();
                    resolve(newItemObj)
                }
            })
        })
    }

    findItems(req, res)
        .then(updateHistory)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'History Added', 200, resolve)
            res.send(apiResponse)
        }).catch((err) => {
            res.send(err);
        })

}

/*---------------------------------------------------------------------------------------------
# HISTORY - Get history API
----------------------------------------------------------------------------------------------*/

let getHistory = (req, res) => {

    let findHistory = () => {
        return new Promise((resolve, reject) => {
            HistoryModel.find({ 'taskId': req.body.taskId })
            .select()
            .lean()
            .exec((err, HistoryDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 'History - Failed To Find history', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(HistoryDetails)) {
                    let apiResponse = response.generate(true, 'History - No History Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'History - History Found', 200, HistoryDetails)
                    resolve(apiResponse)
                }
            })
        })
    }

    findHistory(req, res)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'History Deleted', 200, resolve)
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err);
        })

}

/*---------------------------------------------------------------------------------------------
# HISTORY - Delete history API
----------------------------------------------------------------------------------------------*/

let deleteHistory = (req, res) => {
    HistoryModel.remove({taskId: req.body.taskId}, (err, result)=>{
        if (err) {
            let apiResponse = response.generate(true, 'Failed delete history', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No history found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'History deleted!', 200, result)
            res.send(apiResponse)
        }
    })
}

module.exports = {
    addHistory: addHistory,
    deleteHistory: deleteHistory,
    getHistory: getHistory
}