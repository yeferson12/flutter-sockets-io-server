const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addaband( new Band('camilo'));
bands.addaband( new Band('andres cepeda'));
bands.addaband( new Band('kurt'));
bands.addaband( new Band('morat'));
//MENSAJES DE SOCKETS
io.on('connection', client => {
    console.log('cliente Conectado')

    client.emit('active-bands', bands.getBands());
    

    client.on('disconnect', () => { 
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) =>{
        console.log('Mensaje!!!',payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});//emite un mensaje a todos los clientes conectados 
    });

    client.on('vote', (payload) =>{
       bands.voteBand(payload.id);
       io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) =>{
        const newBand = new Band(payload.name);
        bands.addaband(newBand);
        io.emit('active-bands', bands.getBands());
     });

     client.on('delete-band', (payload) =>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
     });

    // client.on('emitir-mensaje', (payload) =>{
    //     client.broadcast.emit('nuevo-mensaje',payload); //con client.broadcast.emit emite atoos menos al que emite
    // });
  });
