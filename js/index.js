import { typeImages } from './lookups.js'
import { makePage, changePage, toggleNavArrows } from './pagination.js'
import { createPost, createDetailView } from './makeContent.js'
import { toggleContentVisibility } from './toggleVisibility.js'

// get a handle on the main box and next/previous buttons
const updatesBox = document.querySelector('#updates-box')
const nextPageButton = document.querySelector('#updates-box-nav-right')
const previousPageButton = document.querySelector('#updates-box-nav-left')
const filter = document.querySelector('#cat-filter')

// Variables for Pagination Functions
let currentPage = 1
const postsPerPage = 4
let numberOfPages;
let pageContents;
let selectedCategory = 'View All'
let length;

const getPosts = async () => {
    try{
        const stream = await fetch('http://10.1.1.194:3001/api/getTop18')
        const data = await stream.json()
        return data        
    }
    catch(error) {
        console.error(error)
    }
}


/****** New Page + Data Functions ******/
// general function to create new page
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

        // get a handle on the img and title so that hover effects can jawn em up
        let [img, title] = [...updatesItem.children]        

        // change background and link color on hover, remove them on mouse leave
        updatesItem.onmouseenter = () => {
            updatesItem.style.cursor = 'pointer'
            title.style.color = '#03688d'
            img.style.background = '#03688D'
        }
        updatesItem.onmouseleave = () => {
            updatesItem.style.cursor = ''
            title.style.color = ''
            img.style.background = `url('${post.img}') center no-repeat`
        }
    })
}

const getPageData = async filter => {
    const data = getPosts()

    data.then(posts => {
        if(filter){
            posts = posts.filter(post => post.type === filter)

            // force currentPage to 1 to reset the pagination jawn
            currentPage = 1

            // handle 'no results' case
            if(!posts.length){
                numberOfPages = 1
                toggleNavArrows(currentPage, numberOfPages, nextPageButton, previousPageButton)
                noPosts()
                return
            }
        }

        // calculate length to determine how many pages to create from the data set or show noPosts message
        length = posts.length
        numberOfPages = Math.ceil(length / postsPerPage)
        
        // update the navigation arrows based on the results of the filter
        toggleNavArrows(currentPage, numberOfPages, nextPageButton, previousPageButton)

        createNewPage(posts)
    })
}


/****** Navigation Arrow Functions ******/
// update page contents, create a new one and adjust arrows (when necessary)
const navButtonClick = direction => {

    // update currentPage and clear updatesBox of old content
    currentPage = changePage(direction, currentPage, updatesBox)
    
    selectedCategory === 'View All' ? getPageData() : getPageData(selectedCategory)

    toggleNavArrows(currentPage, numberOfPages, nextPageButton, previousPageButton)
}

nextPageButton.onclick = () => navButtonClick('next')
previousPageButton.onclick = () => navButtonClick('')


/****** Category Filter ******/
const filterCategories = () => {
    // get a handle on the selected category
    selectedCategory = filter.options[filter.selectedIndex].text.trim()

    // clear the jawn (while(parent.firstChild) is apparently faster than parent.innerHTML = '')
    while(updatesBox.firstChild){
        updatesBox.removeChild(updatesBox.firstChild)
    }

    // call getPageData with the included filter (or lack thereof)
    selectedCategory === 'View All' ? getPageData() : getPageData(selectedCategory)
}

filter.onchange = () => filterCategories()

// handle a no posts case
const noPosts = () => {
    const noResults = document.createElement('h2')
    noResults.textContent = 'No posts found'
    noResults.id = 'no-results-post-filter'

    while(updatesBox.firstChild){
        updatesBox.removeChild(updatesBox.firstChild)
    }

    updatesBox.appendChild(noResults)
}

// on load, create the first page (with db, getPageData will be refactored to return a data PROMISE, which will replace all instances of dummyData etc., and then createNewPage() will be called here w/that object instead)
getPageData()