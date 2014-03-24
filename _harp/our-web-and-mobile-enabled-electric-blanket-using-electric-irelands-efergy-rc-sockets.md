A major ongoing struggle in our household is convincing one of our many children to go upstairs and put on the electric blanket for us. I honestly don't know how we get through the winter.

Wouldn't it be fantastic if we could use technology instead of children to do this?

Last Thursday I came home from work to discover that [Electric Ireland](http://www.electricireland.ie/) had sent us three [Efergy](http://efergy.com/eu/products/remotecontrolledsocket) remote control power sockets and a plugin energy monitor. I have no idea why they did so, apart perhaps from our crazy electricity use.


![Efergy](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/03/efergy01.jpg "Efergy RC Switch")


My mind immediately leaped to our electric blanket conundrum.

A quick look at the label and I was pleased to see they worked at 433Mhz. What were the chances that the [$1.99 wireless modules](http://dx.com/p/433mhz-wireless-transmitter-module-superregeneration-for-arduino-green-149254) I bought from DX in China would work with them? Oh the joy to discover that, not only do the modules work with them, some genius has already built [a powerful Arduino library](https://code.google.com/p/rc-switch/) to do so! 

It turns out that the Efergy brand uses the same simple protocol as a wide range of others around the world. I guess they are all OEMing something.

A 2 minute setup on my Arduino Uno with a receiver and the relevant sniffer code loaded up and I had the 11 codes (5 on, 5 off, 1 all-off) that my specific remote control used. They are all 24bit, protocol "1" with 6 decimal digits like 109223. I assume they distribute a range of remotes to avoid neighbours clashing. The RC switches themselves are not locked to a specific code, they have to be set by the remote control at power up.


2 more minutes to setup a transmitter to cycle between the codes and I was toggling the RC switches on and off. 

I really was gobsmacked how easy it was. It was a lovely reminder of how incredible the internet really is. We've become so used to it, we forget that the above would have taken me months (or never!) in pre-internet days instead of 10 minutes total.

Of course that was just step 1. What I really wanted to do was internet-enable these beauties. I've been meaning to do something along these lines with the [DigiX](http://digistump.com/products/50) board since I got it. The DigiX is a really powerful Arduino clone with a 32-bit Atmel ARM CPU, tons upon tons of IO, SD card, audio and, most importantly for this project, Wifi on-board.

![frontside](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/03/digix01.jpg "DigiX with module")


Getting Wifi setup the way I wanted on the DigiX took more time than I'd have liked yesterday but I finally figured out that the [Chinese USR-wifi232-g module](http://en.usr.cn/low-power-wifi-module.html) web UI doesn't like Chrome! Once I switched to Firefox, all went swimmingly. I connected it to a Wifi AP, gave it a fixed IP address and then setup a port forward from the house router to it. Obviously I use [Dynamic DNS with Dyn](http://dyn.com/) on the home router so that I don't have to track changing IP addresses manually.

![backside](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/03/digix02.jpg "DigiX other side")

The DigiX comes with an example Web Server built-in so I was able to just create a few simple URLs and paste the RCSwitch code into the relevant places. So within another few minutes I was toggling the switches over the internet.

```
switch1State = 1;
mySwitch.send(109323, 24);

```

Another moment when I forced myself to stop and think about how incredibly easy all this stuff has become. And all of it sitting on the shoulders of giants. So far, all I've done is copy and paste stuff together.

But of course I wasn't happy there. I wanted a mobile app! Luckily, Colum Bennet in [FeedHenry](http://www.feedhenry.com) has created a superb new Getting Started guide which will be released soon. It walks you through creating an [Angular](http://angularjs.org/) Hybrid mobile app which talks to a FeedHenry Node.js back-end to do a really simple task. Despite only playing a programmer for the purposes of blogging, I was able to easily modify both the client and cloud apps to create what I needed with the Node request module.

![Angular](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/03/app01.jpg "FeedHenry Angular App")


Of course I could send the commands directly from the mobile app to the DigiX, but routing it through the cloud means that eventually this can be multi-user, multi-switch, re-configurable and securely locked-down.

![Success](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/03/app02.jpg "Mobile App Success")


One really nice feature of the FeedHenry platform is that you can generate hosted Web Apps from your mobile Apps. This means that whilst I now have a lovely Android APK on my Galaxy S4, my wife can use the web app on her iPhone to achieve exactly the same thing using a simple bookmarked CNAME.

![Web App](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/03/webapp.jpg "FeedHenry Web App")


I'll upload everthing on to a public GitHub repo as soon as I have removed all the hard-coding and added a modicum of "security" with API keys etc. More posts on this technology combo coming in the next few weeks.

With the Bandon Bed Button, we have now achieved Electric Blanket Nirvana.

