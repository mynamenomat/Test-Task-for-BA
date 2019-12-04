// Получаем JSON
async function getUsers() {
    return await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
}

// Отрисовываем таблицу на основе полученного JSON
function createTable(users, selector) {
    const element = document.querySelector(selector);
    const table = document.createElement('table');
    table.innerHTML = `
    <thead class="table-header">
        <th data-column="name" data-sort="asc">Name</th>
        <th data-column="username" data-sort="asc">Username</th>
        <th data-column="email" data-sort="asc">Email</th>
        <th data-column="website" data-sort="asc">Website</th>
    </thead>
    `;
    table.innerHTML += `<tbody class="table-body">` + users.reduce(function (result, user) {
        return result + `
        <tr>
            <td data-index="${user.id}">${user.name}</td>
            <td data-index="${user.id}">${user.username}</td>
            <td data-index="${user.id}">${user.email}</td>
            <td data-index="${user.id}">${user.website}</td>
        </tr>
        `;
    }, '') + `</tbody>`;
    element.appendChild(table);
}

// Создаем функцию, которая будет отрисовывать уже сортированную таблицу
function createSortedTable(users, selector) {
    const element = document.querySelector(selector);
    element.innerHTML = users.reduce(function (result, user) {
        return result + `
        <tr>
            <td data-index="${user.id}">${user.name}</td>
            <td data-index="${user.id}">${user.username}</td>
            <td data-index="${user.id}">${user.email}</td>
            <td data-index="${user.id}">${user.website}</td>
        </tr>
        `;
    }, '')
}

// Создаем функцию, которая будет сортировать таблицу по нужному столбцу
function onHeaderClick(event) {
    if (event.target.tagName === 'TH') {
        const key = event.target.getAttribute('data-column');
        const sort = event.target.getAttribute('data-sort');
        let users = this.slice();
        if (sort === 'asc') {
            event.target.setAttribute('data-sort', 'desc');
            users = users.sort((a, b) => {
                return a[key] > b[key] ? 1 : -1
            });
        } else {
            event.target.setAttribute('data-sort', 'asc');
            users = users.sort((a, b) => {
                return a[key] < b[key] ? 1 : -1
            });
        }
        createSortedTable(users, '.table-body')
    }


}

// Отрисовываем карточку пользователя
function createUserCard(users, selector, key) {
    const element = document.querySelector(selector);
    element.innerHTML = '';
    users.forEach(function (user) {
        if (user.id == key) {
            element.innerHTML = `
        <h2>${user.username}</h2>
        <p>Name: ${user.name}</p>
        <p>Email: ${user.email}</p>
        <h3>Address</h3>
        <p>Street: ${user.address.street}</p>
        <p>Suite: ${user.address.suite}</p>
        <p>City: ${user.address.city}</p>
        <p>Zipcode: ${user.address.zipcode}</p>
        <h3>Contacts</h3>
        <p>Phone: ${user.phone}</p>
        <p>Website: ${user.website}</p>
        <p>Company Name: ${user.company.name}</p>
        `
        }
    });
    document.querySelector('.modal').style.display = 'block';

}

// Создаем функцию, которая отслеживает, по какому пользователю был клик
function onUserClick(event) {
    if (event.target.tagName == 'TD') {
        const key = event.target.getAttribute('data-index');
        const users = this;
        createUserCard(users, '#user-card', key)
    }

}

// Создаем функцию, закрывающую карточку пользователя
function closeUserCard() {
    document.querySelector('.modal').style.display = 'none';
}

(async () => {
    const users = await getUsers();
    createTable(users, '#table');
    document.querySelector('.table-header').addEventListener('click', onHeaderClick.bind(users));
    document.querySelector('.table-body').addEventListener('click', onUserClick.bind(users));
    document.querySelector('.close').addEventListener('click', closeUserCard.bind());

})();

// Coment for test commmit