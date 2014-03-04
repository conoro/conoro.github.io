#"Run the @espruino JS interpreter on Windows"

I just got my Kickstarter <a href="http://www.espruino.com/">Espruino</a> yesterday. It's one of those projects that just makes me smile. A tiny board with an ST ARM MCU running a special JavaScript interpreter that can do all the stuff with hardware you would normally associate with C/C++/Assembler/Wiring.

<a href="http://conoroneill.net/wp-content/uploads/2014/02/espruino_board.jpg"><img class="aligncenter size-full wp-image-1261" alt="espruino_board" src="http://conoroneill.net/wp-content/uploads/2014/02/espruino_board.jpg" width="640" height="322" /></a>

I've only just got started playing with it and I swear it feels like my first days using a ZX Spectrum. The instant feedback of interpreted JS in a console feels exactly like typing BASIC into the Speccy (blog post coming on my Speccy and the Interface1bis soon).

The Espruino Chrome App is pretty basic but I was really excited to see that it has a Scratch-style blocks-editor for generating JS. I love the whole JavaScript/Node-everywhere movement but all those damned brackets/braces are a real hurdle for anyone trying to learn programming.

<a href="http://conoroneill.net/wp-content/uploads/2014/02/espruino.jpg"><img class="aligncenter size-large wp-image-1262" alt="espruino" src="http://conoroneill.net/wp-content/uploads/2014/02/espruino-1024x601.jpg" width="584" height="342" /></a>

The Espruino interpreter itself can be compiled for a variety of ST Eval boards, the Raspberry Pi and most boxes that run Linux. I'd love to get it running on my DigiX too since its processor specs are almost identical to the Espruino. But it's been over 14 years since I played with BSPs and cross-compilers and I'm not sure I have the chops any more.

Gordon, the man responsible for it all, mentioned in the forums that it should compile on Windows using Cygwin. Speaking of 14 years ago, it's about that long since I used Cygwin too. I spent so many hours in the late 90s building XEmacs for Cygwin on my PC.

And whaddya know, it works! It took forever to download all the necessary bits of Cygwin on our crappy DSL but compilation of Espruino took about 30 seconds with no errors. Here's some code in action which grabs the contents of the Espruino web-site home page:

<a href="http://conoroneill.net/wp-content/uploads/2014/02/http.jpg"><img class="aligncenter size-full wp-image-1260" alt="http" src="http://conoroneill.net/wp-content/uploads/2014/02/http.jpg" width="675" height="339" /></a>

So if your curiosity is piqued by this very cool project, you can play with the core interpreter on Windows whilst you wait for your board to arrive. I was chuffed to see that the http functionality works fine.

I built it on Windows 7 64-bit so I've no idea if it runs on 32-bit Windows. You should just need the <a href="https://dl.dropboxusercontent.com/u/1535134/espruino_cygwin/espruino.exe">EXE here</a> and the <a href="https://dl.dropboxusercontent.com/u/1535134/espruino_cygwin/cygwin1.dll">Cygwin1.dll here</a>to try it out. Let me know how you get on. I'm not 100% sure yet if you need any more of the Cygwin DLLs to access other functionality.

&nbsp;