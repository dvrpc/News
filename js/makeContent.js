/****** Helper functions ******/
const formatDate = createdAt => {
    const dateObj = new Date(createdAt)
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const year = dateObj.getFullYear().toString().substring(2)
    const datePosted = `${month}/${day}/${year}`

    return datePosted
}

const addToClipboard = () => {
    const baseURI = location.href
    const hiddenJawn = document.createElement('input')
    const linkCopied = document.createElement('div')
    const container = document.getElementById('detail-view-container')
    
    linkCopied.id = 'link-copied-overlay'

    //display: none and visibility: hidden prevent execCommand from working so hide it w/margin
    hiddenJawn.style.marginLeft = '-9999px'
    hiddenJawn.type = 'text'
    hiddenJawn.value = baseURI
    linkCopied.textContent = 'LINK COPIED'
    
    // hidden field has to be on the DOM for execCommand do work
    container.appendChild(hiddenJawn)
    container.appendChild(linkCopied)
    
    // add to clipboard
    hiddenJawn.select()
    hiddenJawn.setSelectionRange(0, 99999)
    document.execCommand('copy')

    // remove hidden field
    hiddenJawn.remove()

    // remove the overlay after 2 seconds
    window.setTimeout(() => {
        linkCopied.remove()
    }, 2000)
}



/****** Function to Create Updates Items ******/
/*
INPUT:
    - Post Img  (background for updates-item-img)
    - Post Type (event, press release, etc., overlay for updates-item-img-type)
    - Post Title (button textContent)
    - Post Link (posted location of resource)
    - Synopsis (blurb for fill view page)

OUTPUT:
    <div class="updates-item">
        <div class="updates-item-img-container">
            <div class="updates-item-img"></div>
            <img class="updates-item-img-type" src="" />
        </div>

        <button class="updates-item-title">Title</button>
    </div>       
*/
const createPost = (post, typeImages, updatesBox) => {

    // extract date posted and format it as mm/dd/yy
    const datePosted = formatDate(post.createdAt)
    
    // create the necessary elements
    const fragment = document.createDocumentFragment()
    const updatesItem = document.createElement('div')
    const imgContainer = document.createElement('div')
    const img = document.createElement('div')
    const imgType = document.createElement('img')
    const title = document.createElement('button')

    // add their classes
    imgContainer.classList.add('updates-item-img-container')
    updatesItem.classList.add('updates-item')
    img.classList.add('updates-item-img')
    imgType.classList.add('updates-item-img-type')
    title.classList.add('updates-item-title')

    // add content
    img.style.backgroundImage = `url('${post.img}')`
    imgType.src = typeImages[post.type]
    imgType.alt = `${post.type} post`
    title.textContent = `${datePosted} | ${post.title}`

    // append to jawns
    imgContainer.appendChild(img)
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
        <button id="details-view-copy-btn">SHARE</button>
        <a id="detail-view-link" href="">Learn More</a>
    </div>     
*/ 
const createDetailView = (post, typeImages, updatesBox) => {

    // extract date posted and format it as mm/dd/yy
    const datePosted = formatDate(post.createdAt)

    // create the necessary elements
    const fragment = document.createDocumentFragment()
    const detailViewContainer = document.createElement('div')
    const detailViewLeftArrow = document.createElement('button')
    const detailViewTitle = document.createElement('h2')
    const img = document.createElement('div')
    const imgType = document.createElement('img')
    const detailViewLink = document.createElement('a')
    const copyLinkBtn = document.createElement('button')
    const copyLinkImg = document.createElement('img')
    const detailViewParagraphWrapper = document.createElement('div')

    // add classes and ids
    detailViewContainer.id = 'detail-view-container'
    detailViewLeftArrow.id = 'detail-view-left'
    detailViewTitle.id = 'detail-view-title'
    img.id = 'detail-view-img'
    detailViewLink.id = "detail-view-link"
    copyLinkBtn.id = 'detail-view-copy-btn'
    img.classList.add('updates-item-img')
    img.classList.add('detail-view-img')
    imgType.classList.add('updates-item-img-type')
    imgType.classList.add('detail-view-img-type')
    detailViewLeftArrow.classList.add('nav-arrow')

    // add the content
    detailViewTitle.textContent = `${datePosted} | ${post.title}`
    detailViewLeftArrow.textContent = '\u2039'
    img.style.backgroundImage = `url('${post.img}')`

    imgType.src = typeImages[post.type]
    imgType.alt = `${post.type} post`
    detailViewParagraphWrapper.insertAdjacentHTML('afterbegin', post.blurb)
    copyLinkImg.src = './img/link.png'
    copyLinkBtn.textContent = 'SHARE'
    detailViewLink.textContent = 'Learn More'
    detailViewLink.href = post.link
    detailViewLink.rel = 'external'
    detailViewLink.target = '_blank'

    // add copy functionality
    copyLinkBtn.onclick = () => addToClipboard()

    // append children
    img.appendChild(imgType)
    copyLinkBtn.insertAdjacentElement('afterbegin', copyLinkImg)
    fragment.appendChild(detailViewLeftArrow)
    fragment.appendChild(detailViewTitle)
    fragment.appendChild(img)
    fragment.appendChild(detailViewParagraphWrapper)
    fragment.appendChild(copyLinkBtn)
    fragment.appendChild(detailViewLink)
    detailViewContainer.appendChild(fragment)
    updatesBox.appendChild(detailViewContainer)

    return detailViewLeftArrow
}

export { createPost, createDetailView }