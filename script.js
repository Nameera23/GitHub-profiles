const ApiURl = 'https://api.github.com/users/'

const form= document.getElementById('form')
const search= document.getElementById('search')
const main= document.getElementById('main')

async function getUser(userName){
    try{
        const { data } = await axios(ApiURl + userName)
       
        createUserCard(data)
        getRepos(userName)
    } catch(err) {
        if(err.response.status == 404)
        {
            console.log(err)
        createErrorCard('No user with this profile')
    }
}
}

async function getRepos(userName){
    try{
        const { data } = await axios(ApiURl + userName + '/repos')
       
        addReposToCard(data)
    } catch(err) {
       
        createErrorCard('Fetching issues')
}
}

function addReposToCard(repos){
    const reposEl = document.getElementById('repo')
    repos.slice(0,10).forEach(repo => {
        const repoEl =document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerText = repo.name
        reposEl.appendChild(repoEl)
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user= search.value

    if(user){
        getUser(user)
        search.value = ''
    }
})

function createErrorCard(msg) {
    const cardHtml = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `
    main.innerHTML = cardHtml
}

function createUserCard(user){
    const cardHtml=`
    <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li> ${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repost</strong></li>
                </ul>

                <div id="repo">
                </div>
            </div>
        </div>
    `
    main.innerHTML = cardHtml
}
