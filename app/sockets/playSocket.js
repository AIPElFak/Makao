import Games from '../Redis/Games';

module.exports = function (socket) {
    var socketUser = socket.decoded_token.name;
    console.log('user ' + socketUser + ' connected to playSocket');

    socket.on('game:create', (rules) => {
        let creator = socketUser;
        Games.storeGame(creator, rules)
            .then(() => socket.emit('game:created', { creator, rules }))
            .catch((reason) => socket.emit('game:failed', reason));
    });

    socket.on('disconnect', () => {
        console.log('user ' + socketUser + ' disconnected from playSocket');
    });
};