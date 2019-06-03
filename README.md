# DVRPC News Page Blog
Consolidates information and serves news posts in a semi-blog widget on the page

## Build Process
For the entire folder:
- npx babel js --out-dir build
- copy the files in the build folder over to staging

For individual files:
- cd js
- npx babel filename.js --out-file filename-compiled.js
- copy the compiled files over to staging