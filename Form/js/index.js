/****** Basic Page Functionality ******/
// Get a handle on the necessary elements
const newPostToggle = document.querySelector('.new-post-button')
const editPostToggle = document.querySelector('.edit-post-button')
const newPostForm = document.querySelector('#new-form')
const editPostForm = document.querySelector('#edit-form-search')
const backButton = document.querySelector('#reset-form-view-button')

// reveal the forms on back button click
showForm = (buttons, form) => {
    buttons.forEach(button => button.style.display = 'none')
    form.style.display = 'flex'
    backButton.style.display = 'block'
}

// on back button click - hide both forms, reveal the toggle buttons and reset the 'edit post' back to the search bar
resetForms = () => {
    newPostForm.style.display = 'none'

    // change the form status from 'edit' to 'edit-search'
    editPostForm.id = 'edit-form-search'
    editPostForm.innerHTML = `
        <fieldset name="search" form="edit-form-search">
            <label for="search-entries">Search Posts: </label>
            <input type="search" name="search-entires" id="search-entries" />
            <button class="toggle-button edit-post-button post-button">Search</button>
        </fieldset>
    `
    editPostForm.style.display = 'none'
    backButton.style.display = 'none'

    newPostToggle.style.display = ''
    editPostToggle.style.display = ''
}

// apply click handlers
newPostToggle.onclick = () => showForm([newPostToggle, editPostToggle], newPostForm)
editPostToggle.onclick = () => showForm([newPostToggle, editPostToggle], editPostForm)
backButton.onclick = () => resetForms()


/****** API Calls ******/
// POST or PUT data and give user feedback
postData = async (data, endpoint, method) => {
    const options = data => {
        return {
            method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'http://intranet.dvrpc.org/'
            },
            body: JSON.stringify(data)
        }
    }

    const stream = await fetch(`http://10.1.1.194:3001/api/${endpoint}`, options(data))

    if(stream.ok){
        let customSuccess;

        method === 'POST' ? customSuccess = 'Post added to database,' : customSuccess = 'Post updated,'
        const success = `Success! ${customSuccess} please navigate to staging.dvrpc.org/newsroom/news to see the updated page.`

        alert(success)
        window.location.reload(true)
    }else{
        let customFail;

        method === 'POST' ? customFail = 'added.' : customFail = 'updated.'
        const fail = `Something went wrong and the post wasn't ${customFail} Please try again.`

        alert(fail)
    }
}

// GET existing posts to edit
findEntry = async title => {
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }
    
    const stream = await fetch(`http://10.1.1.194:3001/api/getPost/${title}`, options)
    let response;

    // return data or a useful error message
    stream.ok === true ? response = await stream.json() : response = stream.statusText

    return response
}


/****** Form Submission (GET, POST and PUT) ******/
// Format the Inputs
formatInputs = e => {
    e.preventDefault()
    let postData = {}
    const data = new FormData(e.target)

    // extract the key/value pairs and sanitize
    for(var [key, value] of data.entries()) {
        switch(key){
            case 'title':
                postData.title = value.trim()
                break
            case 'link':
                postData.link = value.trim()
                break
            case 'img':
                postData.img = value.trim()
                break
            case 'blurb':
                postData.blurb = value.trim()
                break
            case 'type':
                postData.type = value.trim()
                break
            default:
                console.log('suh dude')
        }
    }
    return postData
}

// Create a new Post
newPostForm.onsubmit = e => {
    const data = formatInputs(e)
    postData(data, 'addPost', 'POST')
}

// Edit a Post - earch and update
editPostForm.onsubmit = e => {
    e.preventDefault()

    let title = e.target[1].value.trim()
    title = encodeURI(title)
    
    // post will be the API response to the queried entry
    let post = findEntry(title)

    // depending on the reponse status, either create a pre-populated form or send some kind of 'post not found, please try again' message
    post.then(response => {
        //check if there's been an error
        if(typeof response === 'string'){
            alert(response + '. Please try again')
        // otherwise return a pre-populated submission form
        }else{
            // change the form status from 'edit-search' to 'edit'
            editPostForm.id = 'edit-form'
            editPostForm.innerHTML = `
                <fieldset name="title" form="edit-form">
                    <label for="title">Title: </label>
                    <input required type="text" name="title" id="title" value=${response.title}>
                </fieldset>

                <fieldset name="type" form="edit-form">
                    <label for="type">Type: </label>
                    <select name="type" id="type" value=${response.type}>
                        <option>Event</option>
                        <option>Press Release</option>
                        <option>Funding Available</option>
                        <option>New Data</option>
                        <option>New Report</option>
                        <option>Announcement</option>
                        <option>Business Opportunity</option>
                        <option>New Webmap</option>
                        <option>Public Meeting</option>
                    </select>
                </fieldset>

                <fieldset name="link" form="edit-form">
                    <label for="link">Link: </label>
                    <input required type="text" name="link" id="link" value=${response.link}>
                </fieldset>

                <fieldset name="img" form="edit-form">
                    <label for="img">Image: </label>
                    <input required type="text" name="img" id="img" value=${response.img}>
                </fieldset>

                <fieldset name="blurb" form="edit-form">
                    <label for="blurb">Blurb: </label>
                    <input required type="text" name="blurb" id="blurb" value="${response.blurb}">
                </fieldset>

                <button class="toggle-button new-post-button post-button" id="submit-edited-post">Submit</button>
            `

            editPostForm.insertAdjacentHTML('afterbegin', `<h2 id="edit-title">Edit Post "${response.title}":</h2>`)

            const updatePostForm = document.querySelector('#edit-form')

            updatePostForm.onsubmit = e => {
                const data = formatInputs(e)

                // update using the OLD title because we want to find that entry and replace its contents
                const formattedTitle = encodeURI(response.title)

                postData(data, `updatePost/${formattedTitle}`, 'PUT')
            }
        }
    })
}