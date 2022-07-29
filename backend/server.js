const http = require('http');
const app = require('./app');

const dotenv=require('dotenv');
const { prototype } = require('events');
const { debug } = require('console');
const { type } = require('os');
dotenv.config({path: 'config.env'});

/*
const normalizePort = val => {
    var port = parseInt(val, 10);

    if(!isNaN(port)) {
        return val;
    }
    if(port>=0){
        return port;
    }
    return false;
}

const onError = error => {
    if (error.syscall !== "Listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
    switch(error.code) {
        case "EACCES":
            console.error(bind + "require elevated privlleges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;    
        default:
            throw error;    
    }
}

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
    debug("Listening on "+ bind)
}

const PORT = normalizePort(process.env.PORT || 3000);*/
//app.set('port', PORT);
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
//server.on("error",onError);
//server.on("Listening", onListening);
server.listen(PORT,()=>{console.log(`app is running on http://localhost:${PORT}`)});