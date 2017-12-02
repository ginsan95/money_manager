export const API_URL = 'https://api.backendless.com/61A9EF51-6B59-822D-FF51-8501E38A2800/88AD2645-3DA4-8697-FF6D-315B7490ED00';
export const API_ITEMS = '/data/Items';

const headers = {
    'Content-Type': 'application/json' 
}

export async function getItems() {
    const response = await fetch(API_URL + API_ITEMS);
    const json = await response.json();
    return json;
}

export async function postItem(item) {
    const body = {
        'name': item.name,
        'price': item.price,
        'buy_date': item.date.getTime()
    }
    const response = await fetch(API_URL + API_ITEMS, {
        method: 'post',
        headers,
        body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
}