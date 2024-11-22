const api = 'https://api.github.com/users/'
const form = document.querySelector('form')
const input = document.querySelector('#inp')
const btn = document.querySelector('#add')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!input.value.trim().length)
        return alert('Введите пользователя!')

    const api = 'https://api.github.com/users/'
    const userName = document.querySelector('#inp').value.trim()

    if (userName) {
        const userApi = `${api}${userName}`

        fetch(userApi)
            .then(response => {
                if (!response.ok) {
                    alert('Пользователь не найден');
                    throw new Error('Пользователь не найден')
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                render(data)
            })
            .catch(err => console.error(err))
    }


    input.value = ''
})


function render(data) {
    // result.innerHTML = ''
    const userCard = document.createElement('div');
    userCard.classList.add('usercard')

    const userName = document.createElement('h2');
    userName.textContent = `Пользователь: ${data.name || 'Не указано'}`;

    const avatar = document.createElement('img');
    avatar.src = data.avatar_url;
    avatar.alt = "Avatar";
    avatar.style.width = '100px';

    const login = document.createElement('h3');
    login.textContent = `Логин: ${data.login}`;

    const location = document.createElement('h3')
    location.textContent = `Локация: ${data.location}`

    const bio = document.createElement('h3');
    bio.textContent = `Биография: ${data.bio || 'Нет биографии'}`;

    const repos = document.createElement('h3');
    repos.textContent = `Количество репозиториев: ${data.public_repos}`;

    const link = document.createElement('a');
    link.href = data.html_url;
    link.target = "_blank";
    link.textContent = "GitHub";

    userCard.append(userName, avatar, login, location, bio, repos, link)

    result.append(userCard)

    userCard.scrollIntoView({ behavior: 'smooth' });
}


