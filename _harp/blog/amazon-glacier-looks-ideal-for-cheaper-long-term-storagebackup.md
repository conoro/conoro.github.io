#"Amazon Glacier looks ideal for cheaper long-term storage/backup"

Amazon <a href="http://aws.typepad.com/aws/2012/08/amazon-glacier-offsite-archival-storage-for-one-penny-per-gb-per-month.html">just announced</a> <a href="http://aws.amazon.com/glacier">Glacier</a>:
<blockquote>Amazon Glacier is an extremely low-cost storage service that provides secure and durable storage for data archiving and backup. In order to keep costs low, Amazon Glacier is optimized for data that is infrequently accessed and for which retrieval times of several hours are suitable. With Amazon Glacier, customers can reliably store large or small amounts of data for as little as $0.01 per gigabyte per month, a significant savings compared to on-premises solutions.</blockquote>

We use variety of backup and online storage approaches. Dropbox for commonly accessed data for individuals, S3 for backups/archival and S3+Cloudfront for CDN. There has been the option of reduced redundacy S3 for quite a while but we haven't bothered as we want the extra comfort level.

But looking at our S3 usage, the bulk of it is never accessed, it is only there for long-term archival. Old code, old server images, old documents etc. Some of it hasn't been touched in over 4 years. That's perfect for Glacier, which, based on its description, seems to be tape storage?

Just to give a simple comparison on pricing (storage only, not transfer):

S3: $0.125 per GB / month
S3 reduced Redundancy: $0.093 per GB / month
Glacier: $0.01 per GB / month

We'll start the move in the next week or so.