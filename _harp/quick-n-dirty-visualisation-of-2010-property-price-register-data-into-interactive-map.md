#"Visualisation of Irish Property Price Register Data using Interactive Map from Google Fusion Tables"

UPDATE:
Second attempt at this:

I just grabbed the three CSV files from the <a href="http://www.propertypriceregister.ie">Residential Property Price Register</a> site (why is a Captcha needed for that?). I merged some address columns in Excel and added "Ireland" to all of the addresses. I then just imported into <a href="https://www.google.com/fusiontables/DataSource?docid=1xttsr82Nw52F5DOSdKWnIe8w4TYuje4uX6mjrI4">Google Fusion Tables</a> and told it to Geo-Code the data.

Note that zero data validation has been done. Everything on this map may be completely wrong. I'm sure some of the more obscure addresses (or non-unique ones) are missing.

Aha! There are daily limits on Geo-coding so I'll have to do this over a few days before the full map of points appears. But this is a decent start:

<iframe width="500" height="300" scrolling="no" frameborder="no" src="https://www.google.com/fusiontables/embedviz?viz=MAP&amp;q=select+col4+from+1xttsr82Nw52F5DOSdKWnIe8w4TYuje4uX6mjrI4&amp;h=false&amp;lat=53.536001102923606&amp;lng=-8.18714663437504&amp;z=7&amp;t=1&amp;l=col4&amp;y=4&amp;tmplt=-1"></iframe>

UPDATE 2:

<a href="https://www.google.com/fusiontables/DataSource?docid=19PUK2r504GNhZ_urpZkmaz-oyPxpMvTMkMnPmjE">2011 Fusion Table</a>. 2011 Map (this will populate properly over next few days too):

<iframe width="800" height="800" scrolling="no" frameborder="no" src="https://www.google.com/fusiontables/embedviz?viz=MAP&amp;q=select+col1+from+19PUK2r504GNhZ_urpZkmaz-oyPxpMvTMkMnPmjE&amp;h=false&amp;lat=53.220334688404286&amp;lng=-7.637767390624957&amp;z=7&amp;t=1&amp;l=col1&amp;y=2&amp;tmplt=-1"></iframe>

<a href="https://www.google.com/fusiontables/DataSource?docid=1CsKIhomej-eNJUD9wUq2rxCbP2byrEdF0MaUk-Q">2012 Fusion Table</a>. 2012 Map (this will populate properly over next few days too):

<iframe width="800" height="800" scrolling="no" frameborder="no" src="https://www.google.com/fusiontables/embedviz?viz=MAP&amp;q=select+col1+from+1CsKIhomej-eNJUD9wUq2rxCbP2byrEdF0MaUk-Q&amp;h=false&amp;lat=53.24549522839595&amp;lng=-367.547605421875&amp;z=7&amp;t=1&amp;l=col1&amp;y=2&amp;tmplt=-1"></iframe>

UPDATE 3:
Replacement <a href="https://www.google.com/fusiontables/DataSource?docid=1YAYJjzYXX8y67upZDygxIh91pFgdSEs4whzZfy0">2010 Fusion Table</a> and Map with Euro symbol correctly encoded:

<iframe width="800" height="800" scrolling="no" frameborder="no" src="https://www.google.com/fusiontables/embedviz?viz=MAP&amp;q=select+col1+from+1YAYJjzYXX8y67upZDygxIh91pFgdSEs4whzZfy0&amp;h=false&amp;lat=52.69770046382954&amp;lng=-8.172728450000022&amp;z=7&amp;t=1&amp;l=col1&amp;y=2&amp;tmplt=-1"></iframe>

UPDATE 4: Of course I should have pointed out earlier that the Fusion tables themselves are very useful. You can filter on location, date, price etc without having to fill-out a silly captcha. 

Anyone interested in one aggregated Table/Map with all the data from all years in it?

UPDATE 5: As of 16:09 on Oct 1st, the 2012 and 2011 data is 100% geo-coded and 2010 is at 63%. However, based on Brendan's comments below, we may be missing a lot of data points because Google can't geo-code them. Once the process is complete, I'll see if we can extract the missing ones and manually adjust the addresses so that they work. There are also plenty of errors from what I can see.

UPDATE 6: As of 9am Oct 2nd, the final data from 2010 is now geo-coded. Short follow-up post to come on how Google could do far more intelligent and less error-prone geo-coding on Irish addresses without post-codes. 
