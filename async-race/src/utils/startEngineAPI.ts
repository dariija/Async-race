export default async function startEngineAPI(id: number) {
    const url = new URL('http://127.0.0.1:3000/engine');
    const params = new URLSearchParams({ id: `${id}`, status: 'started' });
    const options = {
        method: 'PATCH',
    };
    url.search = params.toString();

    return (await fetch(url.toString(), options)).json();
}
