// lookup table to match post type with corresponding img (placeholder img for now)
const typeImages = {
    'Event': './img/types/Event.png',
    'Press Release': './img/types/PressRelease.png',
    'Funding Available': './img/types/FundingAvailable.png',
    'New Data': './img/types/NewData.png',
    'New Report': './img/types/NewReport.png',
    'Announcement': './img/types/Announcement.png',
    'Business Opportunity': './img/types/BusinessOpportunity.png',
    'New Webmap': './img/types/NewWebmap.png',
    'Public Meeting': './img/types/PublicMeeting.png'
}

// db entries will have this structure
const dummyData = [
    {
        img: 'https://i.pinimg.com/236x/73/fe/29/73fe29529249bd1b3b6d6fcc638fb342--landscape-architects-tropical-paradise.jpg',
        type: 'Event',
        title: 'Share-A-Ride Ridematch Service',
        link: 'http://www.catsinsinks.com',
        blurb: 'Just my luck, no ice. Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Is this my espresso machine? You really think you can fly that thing? Jaguar shark! Did he just throw my cat out of the window?'
    },
    {
        img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2011-05-2711:13/road-trip-1446065101.jpg?resize=768:*',
        type: 'Press Release',
        title: 'Making Trails Happen',
        link: 'http://www.catsinsinks.com',
        blurb: 'Life finds a way. Must go faster... go, go, go, go, go! Is this my espresso machine? Wh-what is-h-how did you get my espresso machine? Hey, you know how Im, like, always trying to save the planet? Heres my chance. '
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBdvehmlIsfvePeuVjVNk_GlFy28WM7oB8hCYwvS3gA6oy6xAI',
        type: 'New Report',
        title: 'Future of Moving People and Goods',
        link: 'http://www.catsinsinks.com',
        blurb: 'Life finds a way. You know what? It is beets. Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Youre a very talented young man, with your own clever thoughts and ideas. Do you need a manager? Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates dont eat the tourists.'
    },
    {
        img: 'https://www.asla.org/2015awards/img/96483_Lead.jpg',
        title: 'New Data Text Here',
        type: 'New Data',
        link: 'http://www.catsinsinks.com',
        blurb: 'This post comes fully loaded. AM/FM radio, reclining bucket seats, and... power windows. Yeah, but your scientists were so preoccupied with whether or not they could, they didnt stop to think if they should. Remind me to thank John for a lovely weekend. Jaguar shark! So tell me - does it really exist? You know what? It is beets. Ive crashed into a beet truck.'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/736528/big_square/788b965e743b763d785f250c91021a0abb7167e8.jpg',
        type: 'Announcement',
        title: 'FY 2018 DVRPC Annual Report',
        link: 'http://www.catsinsinks.com',
        blurb: 'Do you have any idea how long it takes those cups to decompose. Hey, you know how Im, like, always trying to save the planet? Heres my chance. God creates dinosaurs.'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/297107/big_square/1486b240629b74c53886b7210539fd3901c33167.jpg',
        type: 'Funding Available',
        title: 'Now hiring! Planner',
        link: 'http://www.catsinsinks.com',
        blurb: 'God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.'
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBdvehmlIsfvePeuVjVNk_GlFy28WM7oB8hCYwvS3gA6oy6xAI',
        type: 'Business Opportunity',
        title: 'An Opportunity for Business',
        link: 'http://www.catsinsinks.com',
        blurb: 'Life finds a way. Must go faster... go, go, go, go, go! Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/736528/big_square/788b965e743b763d785f250c91021a0abb7167e8.jpg',
        type: 'New Webmap',
        title: 'Its a Map and its on the Web',
        link: 'http://www.catsinsinks.com',
        blurb: 'Do you have any idea how long it takes those cups to decompose. Hey, you know how Im, like, always trying to save the planet? Heres my chance. God creates dinosaurs.'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/297107/big_square/1486b240629b74c53886b7210539fd3901c33167.jpg',
        type: 'Public Meeting',
        title: 'Its a Meeting and its Public',
        link: 'http://www.catsinsinks.com',
        blurb: 'Do you have any idea how long it takes those cups to decompose. Hey, you know how Im, like, always trying to save the planet? Heres my chance. God creates dinosaurs.'
    },
    {
        img: 'https://www.asla.org/2015awards/img/96483_Lead.jpg',
        type: 'Event',
        title: 'This is an Event',
        link: 'http://www.catsinsinks.com',
        blurb: 'God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.'
    },
    {
        img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2011-05-2711:13/road-trip-1446065101.jpg?resize=768:*',
        type: 'Press Release',
        title: 'Making Trails Happen',
        link: 'http://www.catsinsinks.com',
        blurb: 'Life finds a way. Must go faster... go, go, go, go, go! Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/736528/big_square/788b965e743b763d785f250c91021a0abb7167e8.jpg',
        type: 'Announcement',
        title: 'FY 2018 DVRPC Annual Report',
        link: 'http://www.catsinsinks.com',
        blurb: 'Do you have any idea how long it takes those cups to decompose. Hey, you know how Im, like, always trying to save the planet? Heres my chance. God creates dinosaurs.'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/297107/big_square/1486b240629b74c53886b7210539fd3901c33167.jpg',
        type: 'Funding Available',
        title: 'Now hiring! Planner',
        link: 'http://www.catsinsinks.com',
        blurb: 'God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.'
    },
    {
        img: 'https://d3e1o4bcbhmj8g.cloudfront.net/photos/736528/big_square/788b965e743b763d785f250c91021a0abb7167e8.jpg',
        type: 'New Webmap',
        title: 'Its a Map and its on the Web',
        link: 'http://www.catsinsinks.com',
        blurb: 'Do you have any idea how long it takes those cups to decompose. Hey, you know how Im, like, always trying to save the planet? Heres my chance. God creates dinosaurs.'
    }
]

export { typeImages, dummyData }