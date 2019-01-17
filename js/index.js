// db entries will have this structure
const dummyData = [
    {
        img: 'https://i.pinimg.com/236x/73/fe/29/73fe29529249bd1b3b6d6fcc638fb342--landscape-architects-tropical-paradise.jpg',
        type: 'Event',
        title: 'Share-A-Ride Ridematch Service Makes Commuting Easier in Southeastern PA',
        link: 'http://www.catsinsinks.com',
        blurb: 'Just my luck, no ice. Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Is this my espresso machine?'
    },
    {
        img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2011-05-2711:13/road-trip-1446065101.jpg?resize=768:*',
        type: 'Press Release',
        title: 'Making Trails Happen',
        link: 'http://www.catsinsinks.com',
        blurb: 'Life finds a way. Must go faster... go, go, go, go, go! Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?'
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBdvehmlIsfvePeuVjVNk_GlFy28WM7oB8hCYwvS3gA6oy6xAI',
        type: 'New Report',
        title: 'Future of Moving People and Goods',
        link: 'http://www.catsinsinks.com',
        blurb: 'Life finds a way. You know what? It is beets. Eventually, you do plan to have dinosaurs on your dinosaur tour, right?'
    },
    {
        img: 'https://www.asla.org/2015awards/img/96483_Lead.jpg',
        title: 'New Data Text Here',
        type: 'New Data',
        link: 'http://www.catsinsinks.com',
        blurb: 'This post comes fully loaded. AM/FM radio, reclining bucket seats, and... power windows. Yeah, but your scientists were so preoccupied with whether or not they could, they didnt stop to think if they should. Remind me to thank John for a lovely weekend. Jaguar shark! So tell me - does it really exist? You know what? It is beets. Ive crashed into a beet truck.'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/736528/big_square/788b965e743b763d785f250c91021a0abb7167e8.jpg',
        type: 'Announcement',
        title: 'FY 2018 DVRPC Annual Report',
        link: 'http://www.catsinsinks.com',
        blurb: 'Do you have any idea how long it takes those cups to decompose. Hey, you know how Im, like, always trying to save the planet? Heres my chance. God creates dinosaurs.'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/297107/big_square/1486b240629b74c53886b7210539fd3901c33167.jpg',
        type: 'Funding Available',
        title: 'Now hiring! Transportation Planner, Freight & Aviation Programs',
        link: 'http://www.catsinsinks.com',
        blurb: 'God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.'
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBdvehmlIsfvePeuVjVNk_GlFy28WM7oB8hCYwvS3gA6oy6xAI',
        type: 'Business Opportunity',
        title: 'An Opportunity for Business',
        link: 'http://www.catsinsinks.com',
        blurb: 'Life finds a way. Must go faster... go, go, go, go, go! Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/736528/big_square/788b965e743b763d785f250c91021a0abb7167e8.jpg',
        type: 'New Webmap',
        title: 'Its a Map and its on the Web',
        link: 'http://www.catsinsinks.com',
        blurb: 'Do you have any idea how long it takes those cups to decompose. Hey, you know how Im, like, always trying to save the planet? Heres my chance. God creates dinosaurs.'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/297107/big_square/1486b240629b74c53886b7210539fd3901c33167.jpg',
        type: 'Public Meeting',
        title: 'Its a Meeting and its Public',
        link: 'http://www.catsinsinks.com',
        blurb: 'Do you have any idea how long it takes those cups to decompose. Hey, you know how Im, like, always trying to save the planet? Heres my chance. God creates dinosaurs.'
    },
    {
        img: 'https://www.asla.org/2015awards/img/96483_Lead.jpg',
        type: 'Event',
        title: 'This is an Event',
        link: 'http://www.catsinsinks.com',
        blurb: 'God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.'
    },
    {
        img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2011-05-2711:13/road-trip-1446065101.jpg?resize=768:*',
        type: 'Press Release',
        title: 'Making Trails Happen',
        link: 'http://www.catsinsinks.com',
        blurb: 'Life finds a way. Must go faster... go, go, go, go, go! Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/736528/big_square/788b965e743b763d785f250c91021a0abb7167e8.jpg',
        type: 'Announcement',
        title: 'FY 2018 DVRPC Annual Report',
        link: 'http://www.catsinsinks.com',
        blurb: 'Do you have any idea how long it takes those cups to decompose. Hey, you know how Im, like, always trying to save the planet? Heres my chance. God creates dinosaurs.'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/297107/big_square/1486b240629b74c53886b7210539fd3901c33167.jpg',
        type: 'Funding Available',
        title: 'Now hiring! Transportation Planner, Freight & Aviation Programs',
        link: 'http://www.catsinsinks.com',
        blurb: 'God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/736528/big_square/788b965e743b763d785f250c91021a0abb7167e8.jpg',
        type: 'New Webmap',
        title: 'Its a Map and its on the Web',
        link: 'http://www.catsinsinks.com',
        blurb: 'Do you have any idea how long it takes those cups to decompose. Hey, you know how Im, like, always trying to save the planet? Heres my chance. God creates dinosaurs.'
    }
]

