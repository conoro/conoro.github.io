My blogging history goes back to 2001 when I setup a Blogger/Blogspot blog in the hope that I would update things more quickly than with Geocities or my Frontpage98 home page. 4 months later I wrote my second post :-) For a long time it involved writing the posts on Blogger and then publishing them via FTP to my own domain. It was fiddly but it worked ok. 

Then around 2005 I discovered WordPress and realised blogging could be much much much easier. In the past 9 years I've done an incredible amount of stuff with WP. From personal blogging to building core parts of a business on top of it. It has been both a delight and the source of my greatest frustrations (glares at the "WYSIWYG" editor).

As with all great Open Source projects, the power of WP isn't really in the core product itself, but in the ecosystem and community that built up around it. I have never run into a situation where I couldn't find a WP plugin that matched my needs within a couple of minutes of googling.

The old slow, awkward, manually marked-up, manually-published HTML method died under the onslaught of WP's ease-of-use. Bloggers no longer had to be programmers or web developers, they could be writers. And that was, without a doubt, a wonderful progression. Even tools that tried to straddle both worlds, like Movable Type, couldn't compete with WP's 2 minute install and one-click publish.

WordPress has also created a swathe of job opportunities for people around the world who do design, web-site creation, SEO etc etc, and who wouldn't know a HTML tag if it slapped them in the face. This is both a blessing and a curse, as the number of security-compromised WP sites grows daily. 

The incredible flexibility and architecture openness is naturally also WP's greatest weakness. I've lost track of the number of plugins that either destroyed the performance of my WP installations or opened up giant gaping security holes. The relentless Core+Plugins upgrade cycle has also become insufferable if you run more than one site.

I've recently been thinking a lot around the lifecycle of things and how we often focus on the wrong bit. In App development, the creation of the App is the shortest bit of its lifecycle, so you should think about what you need to manage it, once its deployed. Similarly with blogging, the creation bit can take minutes but those posts can be read by thousands of people over several years. So we should be thinking more about how we make sure those posts are delivered quickly, reliably and with zero security hazards to as many people as possible and with no ongoing maintenance.

It was when we hit 2013 that I started to notice a change in the attitude towards WordPress. The WP features continued to pile up as it tried and failed to become a proper CMS. In reality most people want to create simple text+images blogposts with as little hassle as possible. So developers started going Back To The Future and using command-line tools, Markdown syntax, templating languages and, most importantly, GitHub Pages as the blog host.

This is the bit that started to get me excited. Totally static blog web-pages. No PHP, no MySQL DB, no possibility for security holes. And best of all, blazingly fast performance.

Of course these tools are currently completely opaque to non-technical people. You get ultimate control and flexibility but at the cost of having to learn Markdown, Jade, EJS, Stylus, Git, S3, JavaScript, etc etc. 

As 2013 progressed I did lots more reading on these tools like Jekyll and Octopress. Somehow Ghost got lumped in there too but it's not a static site generator, it's trying to be WP with PHP removed and Node.js inserted. 

My plan was to move some old work sites to be static. They have thousands of pages on them but despite little traffic, they regularly go offline as MySQL runs out of memory due to what appears to be some horrifically written SQL queries in WP or one of its plugins.

Finally a few weeks ago, I went at it all again but decided to use a blog move as a way of learning how it all works. I had a few requirements:

* It had to work with GitHub Pages or similar 
* It should be git friendly
* It should ideally use Node.js rather than Ruby or PHP
* It should support more that one templating language/styling language and possibly CoffeeScript
* The tools should run on Linux, OSX and ideally Windows
* It should have a good community of people building themes and improvements
* It should have some way of importing WordPress content
* It should have some blog-style templates rather than web-site ones
* It should have some support for commenting systems like Disqus, but ideally have its own JS commenting system

There are quite a few tools out there that support most of the above but I did find that many of them are either dead projects or single-developer projects with no community. The small set of which I found the most mentions, in no particular order, were:

* [HarpJS](http://harpjs.com/)
* [DocPad](http://docpad.org/)
* [Octopress](http://octopress.org/)
* [Jekyll](http://jekyllrb.com/)
* [Wintersmith](https://github.com/jnordberg/wintersmith)
* [Blacksmith](https://github.com/flatiron/blacksmith)
 
A bit more digging bubbled up HarpJS as the most likely winner based on the above requirements, with DocPad as a backup in case it failed. I had also seen some Mobile guys blogging about HarpJS, and two of the co-founders created PhoneGap, which immediately piqued my interest.

It turned out to be a _lot_ harder than I thought to move from WP to Harp. Wayyyy harder than the earlier move of that same blog from Posterous to WordPress. I'll be writing a separate post right after this on the nitty gritty of the move but in this post I really just wanted to focus on the "Static Movement" )geddit? static, movement).

I really think there is a large opportunity for a mainstream Static Site/Blog platform and it many ways it'll probably be like Blogger of old. I really like where Dave Winer is going with the Fargo outliner and it has the potential to be such a tool. The Harp guys are also doing some interesting stuff with the [harp.io](https://www.harp.io/) platform, but the entry price of $9.95 per month is probably too high for most non-commercial bloggers. The features an ideal platform would have include:

* Publishing of the static content to GitHub Pages, Dropbox and Google Drive via whatever APIs are appropriate, including Git
* Dropbox and Google Drive to provide CNAME support for these static sites
* Built-in hosting alternative like [harp.io](https://www.harp.io/)
* Command line flow using git etc for developers
* Online management/publishing dashboard for non-developers
* Online Markdown editing tool - I think Markdown could also go mainstream. Anyone can learn it in a few minutes. 
* A split-screen online Markdown editor like Mou or Stackedit
* Online templates/themes management using something like Jade+Stylus or EJS
* Very fast compile/publish cycle
* Plugins only available as JavaScript snippets (Dropbox JavaScript "App" support is very cool)

I just have this feeling that Dropbox/GoogleDrive could finally be the trigger that gets us back on the righteous path of people owning and publishing their own content instead of giving it for free to Facebook/Tumblr/Twitter where it could all disappear tomorrow (cf Geocities/Posterous/etc).

I'm probably a week or so away from pulling the trigger on the move. Some of the earliest content that originated on Posterous is well and truly messed up and I'm not sure if I want to script up some cleanups or leave it. Finally, the lack of pagination is probably the last thing I want to look at before making the DNS change.

It'll be interesting to watch how 2014 plays out. Will a new platform come to the fore which focuses on ownership, content portability, zero-maintenance, security and adding a bit of fun back into blogging?

