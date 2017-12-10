import Item from '../models/Item';

export const API_URL = 'https://api.backendless.com/61A9EF51-6B59-822D-FF51-8501E38A2800/88AD2645-3DA4-8697-FF6D-315B7490ED00';
export const API_ITEMS = '/data/Items';

const headers = {
    'Content-Type': 'application/json' 
}

export async function getItems(date) {
    let query = '';
    if (date) {
        query = '?where=buy_date%3E%3D' + date.getTime();
    }
    const response = await fetch(API_URL + API_ITEMS + query);
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
