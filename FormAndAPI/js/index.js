const form = document.querySelector('#news-form')


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
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

postData = async data => fetch('http://www.intranet.dvrpc.org/news/api/addPost', options(data))


/****** Do the things on submit ******/
form.onsubmit = e => {
    const data = formatInputs(e)
    postData(data)
}