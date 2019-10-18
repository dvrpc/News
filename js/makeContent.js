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
const createPost = (post, typeImages, updatesBox) => {

    // create the necessary elements
    const fragment = document.createDocumentFragment()
    const updatesItem = document.createElement('div')
    const imgContainer = document.createElement('div')
    const imgType = document.createElement('img')
    const title = document.createElement('button')

    // add their classes
    updatesItem.classList.add('updates-item')
    imgContainer.classList.add('updates-item-img-container')
    imgType.classList.add('updates-item-img-type')
    title.classList.add('updates-item-title')

    // add content
    imgContainer.style.backgroundImage = `url('${post.img}')`
    imgContainer.style.backgroundSize = 'cover'
    imgContainer.style.backgroundPosition = 'center center'
    imgContainer.style.backgroundRepeat = 'no-repeat'
    imgType.src = typeImages[post.type]
    imgType.alt = `${post.type} post`
    title.textContent = post.title

    // append to jawns
    imgContainer.appendChild(imgType)
    fragment.appendChild(imgContainer)
    fragment.appendChild(title)
    updatesItem.appendChild(fragment)
    updatesBox.appendChild(updatesItem)

    // return updatesItem to add createDetailView functionality
    return updatesItem
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
        <a id="detail-view-link" href="">Learn More</a>
    </div>     
*/ 
const createDetailView = (post, typeImages, updatesBox) => {

    // create the necessary elements
    const fragment = document.createDocumentFragment()
    const detailViewContainer = document.createElement('div')
    const detailViewLeftArrow = document.createElement('button')
    const detailViewTitle = document.createElement('h2')
    const imgContainer = document.createElement('div')
    const imgType = document.createElement('img')
    const detailViewLink = document.createElement('a')
    const detailViewParagraphWrapper = document.createElement('div')

    // add classes and ids
    detailViewContainer.id = 'detail-view-container'
    detailViewLeftArrow.id = 'detail-view-left'
    detailViewLeftArrow.classList.add('nav-arrow')
    detailViewTitle.id = 'detail-view-title'
    imgContainer.classList.add('updates-item-img-container')
    imgContainer.id = 'detail-view-img'
    imgType.classList.add('updates-item-img-type')
    detailViewLink.id="detail-view-link"

    // add the content
    detailViewTitle.textContent = post.title
    detailViewLeftArrow.textContent = '\u2039'
    imgContainer.style.backgroundImage = `url('${post.img}')`
    imgContainer.style.backgroundSize = 'cover'
    imgContainer.style.backgroundPosition = 'center center'
    imgContainer.style.backgroundRepeat = 'no-repeat'

    imgType.src = typeImages[post.type]
    imgType.alt = `${post.type} post`
    detailViewParagraphWrapper.insertAdjacentHTML('afterbegin', post.blurb)
    detailViewLink.textContent = 'Learn More'
    detailViewLink.href = post.link
    detailViewLink.rel = 'external'
    detailViewLink.target = '_blank'

    // append children
    fragment.appendChild(detailViewLeftArrow)
    fragment.appendChild(detailViewTitle)
    imgContainer.appendChild(imgType)
    fragment.appendChild(imgContainer)
    fragment.appendChild(detailViewParagraphWrapper)
    fragment.appendChild(detailViewLink)
    detailViewContainer.appendChild(fragment)
    updatesBox.appendChild(detailViewContainer)

    return detailViewLeftArrow
}

export { createPost, createDetailView }