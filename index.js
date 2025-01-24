const SMTPServer = require("smtp-server").SMTPServer

//we will have to set configuration below, it requires some callbacks
const server = new SMTPServer({
    allowInsecureAuth : true,
    authOptional : true,

    onConnect(session, cb){
        //for debugging
        console.log("onConnect", session.id);
        //we can either accept or reject this 
        // on accepting this connection
        cb()
    },

    onMailFrom(address, session, cb){
        //for debugging
        console.log("onMailFrom", address.address, session.id);
        cb()
    },

    onRcptTo(address, session, cb){
        //for debugging
        console.log("onRcptTo", address.address, session.id);
        cb()
    },

    onData(stream, session, cb){
        //whenever we have data on the stream then, that data can be printed on the console (in reality we will be storing this data in our database)
        stream.on("data", (data) => console.log(`onData ${data.toString()}`))
        //after accepting the data callback will be fired informing that the data has been well received
        stream.on('end', cb)
    }
})


server.listen(25, ()=> console.log('Server is running on 25'))