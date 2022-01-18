export default async function stopEngineAPI(id: number) {
    const url = new URL('http://127.0.0.1:3000/engine');
    const params = new URLSearchParams({ id: `${id}`, status: 'stopped' });
    const options = {
        method: 'PATCH',
    };
    url.search = params.toString();

    return (await fetch(url.toString(), options)).json();
}