// lookup table to match post type with corresponding img (placeholder img for now)
const typeImages = {
    'Event': './img/types/Event.png',
    'Press Release': './img/types/PressRelease.png',
    'Funding Available': './img/types/FundingAvailable.png',
    'New Data': './img/types/NewData.png',
    'New Report': './img/types/NewReport.png',
    'Announcement': './img/types/Announcement.png',
    'Business Opportunity': './img/types/BusinessOpportunity.png',
    'New Webmap': './img/types/NewWebmap.png',
    'Public Meeting': './img/types/PublicMeeting.png'
}

// get a handle on the main box
const updatesBox = document.querySelector('#updates-box')


/****** Function to Create Updates Items ******/
/*
INPUT:
    - Post Img  (background for updates-item-img-container)
    - Post Type (event, press release, etc., overlay for updates-item-img-type)
    - Post Title (button textContent)
    - Post Link (posted location of resource)
    - Synopsis (blurb for fill view page)

OUTPUT:
    <div class="updates-item">
        <div class="updates-item-img-container">
            <img class="updates-item-img-type" src="" />
        </div>

        <button class="updates-item-title">Title</button>
    </div>       
*/
createPost = post => {

    // create the necessary elements
    const fragment = document.createDocumentFragment()
    const updatesItem = document.createElement('div')
    const imgContainer = document.createElement('div')
    const imgType = document.createElement('img')
    const link = document.createElement('button')

    // add their classes
    updatesItem.classList.add('updates-item')
    imgContainer.classList.add('updates-item-img-container')
    imgType.classList.add('updates-item-img-type')
    link.classList.add('updates-item-title')

    // add content
    imgContainer.style.background = `url('${post.img}') center no-repeat`
    imgType.src = typeImages[post.type]
    link.textContent = post.title
    
    // add functionality
    link.onclick = () => createDetailView(post)

    // append to jawns
    imgContainer.appendChild(imgType)
    fragment.appendChild(imgContainer)
    fragment.appendChild(link)
    updatesItem.appendChild(fragment)
    updatesBox.appendChild(updatesItem)
}

// Pagination Functions
let currentPage = 1;
const postsPerPage = 6
let numberOfPages;
let pageContents;

// might as well prepare it for db response
getPageData = async () => {
    //const stream = await fetch('endpoint.com')
    //const posts = await stream.json()
    
    const posts = dummyData
    const length = posts.length

    // calculate how many pages to create from the data set
    numberOfPages = Math.ceil(length / postsPerPage)

    // create the first page
    makePage(posts)
}

const makePage = data => {
    const begin = ((currentPage - 1) * postsPerPage)
    const end = begin + postsPerPage
    
    // get the right data for the given page
    pageContents = data.slice(begin, end)

    // populage the page w/the right information
    pageContents.forEach(post => createPost(post))
}

