# DVRPC Newsroom
DVRPC proudly serves as a resource for the region's media, sharing information about our work to improve mobility, the environment, and quality-of-life in Greater Philadelphia. In order to provide quick updates in a bite size format, we have created this blog for our <a href="www.dvrpc.org/Newsroom">Newsroom webpage</a>. This repo houses the entire project, including the public facing newsroom page, the CMS and a node.js back end to connect the two.

## Development
The bulk of this product is developed with vanilla HTML, CSS and Javascript. The rich text editor <a href="https://quilljs.com/">QuillJS</a> was used to help handle text for the CMS. <a href="https://nodejs.org/en/">Node</a>, <a href="https://expressjs.com/">Express</a> and <a href="https://www.postgresql.org/">PostgreSQL</a> were used to make the back end. 

## Navigating the Repo
Root Directory:
- Public facing newsroom page that has the primary blog component as well as resources and links to news, annual reports, logos and more.

CMS:
- Internal page for OCE to create, edit and delete newsroom posts.

Back End:
- Node.js app that uses express to serve up routes for CRUD and connects to a postgres database for data storage.

Archive:
- Public facing page that will serve every newsroom post in the database, organized by year and month.

## Build Process
All JS files must be built before being pushed to the intranet or staging server to ensure browser compatability. 

For the entire folder:
- npx babel js --out-dir build
- copy the files in the build folder over to staging

For individual files:
- cd js
- npx babel filename.js --out-file filename-compiled.js
- copy the compiled files over to staging