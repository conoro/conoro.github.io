#"Endo2Atom - An Endomondo ATOM/RSS feed to post your activities via tools like IFTTT #OpenData"

I was very disappointed to realise that <a href="http://www.endomondo.com/">Endomondo</a> has no API. The best they can do for pushing your activities elsewhere is built-in Facebook/Twitter and some widgets. When will companies learn that lock-in is not how you keep customers?

I'd like to be able to push my activities to sites like App.net, Tumblr or anywhere really. The best way to do that is with ATOM/RSS and great tools like <a href="http://ifttt.com">IFTTT</a> and <a href="http://dlvr.it">dlvr.it</a>.

A bit of poking around last night led me to good old screen-scraping. Their widgets are publicly accessible so it wasn't too hard to scrape one of them and generate an ATOM feed. I used it as an opportunity to try out <a href="http://bottlepy.org/docs/dev/">Bottle</a>. If you need to build a simple web-app fast, with minimal overhead and you use Python, I think you'll like it. For kicks and giggles I decided to put it up on <a href="https://www.heroku.com/">Heroku</a> - my first time to do so properly. That's a very nice deployment flow indeed.

<a href="http://conoroneill.net/wp-content/uploads/2013/04/marathon.jpg"><img class="aligncenter size-large wp-image-979" alt="marathon" src="http://conoroneill.net/wp-content/uploads/2013/04/marathon-1024x423.jpg" width="584" height="241" /></a>

So here you go. If you want the ATOM feed of your public Endomondo activities, just grab your numeric user ID from your profile page and tack it onto <a href="http://endo2atom.conoroneill.com">http://endo2atom.conoroneill.com</a>

For example, my Endomondo profile is <a href="http://www.endomondo.com/profile/8922951">http://www.endomondo.com/profile/8922951</a> so my ATOM feed is <a href="http://endo2atom.conoroneill.com/8922951">http://endo2atom.conoroneill.com/8922951</a>

Code, as ever, is<a href="https://github.com/conoro/endo2atom">on GitHub</a>.

I have also created <a href="https://ifttt.com/recipes/89309">a simple IFTTT Recipe</a> for auto-posting those activities to <a href="https://alpha.app.net/conor">App.Net</a>. I'll try some other targets over the weekend.

It has only been tested on treadmill running, treadmill walking and road running. There is no error checking so it may fall over on non-distance-based activities. Let me know if it does and I'll improve. The code is also limited to the first page of activities and doesn't crawl backwards on the other pages. That should be easy enough to add.

Hope you find it useful.