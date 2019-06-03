// returns the created page contents that can be fed into createPost
const makePage=function(a,b,c){const d=(b-1)*c,e=a.slice(d,d+c);return e},changePage=function(a,b,c){// remove old page contents
for("next"===a?b+=1:b-=1;c.firstChild;)c.removeChild(c.firstChild);return b},toggleNavArrows=function(a,b,c,d){c.style.display=a===b?"none":"block",d.style.display=1===a?"none":"block"};// update page tracking variable & remove old page contents
export{makePage,changePage,toggleNavArrows};