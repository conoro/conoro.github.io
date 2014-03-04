#"Accessing Amazon RDS Instances from your Desktop"


    <p>Whilst we are huge fans of the Amazon RDS database service (particularly the Multi-AZ setup), one thing that can be a problem is accessing your databases from the desktop. The standard trick of running an SSH tunnel to your EC2 instance doesn't work here.&nbsp;</p>
<div><br />After much searching I found the following on an <a href="http://developer.amazonwebservices.com/connect/message.jspa?messageID=173501">AWS discussion forum</a> and it works perfectly:</div>
<p />
<div><span style="font-family: courier new, monospace;">ssh-add YourKey.pem</span></div>
<div>
<div><span style="font-family: courier new, monospace;">ssh -l &lt;username&gt; -L 33060:&lt;ec2_rfc_ip&gt;:3306 -N &lt;ext_hostname&gt;&nbsp;</span><p /> Then connect your local MySQL client to localhost, port 33060&nbsp;<p /><span style="font-family: courier new, monospace;">&lt;username&gt;</span> is the login user on the EC2 instance from where you normally access the RDS MySQL DB. <span style="font-family: courier new, monospace;">&lt;ec2_rfc_ip&gt;</span> is the RDS instance's IP address and <span style="font-family: courier new, monospace;">&lt;ext_hostname&gt;</span>&nbsp;is the external hostname of one of your EC2 instances.&nbsp;</div>
<div>
<div><br />A couple of notes:<br /><ol>
<li>You have to use the internal AWS IP address of the RDS instance, not its name or its external IP</li>
<li>We've only tested it on an Ubuntu desktop running inside VirtualBox on Windows</li>
<li>It works fine with the MySQL GUI tools</li>
<li>We haven't been able to figure out how to do it directly with Putty on Windows. Anyone know how?</li>
</ol>
<p />
</div>
</div>
</div>
  