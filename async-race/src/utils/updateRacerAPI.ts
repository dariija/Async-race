export default async function updateRacerAPI(name: string, color: string, id: number) {
    const url = new URL(`http://127.0.0.1:3000/garage/${id}`);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, color }),
    };

    return fetch(url.toString(), options)
        .then((res) => res.json())
        .then((res) => {
            return res;
        });
}
