export default async function getWinnersAPI(page?: number, limit?: number, sort?: string, order?: string) {
    const url = new URL('http://127.0.0.1:3000/winners');
    const params = new URLSearchParams({
        _page: `${page || ''}`,
        _limit: `${limit || ''}`,
        _sort: `${sort || ''}`,
        _order: `${order || ''}`,
    });
    url.search = params.toString();

    return fetch(url.toString()).then(async (res) => {
        const allWinners = Number(res.headers.get('X-Total-Count'));
        const winnersPerPage = await res.json();
        return { allWinners, winnersPerPage };
    });
}
