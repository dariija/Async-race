export default async function deleteRacerAPI(id: number) {
    const url = new URL(`http://127.0.0.1:3000/garage/${id}`);
    const options = {
        method: 'DELETE',
    };

    await fetch(url.toString(), options);
}
