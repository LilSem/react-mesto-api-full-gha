class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
        this._id = options._id;
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    }


    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    setUserInfo({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkResponse)
    }

    setAvatar({link}) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(this._checkResponse)
    }

    sendCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse)
    }

    removeCard(card) {
        return fetch(`${this._url}/cards/${card._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if(isLiked) {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
            })
                .then(this._checkResponse)
        }else {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
            })
                .then(this._checkResponse)
        }
    }

    getAllData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }
}
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-58',
    headers: {
        authorization: '5ba9b8ef-2b3a-4348-989d-084af73f827e',
        'Content-Type': 'application/json'
    }
});

export default api;