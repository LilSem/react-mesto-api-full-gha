class Auth {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
        this._id = options._id;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    register({identifier, password}) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: identifier
            })
        })
            .then(this._checkResponse);
    };

    authorize ({identifier, password})  {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: identifier
            })
        })
            .then(this._checkResponse);
    };

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            }
        }).then(this._checkResponse)
    }
}


const auth = new Auth({
    url: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default auth;