const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    socket.on("update item", (arg1, arg2, callback) => {
      console.log(arg1); // 1
      console.log(arg2); // { name: "updated" }
      callback({
        status: "ok"
      });
    });
});
  


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(` server running ${port}`);
});