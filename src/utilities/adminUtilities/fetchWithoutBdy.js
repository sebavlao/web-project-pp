// Function for fetchs that DON'T require a body data (method GET)

export default async function fetchWithBody(endpoint, method) {
    let data = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    }

    let res = await fetch(endpoint, data);
    let json = await res.json();
    return json;
}