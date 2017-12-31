import Item from '../models/Item';

export const API_URL = 'https://api.backendless.com/61A9EF51-6B59-822D-FF51-8501E38A2800/88AD2645-3DA4-8697-FF6D-315B7490ED00';
export const API_LOGIN = '/users/login';
export const API_REGISTER = '/users/register';
export const API_ITEMS = '/data/Items';

const headers = {
    'Content-Type': 'application/json' 
}

// region Login
export async function login(username, password) {
    const body = {
        'login': username,
        'password': password
    }
    const response = await fetch(API_URL + API_LOGIN, {
        method: 'post',
        headers,
        body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
}

export async function signUp(username, password) {
    const body = {
        'username': username,
        'password': password
    }
    const response = await fetch(API_URL + API_REGISTER, {
        method: 'post',
        headers,
        body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
}
// endregion

// region Items
export async function getItems(startDate, endDate) {
    let query = '';
    if (startDate && endDate) {
        query = '?where=buy_date%3E%3D' + startDate.getTime() + '%20AND%20buy_date%3C%3D' + endDate.getTime();
    }
    const sortBy = "&sortBy=buy_date";
    const pageSize = "&pageSize=100";
    const response = await fetch(API_URL + API_ITEMS + query + sortBy + pageSize);
    const json = await response.json();
    return json;
}

export async function postItem(item) {
    const response = await fetch(API_URL + API_ITEMS, {
        method: 'post',
        headers,
        body: item.toJson()
    });
    const json = await response.json();
    return json;
}

export async function deleteItem(id) {
    const url = API_URL + API_ITEMS + '/' + id;
    const response = await fetch(url, {
        method: 'DELETE'
    });
    const json = await response.json();
    return json;
}
// endregion
