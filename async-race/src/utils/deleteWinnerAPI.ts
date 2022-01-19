export default async function deleteWinnerAPI(id: number) {
    const url = new URL(`http://127.0.0.1:3000/winners/${id}`);
    const options = {
        method: 'DELETE',
    };

    return fetch(url.toString(), options)
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error(res.statusText);
        })
        .catch((e) => e);
}
