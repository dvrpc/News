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
postData = (data, endpoint, method) => {
    
    // add filereader codeblock here b/c the POST has to happen within the scope (otherwise the entire back end needs to be updated)
    const reader = new FileReader()

    // do all of the processing inside the scope of the filerReader
    reader.onloadend = async () => {
        // get the img as a base64 encoded string
        data.img = reader.result
        
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

        try{
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
        }catch(error){
            console.error(error)
        }
    }

    reader.readAsDataURL(data.img)
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

// DELETE existing posts
deleteEntry = async title => {
    const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json, charset=utf-8'
        }
    }

    const stream = await fetch(`http://10.1.1.194:3001/api/deletePost/${title}`, options)

    if(stream.status === 204){
        alert('Succesfully deleted the post')
        window.location.reload(true)
    }else{
        alert('Failed to delete')
    }
}


/****** Form Submission (CRUD) ******/
// Format the Inputs
formatInputs = e => {
    e.preventDefault()
    let postData = {}
    const data = new FormData(e.target)

    // extract the key/value pairs and sanitize (do more sanitization here. Maybe add a regex before/after trim that searches for and removes special characters)
    for(var [key, value] of data.entries()) {
        switch(key){
            case 'title':
                postData.title = value.trim()
                break
            case 'link':
                postData.link = value.trim()
                break
            case 'img':
                postData.img = value
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

// Edit or delete an existing Post
submitEditOrDelete = (e, deletePost, title) => {
    e.preventDefault()

    // depending on user input, either update or destroy the post
    if(!deletePost){
        const data = formatInputs(e)
        postData(data, `updatePost/${title}`, 'PUT')
    }else{
        deleteEntry(title)
    }
}

// capture user input for editing or deleting an existing Post
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
            console.log('response img ', response.img)
            // change the form status from 'edit-search' to 'edit'
            editPostForm.id = 'edit-form'
            editPostForm.innerHTML = `
                <fieldset name="title" form="edit-form" method="post">
                    <label for="title">Title: </label>
                    <input required type="text" name="title" id="title" value="${response.title}">
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
                    <input required type="file" name="img" id="img" accept="image/png, image/jpeg">
                </fieldset>

                <fieldset name="blurb" form="edit-form">
                    <label for="blurb">Blurb: </label>
                    <input required type="text" name="blurb" id="blurb" value="${response.blurb}">
                </fieldset>

                <div id="edit-form-buttons">
                    <button name="edit" class="toggle-button edit-post-button post-button" id="submit-edited-post">Submit Edit</button>
                    <button name="delete" class="toggle-button delete-post-button" id="delete-post">Delete Post</button>
                </div>
            `

            editPostForm.insertAdjacentHTML('afterbegin', `<h2 id="edit-title">Edit Post "${response.title}":</h2>`)

            const updatePostForm = document.querySelector('#edit-form')
            const deleteButton = document.querySelector('#delete-post')
           
            let deletePost = false

            // flip deletePost bool if the delete button is selected
            deleteButton.onfocus = e => deletePost = true

            const formattedTitle = encodeURI(response.title)
            
            // edit or delete the post, depending on which button was used to submit
            updatePostForm.onsubmit = e => submitEditOrDelete(e, deletePost, formattedTitle)
        }
    })
}