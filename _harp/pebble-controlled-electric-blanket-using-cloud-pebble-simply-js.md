Messing with hardware and software can be both a joy and incredibly infuriating. Yesterday I spent a few intermittent hours trying to get Arduino and Espruino communicating reliably over NRF24L01+ wireless transceivers. I only half succeeded. I followed this with some reading up on both [CloudPebble](https://cloudpebble.net) and [Simply.js](http://simplyjs.io/). Literally 5 minutes later I had my first Pebble App installed on my watch and was remotely controlling the [electric blanket in our bed](http://conoroneill.net/our-web-and-mobile-enabled-electric-blanket-using-electric-irelands-efergy-rc-sockets).

![Bandon Blanket](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/04/pebble_blanket.jpg "Bandon Bed Button")

CloudPebble is a web-based IDE for building Pebble Apps. I believe it was started independently but is now run by [Pebble](http://getpebble.com) themselves. Simply.js is a library/SDK for building Pebble Apps using only JavaScript. Pebble recently announced that CloudPebble now supports Simply.js and boy they weren't kidding. It's now childsplay to build Pebble Apps.

This is how quickly I built the App:

* Create a free Pebble [Developer account](https://developer.getpebble.com/) 
* Login to CloudPebble using your Pebble credentials
* Create a project and pick Simply.js as the type
* You automatically get the sample Simply.js App in the IDE
* Compile that and send it to your Watch. You of course need the Pebble App on your phone with developer options enabled. The Pebble App will also tell you your phone's IP address which CloudPebble may ask for.
* I've found that I can't install from desktop but if I load the IDE URL on my phone I can do it from there. I assume this is because I'm on house wifi and behind a firewall with a private IP.

That first App looks like this:

```javascript
console.log('Simply.js demo!');

simply.on('singleClick', function(e) {
  console.log(util2.format('single clicked $button!', e));
  simply.subtitle('Pressed ' + e.button + '!');
});

simply.on('longClick', function(e) {
  console.log(util2.format('long clicked $button!', e));
  simply.vibe();
  simply.scrollable(e.button !== 'select');
});

simply.on('accelTap', function(e) {
  console.log(util2.format('tapped accel axis $axis $direction!', e));
  simply.subtitle('Tapped ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
});

simply.setText({
  title: 'Simply Demo!',
  body: 'This is a demo. Press buttons or tap the watch!',
}, true);
```


And it you read the Simply.js site, you can access URLs like this:

```javascript
ajax({ url: 'http://simplyjs.io' }, function(data){
  var headline = data.match(/<h1>(.*?)<\/h1>/)[1];
  simply.title(headline);
});
```

Merge the two together and ta-daaaaa, the Bandon Bed Button Pebble App.


```javascript
console.log('Bandon Bed Button!');

simply.on('singleClick', function(e) {
  console.log(util2.format('single clicked $button!', e));
  if (e.button == "up"){
    ajax({ url: 'http://url-of-conors-thing-to-turn-on' }, function(data){
      simply.subtitle('Turned on Blanket!');  
    });    
  } else if (e.button == "down"){
    ajax({ url: 'http://url-of-conors-thing-to-turn-off' }, function(data){
      simply.subtitle('Turned off Blanket!');  
    });        
  }
});

simply.setText({
  title: 'Bandon Bed Button!',
  body: 'Press Up to turn on the blanket. Press Down to turn off the blanket.',
}, true);
```


Just in case the data route for this is not clear, here's what it looks like:

![From Pebble to Switch](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/04/pebble_data_flow.png "Pebble Data Flow")


I referred to this on Twitter last night as The Internet of Thangs. I'm already sick of The Internet of Things. The IoT hype cycle is completely out of control before the first killer apps/products have even been created. Big Data has become Big Bullshit. I sincerely hope that the winner in this area hasn't even incorporated as a business yet. If we leave it to Google, Cisco, GE or any of the other behemoths, we'll end up with whatever they read in the last Suarez book rather than something that is a fundamental change in how we benefit from technology. The Pebble is never going to end up on everyone's wrists but by providing simple tools that any idiot like me can play with, it could be the seed that eventually leads to something huge. cf Altair, ZX Spectrum, BBC Micro, ARM, Arduino, Raspberry Pi.

