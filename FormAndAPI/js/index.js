/****** Buttons to toggle form visibility ******/
const newPostToggle = document.querySelector('.new-post-button')
const editPostToggle = document.querySelector('.edit-post-button')
const newPostForm = document.querySelector('#new-form')
const editPostForm = document.querySelector('#edit-form')
const backButton = document.querySelector('#reset-form-view-button')

newPostToggle.onclick = () => showForm([newPostToggle, editPostToggle], newPostForm)
editPostToggle.onclick = () => showForm([newPostToggle, editPostToggle], editPostForm)
backButton.onclick = () => resetForms()

// this should be fleshed so that it doesn't suck
// on button click, reveal its corresponding form elements and hide the other button
    // also reveal a 'back' arrow - to reset the view
// 
showForm = (buttons, form) => {
    buttons.forEach(button => button.style.display = 'none')
    form.style.display = 'flex'
    backButton.style.display = 'block'
}

// on back button click - hide both forms and reveal both buttons
resetForms = () => {
    newPostForm.style.display = 'none'
    editPostForm.style.display = 'none'
    backButton.style.display = 'none'

    newPostToggle.style.display = ''
    editPostToggle.style.display = ''
}


/****** Format the Inputs ******/
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


/****** Post to the DB ******/
const options = data => {
    return {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost'
        },
        body: JSON.stringify(data)
    }
}
//http://intranet.dvrpc.org/News/api/addPost
postData = data => fetch('http://localhost:3001/api/addPost', options(data)).then(res => console.log(res))


/****** Do the things on submit ******/
newPostForm.onsubmit = e => {
    const data = formatInputs(e)
    postData(data)
}