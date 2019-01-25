import { typeImages, dummyData } from './lookups.js'
import { makePage, changePage, toggleNavArrows } from './pagination.js'
import { createPost, createDetailView } from './makeContent.js'
import { toggleContentVisibility } from './toggleVisibility.js'

// get a handle on the main box and next/previous buttons
const updatesBox = document.querySelector('#updates-box')
const nextPageButton = document.querySelector('#updates-box-nav-right')
const previousPageButton = document.querySelector('#updates-box-nav-left')

// Variables for Pagination Functions
let currentPage = 1;
const postsPerPage = 6
let numberOfPages;
let pageContents;

// test to get the jawns (it works. neat-o)
const jawn = async () => {
    const stream = await fetch('http://10.1.1.194:3001/api/getTop16')
    const data = await stream.json()
    console.log('data from the db ', data)
}

jawn()


/****** New Page + Data Functions ******/
// general function to create new page (@TODO: once db response is set up, just add posts.then(posts => {}) to make it work)
const createNewPage = posts => {
    // get the data for the page
    pageContents = makePage(posts, currentPage, postsPerPage)

    // create the page & add detail view functionality
    pageContents.forEach(post => {

        // create the post and return the updatesItem so that functionality can be added
        const updatesItem = createPost(post, typeImages, updatesBox)
        
        // add detailView functionality to the created updatesItems
        updatesItem.onclick = () => {
            
            // hide the post previews
            toggleContentVisibility('none', updatesBox)
            
            // hide the nav arrows
            nextPageButton.style.display = 'none'
            previousPageButton.style.display = 'none'
            
            // create the detail view + add functionality to the return arrow
            const detailViewLeftArrow = createDetailView(post, typeImages, updatesBox)

            detailViewLeftArrow.onclick = () => {
                toggleContentVisibility('', updatesBox)
                toggleNavArrows(currentPage, numberOfPages, nextPageButton, previousPageButton)
            }
        }
    })
}

// might as well prepare it for db response
const getPageData = async () => {
    //const stream = await fetch('endpoint.com')
    // for the real thing - posts can be exported as a promise and then functions that use it will jsut need to .then() off it.
    //const posts = await stream.json()
    
    const posts = dummyData
    const length = posts.length

    // calculate how many pages to create from the data set
    numberOfPages = Math.ceil(length / postsPerPage)

    createNewPage(posts)
}


/****** Navigation Arrow Functions ******/
// update page contents, create a new one and adjust arrows (when necessary)
const navButtonClick = direction => {

    // update currentPage and clear updatesBox of old content
    currentPage = changePage(direction, currentPage, updatesBox)
    
    // @TODO: replace dummyData w/ promise exported by getPageData
    createNewPage(dummyData)

    toggleNavArrows(currentPage, numberOfPages, nextPageButton, previousPageButton)
}

nextPageButton.onclick = () => navButtonClick('next')
previousPageButton.onclick = () => navButtonClick('')

// on load, create the first page (with db, getPageData will be refactored to return a data PROMISE, which will replace all instances of dummyData etc., and then createNewPage() will be called here w/that object instead)
getPageData()