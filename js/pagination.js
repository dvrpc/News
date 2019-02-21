// returns the created page contents that can be fed into createPost
const makePage = (data, currentPage, postsPerPage) => {
    const begin = ((currentPage - 1) * postsPerPage)
    const end = begin + postsPerPage
    
    // get the right data for the given page
    const contents = data.slice(begin, end)

    return contents
}

// update page tracking variable & remove old page contents
const changePage = (direction, currentPage, updatesBox) => {
    
    // determine which arrow was clicked
    direction === 'next' ? currentPage += 1 : currentPage -= 1
    
    // remove old page contents
    while(updatesBox.firstChild){
        updatesBox.removeChild(updatesBox.firstChild)
    }

    return currentPage
}

// show/hide left/ride arrow depending on jawnasaurus
const toggleNavArrows = (currentPage, numberOfPages, nextPageButton, previousPageButton) => {
    currentPage === numberOfPages ? nextPageButton.style.display = 'none' : nextPageButton.style.display = 'block'
    currentPage === 1 ? previousPageButton.style.display = 'none' : previousPageButton.style.display = 'block'
}

export { makePage, changePage, toggleNavArrows }