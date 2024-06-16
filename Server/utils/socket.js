const {getUsers, users} = require('./getUsers');


function socket(io) {
    io.on('connection', (socket) => {

        socket.on('joined-user', (data) =>{
            
            var user = {};
            user[socket.id] = data.username;
            if(users[data.roomname]){
                users[data.roomname].push(user);
            }
            else{
                users[data.roomname] = [user];
            }
            

            socket.join(data.roomname);

            
            io.to(data.roomname).emit('joined-user', {username: data.username});

            
            io.to(data.roomname).emit('online-users', getUsers(users[data.roomname]))
        })

        socket.on('recall', (data) => {
            var rooms = Object.keys(socket.rooms);
            var socketId = rooms[0];
            io.to(socketId).emit('chat', {username: data.username, message: data.message});
        })
        
        socket.on('chat', (data) =>{
            io.to(data.roomname).emit('chat', {username: data.username, message: data.message});
        })

        
        socket.on('typing', (data) => {
            socket.broadcast.to(data.roomname).emit('typing', data.username)
        })

        
        socket.on('disconnecting', ()=>{
            var rooms = Object.keys(socket.rooms);
            var socketId = rooms[0];
            var roomname = rooms[1];
            if(users[roomname]) {
                users[roomname].forEach((user, index) => {
                    if(user[socketId]){
                        users[roomname].splice(index, 1)
                    }
                });
            }
            
            io.to(roomname).emit('online-users', getUsers(users[roomname]))
        })
    })
}

module.exports = socket;