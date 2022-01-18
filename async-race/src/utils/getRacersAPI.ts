export default async function getRacersAPI(page?: number, limit?: number) {
    const url = new URL('http://127.0.0.1:3000/garage');
    const params = new URLSearchParams({ page: `${page || ''}`, limit: `${limit || ''}` });
    url.search = new URLSearchParams(params).toString();
    console.log(url.toString());
    return fetch(url.toString())
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error(res.statusText);
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}
