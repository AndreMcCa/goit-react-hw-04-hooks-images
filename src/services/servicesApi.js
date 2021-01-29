const API_KEY = '19085277-779e4bd4c925c04676eaaf904';
const BASE_URL = `https://pixabay.com/api/`;

export default function fetchArticles(searchQuery, page, prevPage) {
    const searchParams = new URLSearchParams({
        q: searchQuery,
        page: page,
        per_page: 12,
        image_type: 'photo',
        order: 'popular',
    })

    const url = `${BASE_URL}?key=${API_KEY}&${searchParams}`;

    return fetch(url).then(response => response.json()).then(response => {
        
        if(response.hits.length === 0) {
            return Promise.reject(new Error(`Некоректные параметры запроса`))
        }

        return response.hits;
    })
}