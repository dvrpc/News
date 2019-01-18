/****** Function to toggle updates-box main content visibility ******/
const toggleContentVisibility = (visibility, updatesBox) => {
    
    // remove detail-view-container if it exists
    visibility === '' ? removeDetailBox() : null

    const children = updatesBox.children
    const childrenLength = children.length

    // show/hide updates-box content 
    for(var i = 0; i < childrenLength; i++) children[i].style.display = visibility
}


/****** Helper Function to remove the detail page ******/
const removeDetailBox = () => {
    const detailViewContainer = document.querySelector('#detail-view-container')
    detailViewContainer.parentNode.removeChild(detailViewContainer)
}

export { toggleContentVisibility, removeDetailBox }