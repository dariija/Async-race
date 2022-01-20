export default async function getRacersAPI(page?: number, limit?: number) {
    const url = new URL('http://127.0.0.1:3000/garage');
    const params = new URLSearchParams({ _page: `${page || ''}`, _limit: `${limit || ''}` });
    url.search = new URLSearchParams(params).toString();

    return fetch(url.toString()).then(async (res) => {
        const allRacers = Number(res.headers.get('X-Total-Count'));
        const racersPerPage = await res.json();
        return { allRacers, racersPerPage };
    });
}
