const getPosts = async () => {
    try{
        const stream = await fetch('http://10.1.1.194:3001/api/getAll')
        const data = await stream.json()
        return data        
    }
    catch(error) {
        console.error(error)
    }
}

const response = getPosts()

response.then(posts => {
    console.log('posts ', posts)
    if(posts) {
        const list = document.querySelector('#archive-ul')
        //posts.forEach
    }else{
        console.log('error ')
    }
})

// build da ting
/*
    General Layout:
        <ul id="details-wrapper">    
            <details class="year-details">
                <summary class="year-summary">The Year</summary>
                <details class="month-details">
                    <summary class="month-summary">The Month</summary>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <h2>Post Title</h2>
                            <img class="post-img" src="base64 img string" alt="post title + img" />
                            <p>Post Content</p>
                            <a href="Post Link" rel="external">Read More</a>
                        </li>
                    </ul>
                </details>
            </details>
        </ul>

    Parse the date created for each response item and make the following decisions:
        **IF the year and month exist, create the following template string:
            const entry = `
                <li class="list-group-item">
                    <h2>{Post Title}</h2>
                    <img class="post-img" src="base64 img string" alt={post title} image" />
                    <p>{Post Content}</p>
                    <a href="{Post Link}" rel="external">Read More</a>
                </li>
            `
            get a handle on the correct month's <ul>
            <ul>.insertAdjacentHTML('beforeend', entry)

        **IF the year exists but the month doesn't, create the following template string:
            const entryWithMonth = `
                <details class="month-details">
                    <summary class="month-summary">{The Month}</summary>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <h2>{Post Title}</h2>
                            <img class="post-img" src="base64 img string" alt={post title} image" />
                            <p>{Post Content}</p>
                            <a href="{Post Link}" rel="external">Read More</a>
                        </li>
                    </ul>
                </details>
            `
            get a handle on the correct year's <details>
            <details>.insertAdjacentHTML('beforeend', entryWithMonth)

        **IF neither the year nor the month exist, create the following template string:
            const entryWithMonthAndYear = `
                <details class="year-details">
                    <summary>{The Year}</summary>
                    <details class="month-details">
                        <summary class="month-summary">{The Month}</summary>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h2>{Post Title}</h2>
                                <img class="post-img" src="base64 img string" alt={post title} image" />
                                <p>{Post Content}</p>
                                <a href="{Post Link}" rel="external">Read More</a>
                            </li>
                        </ul>
                    </details>
                </details>
            `
            get a handle on <ul id="details-wrapper">
            <ul>.insertAdjacentHTML('beforeend', entryWithMonthAndYear)

    Lazy load each block of posts. Check if they exist first before making the db call to avoid redundant calls
*/
const buildListItems = post => {
    
}