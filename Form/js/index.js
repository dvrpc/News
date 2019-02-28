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

// In the case of multiple responses from search, create a modal that lets the user choose which response they want
createSelectorModal = response => {
    const title = response[0].title
    let listItems = ''

    // get unique information from the list of duplicates and present them as <li>
    response.forEach((el, index) => {
        
        // give each li an index which can be used to lookup its corresponding response object
        listItems += `
        <li id=${index} class="options">
            <strong>Blurb: </strong> ${el.blurb} <br />
            <strong>Link: </strong> ${el.link}
        </li>
        <hr />
        `
    })

    const modal = `
    <div id="modal" role="dialog">
        <div id="modal-content">
            <span id="close-modal">&times;</span>
            <h2 class="modal-headers">Multiple posts with the title "${title}" found</h2>
            <h3 class="modal-headers">Please click the one you want to edit:</h3>
            <ul id="options-list">
                ${listItems}
            </ul>
        </div>
    </div>
    `
    
    editPostForm.insertAdjacentHTML('beforebegin', modal)
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
    //stream.ok === true ? response = await stream.json() : response = stream.statusText

    if(stream.ok === true){
        response = await stream.json()
        
        // figure out if there's one or multiple responses
        // if one, extract it as post
        // if multiple, list them out in a modal and set response to the user selected choice
        if(response.length === 1){
            response = response[0]
        }else{
            createSelectorModal(response)
            let chosen;

            const optionsList = document.querySelector('#options-list')
    
            optionsList.onclick = e => {
                const node = e.target.nodeName
        
                if(node != 'UL'){
                    const id = e.target.id
                    chosen = response[id]
                    return chosen
                }
            }
        
            // @TODO: 
                // extract the value of chosen and return it
                // clicking on a list item triggers the close modal function
        }

    }else{
        response = stream.statusText
    }

    console.log('response after the jawn sesh ', response)

    // need to add some kind of wait step here - until response is defined, don't return response
    // this is to allow time for users to select an option from the modal, in case that happens
    // ex: while(!response){do nothing? or something? this seems like a bad approach}

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

    // extract the key/value pairs and sanitize
    for(var [key, value] of data.entries()) {

        // basic input sanitization before adding to the object (except for the uploaded img, which is an object)
        var safeValue = key !== 'img' ? value.trim() : value

        switch(key){
            case 'title':
                postData.title = safeValue
                break
            case 'link':
                postData.link = safeValue
                break
            case 'img':
                postData.img = safeValue
                break
            case 'blurb':
                postData.blurb = safeValue
                break
            case 'type':
                postData.type = safeValue
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
                    <textarea required name="blurb" id="blurb">${response.blurb}</textarea>
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