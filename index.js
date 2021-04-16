const express = require('express');
const path    = require('path');
require('dotenv').config();

//APP DE EXPRESS
const app     = express();

//NODE sERVE
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets');

    


const publicPath = path.resolve(__dirname, 'public');

app.use( express.static(publicPath));


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log('El servidor encontro el puerto', process.env.PORT)
})