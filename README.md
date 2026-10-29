## How did I created SPA interactive page on GitHub Pages  

To use it as a page in my GitHup pages, I have created a special repository
called &lt;username&gt;.github.io

Then I configured the project appropriately. The build is emitting all the files
into a `docs` folder, which is set to be the root of my github pages.

To make my random 404 page work, I have created the 404 in react, and to make
it usable by github I simply copied index.html as a 404.html and this way
it works just like the app, and is able to use all the same compiled JS.
It is a bit of overkill, but splitting the code the way, that 404 page code
is in a separate bundle handles the issue of pulling a big JS just for this
job, and I do not have to wory about creating separate html, app handler etc.
even the translations work out of the box :).