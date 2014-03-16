As I said in the previous posts, the move from WP to HarpJS was not exactly smooth. But I'm glad I've done it as I finally learned how to use a lot of things like Jade that I've long-fingered for years.

The first step was to get the original content out of WordPress. This had the added twist that the conoroneill.net blog actually started out as a Posterous blog which I imported into WordPress when I realised that Posterous was a dead-end. So the first two years of posts have some "interesting" problems in them.

The tool I used for import was [wpJson4Harp](https://github.com/EJEHardenberg/wpJson4Harp) as recommended on the HarpJS site. These were the notes I took on that part of the process:

* It doesn't work off a WXR export or WP APIs but actually needs access to your WordPress DB. This is not a goer if you have shared hosting with the MySQL access locked down. I had to dump my WP DB and load it into a VirtualBox Ubuntu VM and run the import tool there.
* As I mentioned above, the older Posterous posts had problems
 * Lots of embedded YouTube Videos not working
 * I was gutted to discover that the Posterous to WP import had not moved over the images. So now that Posterous is gone, so are those images. A harsh lesson learned. I'm just imagining how exposed the average Tumblr person is to the same problem
 * Posterous seemed to use 4 spaces in formatting quite a bit. So of course Harp thinks this is source code in the generated MD files and formats appropriately. I manually did a search/replace on this to convert all sets of 4 spaces to 1. Seems to have done the trick
* I've been using a YouTube plugin which lets me embed videos by using a fake url with the prefix httpv. None of these work. Probably won't be that hard to do a search/replace on those eventually.
* The "blog index" file that wpJson4Harp generated (_data.json) is quite crude. It has JS timestamps rather than human readable ones and the posts are not in chronological order 
* I ended up making some changes to its Python source to simplify its output and make it more "blog like"
* I downloaded all the files from wp-content in WordPress and uploaded them to my S3 account using Cloudberry Explorer. I then did a search replace across all of the MD files to replace my conoroneill.net URLs with https://s3-eu-west-1.amazonaws.com/


So once I had all of the old blogposts as MD files, it was time to get them into some sort of HarpJS blog. I managed to install Harp on Windows after a lot of messing with Visual Studio Express (both 2010 and 2012 now installed) and node-sass. Actully node-saas just seems to be a general pain in the arse and I hope people start using something else that doesn't require native compilation.

Unfortunately, even tho Harp installed, it doesn't work correctly on Windows if you are using for GitHub Pages. It throws an error about bad paths if you do harp compile _harp ./

So I moved over to my Ubuntu VM and setup everything there instead. The [instructions for using GitHub Pages](http://harpjs.com/docs/deployment/github-pages) as the host on the Harp site work perfectly for Ubuntu.

As Harp is pretty new, there are very few templates/themes for blogs. The general web-site ones seem good and I'll be trying them out after this. So I ended up using the Baseline template and that's where the heavy work began. Here's all the problems/challenges/learnings I went through over the space of several weekends:

* Template assumes /blog for blog but that's not what I use, I need it to be in the root. Some simple playing with the templates seemed to take care of that.
* I didn't use year/month/day in my original URLs on Posterous (and then WordPress) so I now have 650 md files and html files in one directory each. I'll move to date based directories from now on, once I figure it out. 
* The default index.html (_layout.jade) just lists every post in the order it finds them in _data.json but that's completely un-blog-like. I had to implement a bunch of JavaScript in the Jade template to sort the posts by reverse chronological order. As I'm not a JavaScript programmer, this ended up being several days of grabbing bits of code off Stack Overflow and sticking console.log in everywhere until I finally got it working. Learned a lot but it nearly ended up being a show-stopper and I came very close to giving up. You can see the main [changes here](https://github.com/conoro/conoro.github.io/blob/master/_harp/_layout.jade) (don't laugh!)
* As a result I realised that Jade is an extremely limited templating language. I can see why a lot of people use EJS instead. I had to drop to raw JavaScript to do most things e.g. converting the JS timestamps to human readable format
* Stylus is a reasonably nice way of doing CSS but of course you can't use line numbers in Chrome Inspector to see what line in the Stylus template has to change. But the upside is that I know have a basic understanding of Stylus
* I learned how to do Google Web Fonts which was neat
* There is no pagination in the index.html template and I cannot find a "recipe" for this even in a wider Jade context. 
* I had to delete some references to Twitter etc in the templates as they kept causing Jade errors. I think it's some cross-referencing problem between author in _data.json and the config file for Twitter.
* The home page should not be 650+ post titles, it should be 5-10 full posts, like a normal blog. I haven't got started on this yet but it will require cross referencing between _data.json and individual HTML/md files to pull in the content
* The RSS feed did not validate for several reasons (JS timestamps, titles). I fixed that so it now validates. But like the home page, it only has my manually entered post summaries rather than my preferred approach of full posts.
* The RSS feed was set to rss.xml but I changed to it to /feed so that existing subscribers to my WP blog don't all lose me in the move
* The Disqus integration works well but ideally I'd love an Open Source JS commenting system that stores comments in maybe JSON files on Dropbox
* Google Analytics support and the avatar support for GitHub/Twitter/Facebook/G+ is nice.
* There is obviously no search built in. Currently I'm using Google Custom Search which works well but is fugly. Is there a possibility to create a simple JS search tool that uses _data.json as a first MVP and later builds a searchable JSON index file as part of the compile process?

So I now have something that almost works the way I want it. Uploading images to S3 is no real strain and I'll be able to make all the other changes I want incrementally.

The biggest ongoing annoyance is that "harp compile" deletes all of the generated HTML and re-builds everything from scratch every time. This isn't scalable when you have 650+ posts and it means that when I add a new blogpost I have to wait 2-3 minutes for it to recompile. There should be an incremental option which assumes no structural/styling changes have happened and just looks for new md files to compile and then rebuilds index.html. Good old "Make" had this nailed a long time ago ;-) Actually cpould git not be leveraged for this? Compare the current working tree with the last commit?

That HTML deletion is also a problem for using a DNS CNAME with GitHub Pages since it deletes that file from the root directory every time. Update: OK, I just sorted this with two minutes effort. Created CNAME file in _harp and added it with layout: false to _data.json. The compile process then copies it over to root. 

It would be great to have a simple cli tool called new-blog-post which asks for a title, date and summary and updates _data.json and creates the empty .md file. I could probably write this myself but I've 500 other things I need to do too. I also must look into adding tagging and a ZX Spectrum header image.

I know the whole process sounds like a huge amount of work. It was! But I think everything above could be sorted with an improved WP import tool that works on WXR files and some kick-ass blog templates rather than web-site templates. I'm really looking forward to using Harp when I port an old web-site next.


