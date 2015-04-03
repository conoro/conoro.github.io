As with Node 0.12.0 and 0.12.1, there are no-precompiled ARM versions of [0.12.2](http://blog.nodejs.org/2015/03/31/node-v0-12-2-stable/) on the main site.

![Node.js](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2015/02/nodejs.jpg)

I've built for [Pi 1 (ARM v6)](http://conoroneill.net.s3.amazonaws.com/wp-content/uploads/2015/04/node-v0.12.2-linux-arm-pi.tar.gz) and [ODROID-C1/Pi2 (ARM v7)](http://conoroneill.net.s3.amazonaws.com/wp-content/uploads/2015/04/node-v0.12.2-linux-arm-v7.tar.gz). The latter was built on an [ODROID-C1](http://www.hardkernel.com/main/products/prdt_info.php?g_code=G141578608433) and it seems to run fine on the Pi 2 since both are ARM v7. It took 1 hr 15 mins to compile compared to 4+ hrs on the Pi 1.

"make test" on the ODROID gave the same results as on the Pi 1: [10:33|% 100|+ 784|-   4]: Done
