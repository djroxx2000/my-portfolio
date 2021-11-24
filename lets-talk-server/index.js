const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const ROOM = process.env.ROOMID || 123;
const nameGenConfig = {
	dictionaries: [adjectives, animals],
	separator: ' ',
	length: 2,
	style: 'capital',
};
const userMap = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
	//Handle 404 errors
	app.get(/.*/, function (_, res) {
		res.status(404).sendFile(__dirname + '/public/pagenotfound.html');
	});
}

app.use(express.static(__dirname + '/public/'));

io.on('connection', (socket) => {
	// Check max capacity
	let initRoom = io.sockets.adapter.rooms.get(ROOM);
	if (initRoom != undefined && Array.from(initRoom).length >= 4) {
		socket.disconnect();
		return;
	}

	// Add socket to room
	socket.join(ROOM);
	const randomName = uniqueNamesGenerator(nameGenConfig);
	console.log(`Incoming user ${socket.id}: ${randomName} connected to room ${ROOM}`);
	userMap[socket.id] = randomName;

	// Room details
	const room = io.sockets.adapter.rooms.get(ROOM);
	const conns = Array.from(room);

	// Welcome new socket to other members
	socket.emit('selfId', { id: socket.id, username: randomName, room: ROOM });
	const users = conns.map((conn) => {
		return {
			id: conn,
			username: userMap[conn],
		};
	});
	socket.emit('curUsers', users);
	socket.to(ROOM).emit('userIn', { id: socket.id, username: userMap[socket.id] });

	// Personal username
	socket.on('usernameChange', (res) => {
		const payload = {
			id: socket.id,
			username: res.username,
		};
		socket.broadcast.to(ROOM).emit('usernameChange', payload);
	});

	// Personal message
	socket.on('userMessage', (res) => {
		let userId = res.receiver;
		socket.to(userId).emit('userMessage', res);
	});

	// Invite another socket by id for a game
	socket.on('gameInvite', (res) => {
		let userId = res.receiver;
		socket.to(userId).emit('gameInvite', res.payload);
	});

	// Alert everyone that someone left
	socket.on('disconnect', (_) => {
		console.log(`${socket.id} left!`);
		io.in(ROOM).emit('userOut', socket.id);
	});
});

server.listen(PORT, () => {
	console.log('Listening on port', PORT);
});

/*

io.on('connect', onConnect);

function onConnect(socket){

  // sending to the client
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // sending to all clients except sender
  socket.broadcast.emit('broadcast', 'hello friends!');

  // sending to all clients in 'game' room except sender
  socket.to('game').emit('nice game', "let's play a game");

  // sending to all clients in 'game1' and/or in 'game2' room, except sender
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // sending to all clients in 'game' room, including sender
  io.in('game').emit('big-announcement', 'the game will start soon');

  // sending to all clients in namespace 'myNamespace', including sender
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // sending to a specific room in a specific namespace, including sender
  io.of('myNamespace').to('room').emit('event', 'message');

  // sending to individual socketid (private message)
  io.to(`${socketId}`).emit('hey', 'I just met you');

  // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
  // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

  // sending with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});

  // sending without compression
  socket.compress(false).emit('uncompressed', "that's rough");

  // sending a message that might be dropped if the client is not ready to receive messages
  socket.volatile.emit('maybe', 'do you really need it?');

  // specifying whether the data to send has binary data
  socket.binary(false).emit('what', 'I have no binaries!');

  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');

  // sending to all connected clients
  io.emit('an event sent to all connected clients');

};

*/
