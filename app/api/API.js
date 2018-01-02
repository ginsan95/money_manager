import Item from '../models/Item';
import UserManager from '../managers/UserManager';

export const API_URL = 'https://api.backendless.com/61A9EF51-6B59-822D-FF51-8501E38A2800/88AD2645-3DA4-8697-FF6D-315B7490ED00';
export const API_LOGIN = '/users/login';
export const API_REGISTER = '/users/register';
export const API_LOGOUT = '/users/logout'
export const API_ITEMS = '/data/Items';

const headers = {
    'Content-Type': 'application/json' 
}
function userHeaders() {
    return {
        ...headers,
        'user-token': UserManager.getInstance().userToken
    }
}

// region User
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

export async function logout() {
    const response = await fetch(API_URL + API_LOGOUT, {
        method: 'get',
        headers: userHeaders()
    });
    const result = await response;
    return result;
}
// endregion

// region Items
export async function getItems(startDate, endDate) {
    let query = '';
    if (startDate && endDate) {
        query = '?where=' + encodeURIComponent(`ownerId=\'${UserManager.getInstance().objectId}\' AND buy_date>=${startDate.getTime()} AND buy_date<=${endDate.getTime()}`);
    }
    const sortBy = "&sortBy=buy_date";
    const pageSize = "&pageSize=100";
    const response = await fetch(API_URL + API_ITEMS + query + sortBy + pageSize, {
        method: 'get',
        headers: userHeaders()
    });
    const json = await response.json();
    return json;
}

export async function postItem(item) {
    const response = await fetch(API_URL + API_ITEMS, {
        method: 'post',
        headers: userHeaders(),
        body: item.toJson()
    });
    const json = await response.json();
    return json;
}

export async function deleteItem(id) {
    const url = API_URL + API_ITEMS + '/' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: userHeaders()
    });
    const json = await response.json();
    return json;
}
// endregion
