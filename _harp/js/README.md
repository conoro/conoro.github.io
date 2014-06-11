# This is how to generate the blog

## Pre-requisites
sudo npm install -g gnode 
npm install slug co co-prompt

## Create a new blog post
cd ~/gitwork/conoro.github.io/_harp/js
gnode newpost.js
gedit ../name_of_new_post.md

## Build the new HTML
cd ~/gitwork/conoro.github.io/
harp compile _harp ./

## Test
harp server --port 9001

## Publish
git add -A
git commit -a -m "some comment"
git push origin master
