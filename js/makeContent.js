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
const createPost = (post, typeImages, createDetailView) => {

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
const createDetailView = (post, toggleContentVisibility) => {

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

export { createPost, createDetailView }