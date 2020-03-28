let io;

const connect = (app) => {
    const server = require('http').createServer(app);
    io = require('socket.io')(server);
    io.on('connection', (socket) => {
        
        socket.on('disconnect', function(){
            
        });
       
        socket.on('new-user', (name) => {
          io.emit('new-user',name)
        });
        
    });
    return server;
}

module.exports = {
    connect,
    io
}
