export default async function createRacerAPI(name: string, color: string) {
    const url = new URL('http://127.0.0.1:3000/garage');
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, color }),
    };

    return fetch(url.toString(), options).then((res) => res.json());
}
