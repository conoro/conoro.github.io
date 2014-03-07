#"Monitoring EC2 Servers with Zabbix"


 <div>Amazon Cloudfront is great for monitoring EC2 servers but it can only do external monitoring so it cannot see things like memory being exhausted etc. I tried using Cacti but it was a nightmare to configure with plugins. Nagios always looks like it'd take weeks to sort out.</div>
<p />
<div>A bit of Googling found Zabbix and people seem to like it. Install was a doddle but configuring can be a pain unless you just copy the demo settings.</div>
<p />
<div>You can obviously install all of this on the server to be monitored but it is only useful in non-catastrophic cases. If the server runs out of memory or goes to 100% CPU you won't be able to login to see what happened in the run-up. So ideally use a separate server. We use one of our test servers for monitoring since they spend most of their time unstressed.</div>
<p />
<p />
<div><strong><span style="text-decoration: underline;">The Monitoring Server Install</span></strong></div>
<p />
<div><span style="font-family: courier new, monospace;">sudo aptitude install zabbix-server-mysql zabbix-frontend-php</span></div>
<div><span style="font-family: courier new, monospace;">sudo vi /etc/php5/apache2/php.ini</span></div>
<div>Increase some of the PHP variables in that file (you will be warned when you login to the Admin Panel)</div>
<p />
<div><span style="font-family: courier new, monospace;">sudo /etc/init.d/apache2 restart</span></div>
<div><span style="font-family: courier new, monospace;">sudo apt-get install zabbix-agent</span></div>
<p />
<div>go to <a href="http://name.of.server/zabbix">http://name.of.server/zabbix</a></div>
<div>Login with user=admin, password=zabbix</div>
<p />
<div><strong><span style="text-decoration: underline;">Each Monitored Server Install</span></strong></div>
<p />
<div><span style="font-family: courier new, monospace;">sudo apt-get install zabbix-agent</span></div>
<div><span style="font-family: courier new, monospace;">cd /etc/zabbix</span></div>
<div><span style="font-family: courier new, monospace;">sudo vim zabbix_agent.conf</span></div>
<div>Add the Monitoring Server's Public and Private IP addresses</div>
<div>Open up ports 10050 and 10051 in your EC2 security group (using Elasticfox or similar) and allow the monitoring server's private IP</div>
<p />
<div><span style="font-family: courier new, monospace;">sudo /etc/init.d/zabbix-agent restart</span></div>
<p />
<div><strong><span style="text-decoration: underline;">SNMP (Optional)</span></strong></div>
<p />
<div>You can use SNMP monitoring too but the Zabbix agent seems ok so far.</div>
<p />
<p />
<div><strong><span style="text-decoration: underline;">Extra Config Afterwards</span></strong></div>
<p />
<div>The easiest way to start monitoring is to do a full clone of the demo localhost monitoring and just change the IP address and DNS name to the monitored server.</div>
<p />
<p />
<div><strong><span style="text-decoration: underline;">Authenticated SMTP Alerts</span></strong></div>
<p />
<div>We use AuthSMTP for all email sending from EC2. Zabbix doesn't handle authenticated SMTP out of the box so you have to use an external script.</div>
<p />
<div><span style="font-family: courier new, monospace;">sudo apt-get install sendEmail</span></div>
<p />
<div>Create a script "zabbix_sendemail" (chmod 755) in the AlertScriptsPath folder specified by /etc/zabbix/zabbix_server.conf (/etc/zabbix/alert.d/)</div>
<div>--------------------------------------</div>
<div><span style="font-family: courier new, monospace;">#!/bin/sh</span></div>
<p />
<div><span style="font-family: courier new, monospace;">export smtpemailfrom=<a href="mailto:zabbix@yourdomain.com">zabbix@yourdomain.com</a></span></div>
<div><span style="font-family: courier new, monospace;">export zabbixemailto=$1</span></div>
<div><span style="font-family: courier new, monospace;">export zabbixsubject=$2</span></div>
<div><span style="font-family: courier new, monospace;">export zabbixbody=$3</span></div>
<div><span style="font-family: courier new, monospace;">export smtpserver=<a href="http://yoursmtpserver.com">yoursmtpserver.com</a></span></div>
<div><span style="font-family: courier new, monospace;">export smtplogin=smtpuser</span></div>
<div><span style="font-family: courier new, monospace;">export smtppass=smtppassword</span></div>
<p />
<div><span style="font-family: courier new, monospace;">/usr/bin/sendEmail -f $smtpemailfrom -t $zabbixemailto -u $zabbixsubject -m $zabbixbody -s $smtpserver:25 -xu $smtplogin -xp $smtppass</span></div>
<div>--------------------------------------</div>
<p />
<div>Set a Media Type (Administration / Media types) script to zabbix_sendemail</div>
<div>Add that Media to the Admin user (Administration / Users / user)</div>
<div>
<div>Set the Action (Configurations / Actions) for the alert(s) you want to trigger on and who should get them (Admin)&nbsp;</div>
</div>
<p />
<div>
<div><strong><span style="text-decoration: underline;">SMS Alerts</span></strong></div>
<p />
<div>Sign up for something like Clickatell and buy a block of 400 credits for &euro;17. Then repeat the steps for SMTP above but with the following script. I have both SMS and email set to be sent on certain triggers like low memory.</div>
<p />
<div>
<div>#! /bin/sh</div>
<p />
<div>/usr/bin/wget --spider --no-check-certificate "http://api.clickatell.com/http/s</div>
<div>endmsg?api_id=NNNNNNN&amp;user=XXXXXXXXX&amp;password=YYYYYYY&amp;to=$1&amp;text=$2"</div>
</div>
</div>
<p />
<p />
<p />
<div><strong><span style="text-decoration: underline;">Monitor What?</span></strong></div>
<p />
<div>Zabbix allows you to monitor a wide range of parameters and processes. So everything from network activity to whether your FTP server is contactable. It's not the easiest web-app to configure but so far I'm finding it extremely useful.</div>
 