// add clicks handlers to next/previous button
const nextPageButton = document.querySelector('#updates-box-nav-right')
const previousPageButton = document.querySelector('#updates-box-nav-left')

nextPageButton.onclick = () => changePage('next')
previousPageButton.onclick = () => changePage('')

changePage = direction => {
    
    // determine which arrow was clicked
    direction === 'next' ? currentPage += 1 : currentPage -= 1
    
    // remove old page contents
    updatesBox.innerHTML = ''

    // make the correct page (this will NOT work with async response b/c its outside the scope of the function but testing it w/dummy data for now)
    makePage(dummyData)
    toggleNavArrows()
}

// show/hide left/ride arrow depending on jawnasaurus
toggleNavArrows = () => {
    currentPage === numberOfPages ? nextPageButton.style.display = 'none' : nextPageButton.style.display = 'block'
    currentPage === 1 ? previousPageButton.style.display = 'none' : previousPageButton.style.display = 'block'
}

getPageData()


/****** Function to create detail view from post info ******/
/*
INPUT:
    - Post Img  (detail-view-img srce)
    - Post Title (detail-view-title textContent)
    - Post Link (posted location of resource)
    - Synopsis (paragraph(s) textContent)

OUTPUT:
    <div id="detail-view-container">
        <button id="detail-view-left" class="nav-arrow nav-arrow-left"></button>
        <img id="detail-view-img" src="">
        <h2 id="detail-view-title"></h2>
        <p></p>
        <a id="detail-view-link" href="">View the Data</a>
    </div>     
*/ 
createDetailView = post => {

    // first hide all the contents of updates-box + the nav arrows
    toggleContentVisibility('none')
    nextPageButton.style.display = 'none'
    previousPageButton.style.display = 'none'

    // create the necessary elements
    const fragment = document.createDocumentFragment()
    const detailViewContainer = document.createElement('div')
    const detailViewLeftArrow = document.createElement('button')
    const detailViewTitle = document.createElement('h2')
    const detailViewImg = document.createElement('img')
    const detailViewParagraph = document.createElement('p') // eventually this will call a function that loops thru the blurb field and outputs the correct # of <p> tags
    const detailViewLink = document.createElement('a')

    // add classes and ids
    detailViewContainer.id = 'detail-view-container'
    detailViewLeftArrow.id = 'detail-view-left'
    detailViewLeftArrow.classList.add('nav-arrow')
    detailViewTitle.id = 'detail-view-title'
    detailViewImg.id = 'detail-view-img'
    detailViewLink.id="detail-view-link"

    // add the content
    detailViewTitle.textContent = post.title
    detailViewLeftArrow.textContent = '\u2039'
    detailViewImg.src = post.img
    detailViewImg.alt = 'some kind of alt text'
    detailViewParagraph.textContent = post.blurb
    detailViewLink.textContent = 'View the Data'
    detailViewLink.href = post.link
    detailViewLink.rel = 'external'

    // add functionality
    detailViewLeftArrow.onclick = () => toggleContentVisibility('')

    // append children
    fragment.appendChild(detailViewLeftArrow)
    fragment.appendChild(detailViewImg)
    fragment.appendChild(detailViewTitle)
    fragment.appendChild(detailViewParagraph)
    fragment.appendChild(detailViewLink)
    detailViewContainer.appendChild(fragment)
    updatesBox.appendChild(detailViewContainer)
}


/****** Function to toggle updates-box main content visibility ******/

// inputs: '' or 'none'

toggleContentVisibility = visibility => {
    
    // remove detail-view-container if it exists
    visibility === '' ? removeDetailBox() : null

    // show/hide main nav arrows
    toggleNavArrows()

    const children = updatesBox.children
    const childrenLength = children.length

    // show/hide updates-box content 
    for(var i = 0; i < childrenLength; i++) children[i].style.display = visibility
}


/****** Function to remove the detail jawn ******/
removeDetailBox = () => {
    const detailViewContainer = document.querySelector('#detail-view-container')
    detailViewContainer.parentNode.removeChild(detailViewContainer)
}