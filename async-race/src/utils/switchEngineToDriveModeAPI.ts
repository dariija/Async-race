export default async function switchEngineToDriveModeAPI(id: number) {
    const url = new URL('http://127.0.0.1:3000/engine');
    const options = {
        method: 'PATCH',
    };
    const params = new URLSearchParams({ id: `${id}`, status: 'drive' });
    url.search = params.toString();

    return fetch(url.toString(), options)
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error(res.statusText);
        })
        .then((res) => res)
        .catch((err) => {
            return err;
        });
}
