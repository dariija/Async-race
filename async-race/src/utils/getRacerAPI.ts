export default async function getRacersAPI(id: number) {
    const url = new URL(`http://127.0.0.1:3000/garage/${id}`);

    return fetch(url.toString())
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error(res.statusText);
        })
        .catch((err) => err);
}
