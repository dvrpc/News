# DVRPC Newsroom

DVRPC proudly serves as a resource for the region's media, sharing information about our work to improve mobility, the environment, and quality-of-life in Greater Philadelphia. In order to provide quick updates in a bite size format, we have created this blog for our <a href="https://www.dvrpc.org/Newsroom/">Newsroom webpage</a>. This repo houses the public facing newsroom page and the CMS; the back end that connects the two is at <https://github.com/dvrpc/NewsServer>.

## Development

The bulk of this product is developed with vanilla HTML, CSS and Javascript. The rich text editor <a href="https://quilljs.com/">QuillJS</a> was used to help handle text for the CMS.

## Navigating the Repo

Root Directory:
- Public facing newsroom page that has the primary blog component as well as resources and links to news, annual reports, logos, and more.

CMS:
- Internal page for OCE to create, edit, and delete newsroom posts.

Archive:
- Public facing page that will serve every newsroom post in the database, organized by year and month.

## Build Process

All JS files must be built before being pushed to the intranet or staging server to ensure browser compatibility.

For the entire folder:
- `npx babel js --out-dir build`
- copy the files in the build folder over to staging

For individual files:
- `cd js`
- `npx babel filename.js --out-file filename-compiled.js`
- copy the compiled files over to staging
