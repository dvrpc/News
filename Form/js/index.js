/****** Imports and Necessary DOM Elements ******/
import { ariaHideModal, ariaShowModal } from './modals.js'
const newPostToggle = document.querySelector('.new-post-button')
const editPostToggle = document.querySelector('.edit-post-button')
const newPostForm = document.querySelector('#new-form')
const editPostForm = document.querySelector('#edit-form-search')
const backButton = document.querySelector('#reset-form-view-button')
const close = document.querySelector('#close-modal')
const optionsForm = document.querySelector('#options-form')
const modalSubheader = document.querySelector('#modal-subheader')



/****** Configure Quill Rich Text Editor ******/
// build a custom method to extract innerHTML from the editor b/c quill stores content in deltas (weird JSON object) and it's hard to consume
Quill.prototype.getHTML = function() {
    return this.container.querySelector('.ql-editor').innerHTML
}

// function to initialize the quill editor jawn (need one for submit and one for edit)
const createQuill = el => {
    return new Quill(el, {
        modules: {
            toolbar: [
                [{header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'link']
            ]
        },
        placeholder: 'Enter text hurrrr',
        theme: 'snow'
    })
}
const quill = createQuill('#editor')



/****** General Page Functionality ******/
// reveal the forms on back button click
const showForm = (buttons, form) => {
    buttons.forEach(button => button.style.display = 'none')
    form.style.display = 'flex'
    backButton.style.display = 'block'
}

// on back button click - hide both forms, reveal the toggle buttons and reset the 'edit post' back to the search bar
const resetForms = () => {
    newPostForm.style.display = 'none'

    // change the form status from 'edit' to 'edit-search'
    editPostForm.id = 'edit-form-search'
    editPostForm.innerHTML = `
        <fieldset name="search" form="edit-form-search">
            <label for="search-entries">Search Posts: </label>
            <input type="search" name="search-entries" id="search-entries" />
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

/****** Modal Functionality  *******/
close.onclick = function(){ariaHideModal()}



/****** API Calls ******/
// helper function for POSTing data so handling image updates is less cumbersome
const makePost = async (data, endpoint, method) => {
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
        alert('Post unable to be submited due to: ', error)
        console.error(error)
    }
}

// POST or PUT data and give user feedback
const postData = (data, endpoint, method, oldImg) => {

    // user doesn't update image, don't create a FileReader instance
    if(oldImg) {
        data.img = oldImg
        makePost(data, endpoint, method)

    // use does update image, create a FileReader instance to convert it to base64
    }else {
        const reader = new FileReader()
    
        // async so do all of the processing inside the scope of the filerReader
        reader.onloadend = async () => {
    
            // get the img as a base64 encoded string
            data.img = reader.result

            // POST the data
            makePost(data, endpoint, method)
        }    
        reader.readAsDataURL(data.img)
    }
}

// In the case of multiple responses from search, create a modal that lets the user choose which response they want
const populateSelectorModal = response => {
    const title = response[0].title
    let optionsInputs = ''

    // get unique information from the list of duplicates and present them as <li>
    response.forEach((el, index) => {

        // give each li an index which can be used to lookup its corresponding response object
        optionsInputs += `
        <input type="radio" value=${index} name="options" class="options" id="radio-${index}">
        <label class="options-label" for="radio-${index}">
            <div class="options-label-wrapper">
                <strong>Blurb: </strong> ${el.blurb} <br />
                <strong>Link: </strong> ${el.link}
            </div>
        </label>
        `    
    })

    modalSubheader.textContent = `Multiple posts with the title "${title}" found`
    optionsForm.insertAdjacentHTML('afterbegin', optionsInputs)
    
    // reveal the modal after all the content has been applied to it
    ariaShowModal()
}

// GET existing posts to edit
const findEntry = async title => {
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
    if(stream.ok === true){
        response = await stream.json()
    }else{
        response = stream.statusText
    }

    return response
}

// DELETE existing posts
const deleteEntry = async id => {
    const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json, charset=utf-8'
        }
    }

    const stream = await fetch(`http://10.1.1.194:3001/api/deletePost/${id}`, options)

    if(stream.status === 204){
        alert('Succesfully deleted the post')
        window.location.reload(true)
    }else{
        alert('Failed to delete')
    }
}


/****** Form Submission (CRUD) ******/
// Format the Inputs
const formatInputs = e => {
    e.preventDefault()
    let postData = {}
    const data = new FormData(e.target)

    // extract the key/value pairs and sanitize
    for(var [key, value] of data.entries()) {

        // remove whitespace before adding to the object (except for the uploaded img, which is an object)
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
            case 'type':
                postData.type = safeValue
                break
            default:
                console.log('suh dude')
        }
    }
    // extract HTML from Quill form using custom .getHTML() prototype method. Check if user is submitting a new post or an edit
    const editQuillContainer = document.getElementById('editor-2')
    
    if(editQuillContainer) {
        const editQuill = Quill.find(editQuillContainer)        
        postData.blurb = editQuill.getHTML()
    }else {
        postData.blurb = quill.getHTML()
    }
    
    return postData
}

// Create a new Post
newPostForm.onsubmit = e => {
    const data = formatInputs(e)
    postData(data, 'addPost', 'POST')
}

