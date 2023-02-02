async function getRandomAnime() {
    let list = []
    while (list.length != 10) {
        let data = await fetch("https://api.jikan.moe/v4/random/anime")
        let res = await data.json()
        if (res.data.type.toLowerCase() == "tv" || res.data.type.toLowerCase() == "movie" || res.data.type.toLowerCase() == "ova") {
            list.push(res.data)
        }
    }
    return list
}

function loadAnime(anime_list) {
    let list_el = document.getElementById("anime-list").children
    
    for (let a = 0; a < list_el.length; a++) {
        let list_item = list_el[a]
        let anime = anime_list[a]
        let score = Math.floor(anime.score / 2)

        console.log(score)

        let anime_link = document.createElement("a")
        let anime_title = document.createElement("h1")
        let anime_episodes = document.createElement("h3")
        let anime_backdrop = document.createElement("div")
        let anime_cover = document.createElement("img")
        let anime_rating = document.createElement("div")
        let star_1 = document.createElement("span")
        let star_2 = document.createElement("span")
        let star_3 = document.createElement("span")
        let star_4 = document.createElement("span")
        let star_5 = document.createElement("span")
        let star_list = [star_5, star_4, star_3, star_2, star_1]

        anime_link.className = `anime--link`
        anime_link.href = `${anime.url}`
        anime_link.target = `_blank`
    
        anime_title.className = `anime--title`
        anime_title.innerHTML = `${anime.title}`
    
        anime_episodes.className = `anime--episodes`
        if (anime.episodes > 1) {anime_episodes.innerHTML = `${anime.episodes} Episodes`}
        else if (anime.episodes < 2) {anime_episodes.innerHTML = `${anime.episodes} Episode`}
    
        anime_backdrop.className = `anime--backdrop`
    
        anime_cover.className = `anime--cover`
        anime_cover.src = `${anime.images.jpg.image_url}`
    
        anime_rating.className = `anime--rating`
        
        star_1.className = `star`
        star_2.className = `star`
        star_3.className = `star`
        star_4.className = `star`
        star_5.className = `star`

        star_1.innerHTML = `☆`
        star_2.innerHTML = `☆`
        star_3.innerHTML = `☆`
        star_4.innerHTML = `☆`
        star_5.innerHTML = `☆`

        for (let b = 0; b < score; b++) {
            star_list[b].className = `star checked`
        }

        anime_rating.append(star_1)
        anime_rating.append(star_2)
        anime_rating.append(star_3)
        anime_rating.append(star_4)
        anime_rating.append(star_5)

        anime_link.append(anime_title)
        
        list_item.append(anime_link)
        list_item.append(anime_episodes)
        list_item.append(anime_backdrop)
        list_item.append(anime_cover)
        list_item.append(anime_rating)
    }
}

async function findAnime() {
    let name = document.getElementById("searchbar").value
    let data = await fetch(`https://api.jikan.moe/v4/anime?q=${name}`)
    let res = await data.json()
    console.log(res.data)
}

function reloadAnime() {
    let list_elem = document.getElementById("anime-list").children
    
    for (let a = 0; a < list_elem.length; a++) {
        let list_item = list_elem[a]
        list_item.replaceChildren("")
    }

    getRandomAnime().then(res => {loadAnime(res)}).catch(() => {reloadAnime()})
}

getRandomAnime().then(res => {loadAnime(res)})