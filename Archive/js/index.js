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

const posts = getPosts()

posts.then(post => {
    console.log('post ', post)
})