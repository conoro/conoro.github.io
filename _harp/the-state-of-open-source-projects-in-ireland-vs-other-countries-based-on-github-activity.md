#"The state of Open Source projects in Ireland vs other countries, based on GitHub activity"

Last weekend I was working away on a personal side-project of mine and I suddenly realised I follow almost no Irish projects or developers on <a href="http://github.com/conoro">GitHub</a>. I then started writing this post which was going to be an attack on our lack of people who work on OSS projects outside of work.

But rather than go with gut, I decided to see if I could back it up with data. I decided GitHub relative activity could give us a strong metric of where Ireland fits in to the Open Source world. Of course there are tons of other OSS project hosting sites like Sourceforge, BitBucket, Assembla, Gitorious and even self-hosting but GitHub should do as a rough measure.

I assumed someone had done some simple analysis like this before but all I found were "unusual" visualisations. Then I discovered that GitHub posts all their <a href="https://github.com/blog/1112-data-at-github">public commit data</a> to <a href="https://bigquery.cloud.google.com/">Google BigQuery</a>. This is a big online DB that you can query in a simple SQL console. I lashed together some simple queries and the data basically proved me completely wrong.

[sql]
SELECT count(*) as commits, repository_owner, actor_attributes_location FROM [githubarchive:github.timeline] where actor_attributes_location CONTAINS 'Ireland' group by actor_attributes_location, repository_owner order by commits DESC LIMIT 100000000 
[/sql]

So in total, I can see 9381 repository committers that mention "Ireland" in their location and have done at least one commit.

That drops to 5872 if we exclude people who have only ever done one commit.

[sql]
select commits, repository_owner, actor_attributes_location from (SELECT count(*) as commits, repository_owner, actor_attributes_location FROM [githubarchive:github.timeline] where actor_attributes_location CONTAINS 'Ireland' group by actor_attributes_location, repository_owner order by commits DESC) where commits &gt; 1
[/sql]

And 1799 if we exclude those who have done 5 commits or fewer.

Note that these are not repository owners, just people who have done commits.

If we then filter it down by people who have committed to their own repos we get 970. So with a population of 4.6m, 970 people have setup a GitHub account with a public repository and committed at least once to it.

[sql]
SELECT count(*) as commits, repository_owner, actor_attributes_location FROM [githubarchive:github.timeline] where actor_attributes_location CONTAINS 'Ireland' and actor=repository_owner group by actor_attributes_location, repository_owner order by commits DESC
[/sql]

At this point I was totally depressed. 970 repos. And many of these may be company ones or forks of other repos or school exercises. But then I decided to compare to some other countries.

Let's start with the UK (Population: 63m): 7643 repos
Using UK, United Kingdom, Great Britain, England, Wales, Scotland, Northern Ireland: 9929 repos
Gives us 724 vs 970 using Ireland as the baseline

Finland (Population: 5.4m): 1332 repos
Using Suomi, Finland: 1333 repos
Gives us 1135 vs 970 using Ireland as the baseline

Australia (Population: 21.5m): 4375 repos
Using Australia, Oz: 4375 repos
Gives us 936 vs 970 using Ireland as the baseline

New Zealand (Population: 4.5m): 1048 repos
Using New Zealand, NZ: 1181 repos
Gives us: 1207 vs 970 using Ireland as the baseline

Canada (Population: 33.9m): 4526 repos
Gives us: 614 vs 970 using Ireland as the baseline

Finally, the spiritual home of OSS and the actual home of GitHub:

USA (Population: 315.5m): 6146
Using USA, US, United States: 7913
Gives us: 115 vs 970 using Ireland as the baseline

(My guess is this number is way too low and Americans just use city/state as they consider the country implied :-))

So I was wrong. Ireland isn't particularly bad. Really, we're all in or around the same ballpark except for the US. So this isn't just an Irish thing. People working in the tech industry worldwide just don't seem that interested in writing code in their spare time and making it freely available to others.

Thoughts? Corrections to my SQL? Anyone want to build a better query for the US?


