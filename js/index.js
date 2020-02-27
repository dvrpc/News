import { typeImages } from './lookups.js'
import { makePage, changePage, toggleNavArrows } from './pagination.js'
import { createPost, createDetailView } from './makeContent.js'
import { toggleContentVisibility } from './toggleVisibility.js'

// get a handle on the main box and next/previous buttons
const updatesBox = document.getElementById('updates-box')
const nextPageButton = document.getElementById('updates-box-nav-right')
const previousPageButton = document.getElementById('updates-box-nav-left')
const filter = document.getElementById('cat-filter')

// Variables for Pagination Functions
let currentPage = 1
const postsPerPage = 4
let numberOfPages;
let pageContents;
let selectedCategory = 'View All'
let length;

/****** Get the Data ******/
const getPosts = async () => {
    try{
        const stream = await fetch('https://alpha.dvrpc.org/news/getTop18')
        const data = await stream.json()
        return data        
    }
    catch(error) {
        console.error(error)
    }
}
const getSpecificPost = async id => {
    try {
        const stream = await fetch(`https://alpha.dvrpc.org/news/getPublicPost/${id}`)
        const data = await stream.json()
        return data
    }
    catch(error) {
        console.error(error)
    }
}

/****** Helper function to reset url *******/
const resetURI = () => {
    const origin = location.origin
    const pathname = location.pathname
    const defaultURI = origin + pathname
    history.pushState({home: defaultURI}, 'Newsroom', defaultURI)
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

                // remove post identifier from URI
                resetURI()
            }
            
            // update uri for link sharing (this is not intended to be a full routing solution)
            const id = post.id
            const baseURI = location.href
            const pageURI = `${baseURI}?post=${id}`
            history.pushState({post: id}, `Newsroom post ${id}`,pageURI)
        }
    })
}

const getPageData = async filter => {
    const loading = document.getElementById('updates-box-loading')

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

        // remove loading gif
        loading.style.display = 'none'
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

    // clear the jawn
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

// fake routing by giving people the ability to share links
const getLinkedPost = id => {
    id = parseInt(id)
    const data = getSpecificPost(id)

    // hide the nav arrows
    nextPageButton.style.display = 'none'
    previousPageButton.style.display = 'none'

    data.then(post => {
        // handle 'no results' case i.e. a broken link or something like that
        if(!post){
            numberOfPages = 1
            toggleNavArrows(currentPage, numberOfPages, nextPageButton, previousPageButton)
            noPosts()
            return
        }

        const detailViewLeftArrow = createDetailView(post, typeImages, updatesBox)
    
        // go to default homepage (update url, remove detail box and get default data)
        detailViewLeftArrow.onclick = () => {
            resetURI()
            toggleContentVisibility('', updatesBox)
            getPageData()
        }
    })
}

// load homepage or a specific post depending on URL (again: not a routing solution just a way to share links)
const postCheck = location.href.split('?post=')[1]
postCheck ? getLinkedPost(postCheck) : getPageData()