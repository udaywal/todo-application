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
const FriendModel = require('../models/Friend')

/*---------------------------------------------------------------------------------------------
# FRIEND - Get all user API
----------------------------------------------------------------------------------------------*/

let getAllUsers = (req, res) => {
    UserModel.find((err, allUsers) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to get user details!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(allUsers)) {
            let apiResponse = response.generate(true, 'No user details found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details found!', 200, allUsers)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# FRIEND - Send Friend Request API
----------------------------------------------------------------------------------------------*/

let sendFriendRequest = (req, res) => {
    FriendModel.find({$and:[{senderId:req.body.senderId},{receiverId: req.body.receiverId}]}, (err, retrievedDetails) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to search in friends!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(retrievedDetails)) {
            FriendModel.find({$and:[{senderId:req.body.receiverId},{receiverId: req.body.senderId}]}, (err, retrievedDetailsNew) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to search in friends!', 500, err)
                    res.send(apiResponse)
                } else if (checkLib.isEmpty(retrievedDetailsNew)) {
                    let newFriend = new FriendModel({
                        friendId: shortid.generate(),
                        senderId: req.body.senderId,
                        senderName: req.body.senderName,
                        receiverId: req.body.receiverId,
                        receiverName: req.body.receiverName,
                        createdOn: timeLib.now()
                    })
                    newFriend.save((err, result) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'Failed to make friend request', 500, err)
                            res.send(apiResponse)
                        } else {
                            let resultObj = result.toObject()
                            delete resultObj.__v
                            delete resultObj._id
                            let apiResponse = response.generate(false, 'Friend request sent successfully!', 200, resultObj)
                            res.send(apiResponse)
                        }
                    })
                } else {
                    let apiResponse = response.generate(true, 'You guys are already friends :)', 400, null)
                    res.send(apiResponse)
                }
            })
        } else {
            let apiResponse = response.generate(true, 'You guys are already friends :)', 400, null)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# FRIEND - Get all friends API
----------------------------------------------------------------------------------------------*/

let getAllFriends = (req, res) => {
    FriendModel.find({$or : [{senderId:req.params.activeUserId},{receiverId:req.params.activeUserId}]}, (err, allFriends) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to find friends!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(allFriends)) {
            let apiResponse = response.generate(true, 'No Friends, send friend requests now!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Friends found!', 200, allFriends)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# FRIEND - Accept Friend Request API
----------------------------------------------------------------------------------------------*/

let acceptRequest = (req,res) => {
    FriendModel.update({friendId:req.params.friendId}, {isAccepted:true}, { multi: true }, (err,result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to accept request!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No request found!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Request accepted!', 200, result)
            res.send(apiResponse)
        }
    })
}

/*---------------------------------------------------------------------------------------------
# FRIEND - Reject Friend Request API
----------------------------------------------------------------------------------------------*/

let rejectRequest = (req,res) => {
    FriendModel.findOneAndRemove({friendId:req.params.friendId}, (err,result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to reject request!', 500, err)
            res.send(apiResponse)
        } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No request found!', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Request deleted!', 200, result)
            res.send(apiResponse)
        }
    })
}

module.exports = {
    getAllUsers:getAllUsers,
    sendFriendRequest:sendFriendRequest,
    getAllFriends:getAllFriends,
    acceptRequest:acceptRequest,
    rejectRequest:rejectRequest
}