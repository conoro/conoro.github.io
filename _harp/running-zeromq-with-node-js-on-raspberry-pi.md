[ZeroMQ](http://zeromq.org/) is a lightweight messaging library and looks ideal for lower powered devices like the RPi. Building and running is pretty easy. These are really just notes for myself for future reference.

I don't actually need a messaging system yet but I wanted to play around with one. Running a simple Request / Reply setup with Node.js on both Windows 10 and RPi was interesting. One advantage a message queue gives you over REST is that the receiver can be out of action and still get all transmitted messages when it recovers. You also have things like Pub/Sub etc. I've been running the code [from here](http://blog.rastating.com/using-zeromq-with-node-js/) 100% reliably for two days now on both setups. At some point I'll check max throughput on a Pi.

Installation on Raspberry Pi:

```bash
cd
sudo apt-get install libtool pkg-config build-essential autoconf automake
mkdir build
cd build/
wget https://download.libsodium.org/libsodium/releases/libsodium-1.0.3.tar.gz
tar -zxvf libsodium-1.0.3.tar.gz
cd libsodium-1.0.3/
./configure
make
sudo make install
cd ..
wget http://download.zeromq.org/zeromq-4.1.3.tar.gz
tar -zxvf zeromq-4.1.3.tar.gz
cd zeromq-4.1.3/
./configure
make
sudo make install
sudo ldconfig
```

Test code for Request / Reply [from here](http://blog.rastating.com/using-zeromq-with-node-js/):

server.js:
```javascript
var zmq = require("zmq");  
var socket = zmq.socket("req");  
var counter = 0;

// Just a helper function for logging to the console with a timestamp.
function logToConsole (message) {  
    console.log("[" + new Date().toLocaleTimeString() + "] " + message);
}

function sendMessage (message) {  
    logToConsole("Sending: " + message);
    socket.send(message);
}

// Add a callback for the event that is invoked when we receive a message.
socket.on("message", function (message) {  
    // Convert the message into a string and log to the console.
    logToConsole("Response: " + message.toString("utf8"));
});

// Begin listening for connections on all IP addresses on port 9998.
socket.bind("tcp://*:9998", function (error) {  
    if (error) {
        logToConsole("Failed to bind socket: " + error.message);
        process.exit(0);
    }
    else {
        logToConsole("Server listening on port 9998");

        // Increment the counter and send the value to the clients every second.
        setInterval(function () { sendMessage(counter++); }, 1000);
    }
});
```

client.js:
```javascript
var zmq = require("zmq");  
var socket = zmq.socket("rep");

// Just a helper function for logging to the console with a timestamp.
function logToConsole (message) {  
    console.log("[" + new Date().toLocaleTimeString() + "] " + message);
}

// Add a callback for the event that is invoked when we receive a message.
socket.on("message", function (message) {  
    // Convert the message into a string and log to the console.
    logToConsole("Received message: " + message.toString("utf8"));

    // Send the message back aa a reply to the server.
    socket.send(message);
});

// Connect to the server instance.
socket.connect('tcp://127.0.0.1:9998');  
```
