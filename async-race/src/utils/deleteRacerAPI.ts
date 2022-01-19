export default async function deleteRacerAPI(id: number) {
    const url = new URL(`http://127.0.0.1:3000/garage/${id}`);
    const options = {
        method: 'DELETE',
    };

    return fetch(url.toString(), options)
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error(res.statusText);
        })
        .catch((err) => {
            return err;
        });
}
