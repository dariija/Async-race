export default async function updateWinnerAPI(id: number, wins: number, time: number) {
    const url = new URL(`http://127.0.0.1:3000/winners/${id}`);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wins, time }),
    };

    return fetch(url.toString(), options)
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error(res.statusText);
        })
        .catch((err) => err);
}
