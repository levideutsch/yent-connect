const API_URL = 'http://localhost:3000';

export default function api(url, opts) {
    return fetch(`${API_URL}/${url}`, {
        ...opts,
        credentials: 'include',
        headers: { clientVersion: 'REACT 1.0', ...opts?.headers }
    })
}