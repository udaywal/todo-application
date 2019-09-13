const socketio = require('socket.io');

const tokenLib = require("./tokenLib.js");

let setServer = (server) => {

    let allOnlineUsers = []

    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection',(socket) => {

        console.log("on connection--emitting verify user");

        socket.emit('verify-user', "");

        socket.on('set-user', (authToken) => {
            console.log("set-user called")
            tokenLib.verifyClaimWithoutSecret(authToken, (err,user)=>{
                if(err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                } else {
                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    console.log(`${fullName} is online`);
                    //socket.emit(currentUser.userId,"You are online")
                    let userObj = {userId:currentUser.userId,fullName:fullName}
                    allOnlineUsers.push(userObj)
                    //socket.broadcast.emit('online-user-list', result);
                    console.log(allOnlineUsers)
                }
            })
        })

        socket.on('notify-updates', (notificationData) => {
            console.log("socket notify-updates called")
            console.log(notificationData);
            socket.broadcast.emit(notificationData.creatorId, notificationData);
        })

        socket.on('notify-friends-updates', (notificationData) => {
            console.log("socket notify-friends-updates called")
            console.log(notificationData);
            socket.broadcast.emit(notificationData.receiverId, notificationData);
        })

        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel
            console.log("user is disconnected");
            // console.log(socket.connectorName);
            console.log(socket.userId);
            var removeIndex = allOnlineUsers.map(function(user) { return user.userId; }).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex,1)
            console.log(allOnlineUsers)
        }) // end of on disconnect
    })

}

module.exports = {
    setServer: setServer
}