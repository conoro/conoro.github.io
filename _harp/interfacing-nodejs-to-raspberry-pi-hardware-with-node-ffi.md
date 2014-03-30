Now that I can talk to the Efergy remote control switches using Arduino and [DigiX](http://digistump.com/products/50), it's time to do the same thing with Raspberry Pi and Node.js.

But first, check out this gorgeous [Pimoroni Pibow Timber](http://shop.pimoroni.com/products/pibow-timber) case that the RPi now lives in. Makes me smile every time I look at it.

![Pibow](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/03/pibow_timber.jpg "Pibow Timber Raspberry Pi case")

Start by plugging in one of the Efergy switches and using its remote control to set its code. Use the sniffer program from [the last post](http://conoroneill.net/our-web-and-mobile-enabled-electric-blanket-using-electric-irelands-efergy-rc-sockets) to find out what that code is.

Connecting the 433MHz transmitter to the RPi is dead easy. Connect GND to pin 6, VCC to PIN 1 and DATA to PIN 11. More details on the [WiringPi Pinout](https://projects.drogon.net/raspberry-pi/wiringpi/pins/). For our purposes: BCM GPIO 17 == WiringPi 0 == Pin 11 == GPIO #0


The simplest way of doing this is to create a command-line program in C or C++ and then shell out to it in Node. But where's the fun in that? The core approach I decided to use was via a Node module called [Node FFI](https://github.com/rbranson/node-ffi/wiki/Node-FFI-Tutorial) which makes it relatively easy to call out to C libraries from Node. The alternative is to build a Node module in C++. But that wasn't going to work, given that I haven't written a line of C++ in my life, after the trauma of doing a training course in it in the late 90s and seeing the horror inflicted on my beloved C.

Unfortunately I quickly realised that node-ffi only does C whilst the [RCSWitch-Pi](https://github.com/r10r/rcswitch-pi/) library is C++ (but the [WiringPi library](https://projects.drogon.net/raspberry-pi/wiringpi/functions/) under that is C again!). 

An abortive attempt at using [ffi-generate](https://github.com/tjfontaine/node-ffi-generate) went nowhere as it wouldn't even run on the RPi due to some libclang problem. Running in an Ubuntu VM worked after a lot of llvm messing but I couldn't make any sense of the output.

Cue a lonnnngggg session Googling how to interface C to C++ and realising that I hate C++ even more now :-) Eventually I found an [idiot's guide to wrapping C++](http://www.teddy.ch/c++_library_in_c/) so it can be called by C. Bit by bit I figured it all out but hit a brick wall at one point. This forced me to use the GDB debugger for the first time in 15 years. Luckily I spotted the problem using GDB in about a minute flat and got a test C program working which would call the C++ functions correctly. 

Then it was back to Node.js and node-ffi for another round of head scratching and non-stop errors. Finally it all clicked and the Efergy module clicked too!

Now that I have the basics working, I will clean up this code and use it in the Node server that will run on the RPi via the usual exports/require approach. I'll also hopefully be able to apply the same approach to any C++ or C library that accesses any RPi hardware.

The final set of steps are actually quite simple. All the effort was in the learning.


### Install WiringPi
```bash
mkdir ~/gitwork
cd gitwork
git clone git://git.drogon.net/wiringPi
cd wiringPi
./build

### Install RCSwitch-Pi
cd ~/gitwork
git clone https://github.com/r10r/rcswitch-pi.git
cd rcswitch-pi
make
```

### Build an RCSwitch-Pi library
```bash
gcc -shared -fpic RCSwitch.cpp -o libRCSwitch.so
```

### Simple C++ test to make sure you can talk to Efergy
```bash
cd ~/gitwork/rcswitch-pi
```

Create a file called efergy.cpp with the following contents
```c
#include "RCSwitch.h"
#include <stdlib.h>
#include <stdio.h>

int main(int argc, char *argv[]) {

    /*
     output PIN is hardcoded for testing purposes
     see https://projects.drogon.net/raspberry-pi/wiringpi/pins/
     for pin mapping of the raspberry pi GPIO connector
     */
    int PIN = 0;
    int unitCode = atoi(argv[1]);

    if (wiringPiSetup () == -1) return 1;
        printf("sending unitCode[%i]\n", unitCode);
        RCSwitch mySwitch = RCSwitch();
        mySwitch.enableTransmit(PIN);

        mySwitch.send(unitCode,24);

        return 0;
}
```

Now compile and run it:

```bash
g++ -c -o efergy.o efergy.cpp
g++ RCSwitch.o efergy.o -o efergy -lwiringPi
sudo ./efergy 109011
sudo ./efergy 109019
```

If all is working ok, the switch will turn on and off.

### Install Node/NPM on Raspberry Pi 
```bash
    cd ~
    sudo mkdir /opt/node
    wget http://nodejs.org/dist/v0.10.23/node-v0.10.23-linux-arm-pi.tar.gz
    tar xvzf node-v0.10.23-linux-arm-pi.tar.gz
    sudo cp -r node-v0.10.2-linux-arm-pi/* /opt/node
    cd ~
    nano .bash_profile
     
    #Add these lines to the file you opened
    PATH=$PATH:/opt/node/bin
    export PATH

    #Save and exit
     
    #Test
    node -v
    npm -v
```

### Wrapping C++ so it can be called by C
Create wrapper.h and wrapper.c

wrapper.h:
```c
#ifndef __MYWRAPPER_H
#define __MYWRAPPER_H

#ifdef __cplusplus
extern "C" {
#endif

  typedef struct RCSwitch RCSwitch;

  RCSwitch* newRCSwitch();

  void RCSwitch_send(RCSwitch* v, unsigned long Code, unsigned int length);

  void RCSwitch_enableTransmit(RCSwitch* v, int nTransmitterPin);

  void deleteRCSwitch(RCSwitch* v);

#ifdef __cplusplus
}
#endif
#endif
```

wrapper.c:
```c

    #include "RCSwitch.h"
    #include "wrapper.h"
    #include <stdio.h>

    extern "C" {
      RCSwitch* newRCSwitch() {
        //printf("Inside newRCSwitch");
        return new RCSwitch();
      }

      void RCSwitch_send(RCSwitch* v, unsigned long Code, unsigned int length) {
        //printf("Inside RCSwitch_send");
        v->send(Code, length);
      }

      void RCSwitch_enableTransmit(RCSwitch* v, int nTransmitterPin) {
        //printf("Inside RCSwitch_enableTransmit");
        v->enableTransmit(nTransmitterPin);
      }

      void deleteRCSwitch(RCSwitch* v) {
        delete v;
      }
    }
```

### Compile everything
Use -g flag everywhere if you want to debug with GDB (gdb efergy2, break main, run 109011, next, next). Simple [GDB Tutorial here](http://web.eecs.umich.edu/~sugih/pointers/summary.html) and some tips on [RPi Forums](http://www.raspberrypi.org/forum/viewtopic.php?f=33&t=15312).

```bash
g++ -g -c wrapper.c -o wrapper.o
gcc -g -c efergy.c -o efergy.o
g++ -shared -fpic -g RCSwitch.cpp -L ./ -l wiringPi -o libRCSwitch.so
g++ -g efergy.o wrapper.o ./libRCSwitch.so -o efergy2
```

### Run the C program
```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:./
sudo ./efergy2 109011
```

Now to get everything running in Node/JavaScript

### Install Node FFI
```bash
sudo npm install -g ffi
```

### Create send.js
```javascript
var ffi = require("ffi")

var libwiringPi = ffi.Library('/usr/local/lib/libwiringPi', {
    'wiringPiSetup' : [ 'int', [] ],
    'digitalWrite' : [ 'void', ['int', 'int'] ],
    'pinMode': [ 'void', ['int', 'int'] ],
    'delayMicroseconds' :  [ 'void', ['int', 'int'] ]
})

var libRCSwitch = ffi.Library('./libwrapper', {
  'newRCSwitch' : ['pointer', [] ],
  'RCSwitch_send': ['void', [ 'pointer', 'int', 'int' ] ],
  'RCSwitch_enableTransmit': ['void', ['pointer', 'int'] ]
})

if (process.argv.length < 3) {
  console.log('Arguments: Efergy Switch Code')
  process.exit()
}

var PIN = 0;
var unitCode = parseInt(process.argv[2]);
var mySwitch = libRCSwitch.newRCSwitch();

if (libwiringPi.wiringPiSetup() == -1){
    return 1;
    printf("Error initialising WiringPi");
}

if (mySwitch.isNull()) {
    console.log("Oh no! Couldn't create object!\n");
} else {
    libRCSwitch.RCSwitch_enableTransmit(mySwitch, PIN);
    libRCSwitch.RCSwitch_send(mySwitch, unitCode, 24);
}
```

### Compile the libraries
```bash
g++ -shared -fpic -g wrapper.c -L ./ -l RCSwitch -o libwrapper.so
g++ -shared -fpic -g RCSwitch.cpp -L ./ -l wiringPi -o libRCSwitch.so
```

### Run send.js
Note that anything which uses WiringPi has to be run sudo. A bit of a pain. Not sure I want to be running the Node process as root?

```bash
sudo env PATH=$PATH LD_LIBRARY_PATH=$LD_LIBRARY_PATH:./ node send.js 109011
```

That's it. You can now turn on and off your Efergy socket using Node. Next up, a simple Node server to handle remote requests to do this.