// helper function to handle user choice on img edits
const handleImgEdit = e => {
    let keepOldImg;
    const btn = e.target
    const btnName = btn.id.split('-')[0]

    // handle button clicks (ignore if user clicks the div but not one of the buttons)
    switch(btnName) {
        case 'yes':
            const imgInput = `<input required type="file" name="img" id="img" accept="image/png, image/jpeg">`
            const editImgWrapper = e.target.parentElement
            const editImgLabel = editImgWrapper.previousElementSibling
        
            editImgWrapper.remove()
            editImgLabel.insertAdjacentHTML('afterend', imgInput)
        
            keepOldImg = false
            break
        case 'no':
            const yesBtn = btn.previousElementSibling
        
            // handle accidentally clicking 'no' twice and removing the 'new img' label
            if(yesBtn.nodeName === 'BUTTON') yesBtn.style.display = 'none'
        
            // set 'no' btn to active style
            btn.style.background = '#cfdbd5'
            btn.style.color = '#fbfbff'
            btn.style.fontWeight = 700
        
            keepOldImg = true;
            break
        default:
            // default case - user clicked div but neither button
            return
    }

    return keepOldImg
}

// helper function to handle user input in the case of multiple found posts
const createEditFormAndHandleUserInput = response => {
    let keepOldImg;

    // change the form status from 'edit-search' to 'edit'
    editPostForm.id = 'edit-form'
    editPostForm.innerHTML = `
        <h2 id="edit-title">Edit Post "${response.title}":</h2>
        <fieldset name="title" form="edit-form" method="post">
            <label for="title">Title: </label>
            <input required type="text" name="title" id="title" value="${response.title}">
        </fieldset>

        <fieldset name="type" form="edit-form">
            <label for="type">Type: </label>
            <select name="type" id="type">
                <option value="Event">Event</option>
                <option value="PressRelease">Press Release</option>
                <option value="FundingAvailable">Funding Available</option>
                <option value="NewData">New Data</option>
                <option value="NewReport">New Report</option>
                <option value="Announcement">Announcement</option>
                <option value="BusinessOpportunity">Business Opportunity</option>
                <option value="NewWebmap">New Webmap</option>
                <option value="PublicMeeting">Public Meeting</option>
            </select>
        </fieldset>

        <fieldset name="link" form="edit-form">
            <label for="link">Link: </label>
            <input required type="text" name="link" id="link" value=${response.link}>
        </fieldset>

        <fieldset required name="img" form="edit-form">
            <label id="img-edit-label" for="img">New Img? </label>
            <div id="img-bool-wrapper">
                <button class="img-bool-btn" id="yes-new-img"type="button">Yes</button>
                <button class="img-bool-btn" id="no-new-img"type="button">No</button>
            </div>
        </fieldset>

        <fieldset name="blurb" form="news-form">
            <label for="blurb">Blurb: </label>
            <div id="editor-wrapper-2">
                <div id="editor-2"></div>
            </div>
        </fieldset>

        <div id="edit-form-buttons">
            <button name="edit" class="toggle-button edit-post-button post-button" id="submit-edited-post">Submit Edit</button>
            <button name="delete" class="toggle-button delete-post-button" id="delete-post">Delete Post</button>
        </div>
    `

    // set the Type field selected value to response.type after the field is generated
    const formattedType = response.type.split(' ').join('')
    const setType = document.querySelector(`#type option[value=${formattedType}]`)
    setType.selected = true

    // Create and populate Quill text editor with HTML response
    const quill2 = createQuill('#editor-2')
    quill2.clipboard.dangerouslyPasteHTML(response.blurb)

    // get a handle on interactive edit form elements
    const editImg = document.querySelector('#img-bool-wrapper')
    const updatePostForm = document.querySelector('#edit-form')
    const deleteButton = document.querySelector('#delete-post')

    // handle img updates/lack thereof
    editImg.onclick = e => {
        keepOldImg = handleImgEdit(e)
    }

    let deletePost = false

    // flip deletePost bool if the delete button is selected
    deleteButton.onfocus = e => deletePost = true

    const id = response.id
    
    // edit or delete the post, depending on which button was used to submit. Also handle passing existing img string when necessary
    updatePostForm.onsubmit = e => {
        keepOldImg ? submitEditOrDelete(e, deletePost, id, response.img) : submitEditOrDelete(e, deletePost, id)
    }
}

// Edit or delete an existing Post
const submitEditOrDelete = (e, deletePost, id, oldImg) => {
    e.preventDefault()

    // depending on user input, either update or destroy the post
    if(!deletePost){
        const data = formatInputs(e)
        oldImg ? postData(data, `updatePost/${id}`, 'PUT', oldImg) : postData(data, `updatePost/${id}`, 'PUT')
    }else{
        deleteEntry(id)
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
            if(response.length === 1){
                response = response[0]
                createEditFormAndHandleUserInput(response)
            }else{
                let index;
                populateSelectorModal(response)

                optionsForm.onsubmit = e => {
                    e.preventDefault()
                    index = document.querySelector('input[name="options"]:checked').value
                    response = response[index]
                    createEditFormAndHandleUserInput(response)
                    ariaHideModal()
                }
            }
        }
    })
}