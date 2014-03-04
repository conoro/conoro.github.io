#"Alleluia - How to specify which Google Account in the URL"

I have been driven demented by Google's multi-login feature since it launched. Every damned tool of theirs seems to do it differently. The good ones let you flick seamlessly between accounts (Google+). The awful ones won't let you select an alternative (yes you Picasa Web) and if you logout, you logout of everything. And of course, they always default to the one you don't want (hellooo Google Reader).

I had a brainwave a few minutes ago - what if there was a way of specifying which account you want to use in the URL when accessing a Google application? And it turns out, praise jebus, there is. All you have to do is tack on ?authuser=N to the URL (or &amp;authuser=N if there is already a parameter on the URL) where N=0 for the default account (i.e. the one you logged in with first), N=1 is the next account you logged in with, etc etc.

So now, rather than clicking a general bookmark for Google Reader which always goes to my unused loudervoice.com Reader account and then I have to switch, I can set the bookmark to <a href="http://google.com/reader?authuser=1">http://google.com/reader?authuser=1</a> and go there directly.

Unfortunately it doesn't work for Picasa. Why Google, why?

One less thing to bug the crap out of me each day :-)