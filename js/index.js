import { typeImages, dummyData } from './lookups.js'
import { makePage, changePage, toggleNavArrows } from './pagination.js'
import { createPost, createDetailView } from './makeContent.js'
import { toggleContentVisibility, removeDetailBox } from './toggleVisibility.js'

// get a handle on the main box and next/previous buttons
const updatesBox = document.querySelector('#updates-box')
const nextPageButton = document.querySelector('#updates-box-nav-right')
const previousPageButton = document.querySelector('#updates-box-nav-left')

// Variables for Pagination Functions
let currentPage = 1;
const postsPerPage = 6
let numberOfPages;
let pageContents;

/****** New Page + Data Functions ******/
// general function to create new page
const createNewPage = posts => {
    // get the data for the page
    pageContents = makePage(posts, currentPage, postsPerPage)

    // create the page
    pageContents.forEach(post => createPost(post, typeImages))
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

    // to be really functional, this should querySelector updates-item-title and then call createDetailView on it
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

// on load, create the first page
getPageData()