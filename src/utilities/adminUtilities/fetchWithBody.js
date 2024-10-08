// Function for fetchs that require a body data (method POST, PUT... etc)

export default async function fetchWithBody(endpoint, method, body) {
    let data = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }

    let res = await fetch(endpoint, data);
    let json = await res.json();
    return json;
}