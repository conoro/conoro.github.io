#"When a 10 year old tiny utility program saves your ass"

After many many years on a barely-used 1024-bit GPG/PGP key, I decided to go full-blown 4096-bit recently. More for the principle than anything else, but also to mess around with some secure apps like <a href="http://retroshare.sourceforge.net/">Retroshare</a>, as mentioned by <a href="https://twitter.com/onetruecathal">Cathal Garvey</a>.

Whilst I was as it, I moved to a new much improved longer password and made sure to drill it into my brain over and over.

Yeah, that worked brilliantly...........

Last night I went to setup Retroshare properly and it rejected the password. 50 attempts later I was no closer to getting in. But I was sure I had the general pattern of the password correct.

Normally you are screwed when this happens, but a bit of googling found program called "<a href="http://www.roguedaemon.net/rephrase/README.html">Rephrase</a>" which was last updated in 2003. You give it the general patter of your password along with possible character variations and it brute forces all of the possible combinations against GPG. e.g. (T|t)this(I|i)s(M|m)y(P|p)assword. And whaddya know, I was close, I just had a capitalisation wrong! Hurrah.

&nbsp;