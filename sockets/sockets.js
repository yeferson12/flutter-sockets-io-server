const {io} = require('../index');

//MENSAJES DE SOCKETS
io.on('connection', client => {
    console.log('cliente Conectado')
    client.on('disconnect', () => { console.log('cliente desconectado')});

    client.on('mensaje', (payload) =>{
        console.log('Mensaje!!!',payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});//emite un mensaje a todos los clientes conectados 
    });
  });
