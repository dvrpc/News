/****** Function to toggle updates-box main content visibility ******/
const toggleContentVisibility = visibility => {
    
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
const removeDetailBox = () => {
    const detailViewContainer = document.querySelector('#detail-view-container')
    detailViewContainer.parentNode.removeChild(detailViewContainer)
}

export { toggleContentVisibility, removeDetailBox }