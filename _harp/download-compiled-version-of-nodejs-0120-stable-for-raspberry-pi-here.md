Unfortunately the [0.12.0 release](http://blog.nodejs.org/2015/02/06/node-v0-12-0-stable/) of Node won't compile on a non-V2 Raspberry Pi so I took a patch from [io.js](http://iojs.org) and was able to build it.

![Node.js](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2015/02/nodejs.jpg)

The problem is due to recent releases of Raspbian mis-identifying the ARM version so Node tries to build for V7 instead of V6. These [two](https://github.com/bnoordhuis/io.js/commit/6f7494292e22b1f1050abeaa43f257ac466edf2b) [changes](https://github.com/bnoordhuis/io.js/commit/8afcc5e701538e5a442a0334d781eac202cc4e1d) from this [io.js thread](https://github.com/iojs/io.js/issues/283) sort it out.

It took a lonnnngggg time to build directly on my RPi Model B+.

[Download here](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2015/02/node-v0.12.0-linux-arm-pi.tar.gz) and enjoy.

```javascript
wget https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2015/02/node-v0.12.0-linux-arm-pi.tar.gz
tar -zxvf node-v0.12.0-linux-arm-pi.tar.gz
cd node-v0.12.0-linux-arm-pi
sudo cp -R * /usr/local/
```
Works perfectly for [Harp.js](http://harpjs.com/), including the ever-problematic node-sass with its native bits.
